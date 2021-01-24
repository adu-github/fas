import events from 'events';
import Encoder from '../parser/encoder';
import Decoder from '../parser/decoder';
import PacketType from '../parser/packetType';

/**
 * Send message from main process to render process.
 */
export default class ContentsToRender extends events.EventEmitter {
  /**
   * initizale class with message id and acks
   */
  constructor(webContents) {
    super();
    this.self = this;
    this.mid = 0;
    this.acks = new Map();
    this.webContents = webContents;
    this.onPacket = this.onPacket.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.decoder = new Decoder();
    this.decoder.addListener('decoded', this.onPacket);
    this.webContents.addListener('ipc-message', this.onMessage);
  }

  onMessage(event, channel, args) {
    if (channel !== 'message') return;
    this.decoder.add(args);
  }

  onPacket(packet) {
    switch (packet.type) {
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onEvent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onAck(packet);
        break;
    }
  }

  onEvent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    this.emit('message', ...args);
  }

  ack(id) {
    let sent = false;
    return (...args) => {
      if (sent) return;
      sent = true;
      const e = {
        id: id,
        type: PacketType.ACK,
        data: args,
      };
      this.packet(e);
    };
  }

  onAck(packet) {
    if (!this.acks.has(packet.id)) return;
    const ack = this.acks.get(packet.id);
    ack.apply(this, packet.data);
    this.acks.delete(packet.id);
  }

  packet(packet) {
    const encoder = new Encoder();
    const packets = encoder.encode(packet);
    this.webContents.send('message', ...packets);
  }

  /**
   * Send an asynchronous message to the main process via 'message' channel
   * @param  {...any} args
   */
  send(...args) {
    const e = {
      type: PacketType.EVENT,
      data: args,
    };
    if (typeof args[args.length - 1] === 'function') {
      this.acks.set(this.mid, args.pop());
      e.id = this.mid++;
    }
    this.packet(e);
  }

  destroy() {
    this.acks.clear();
    this.removeAllListeners('message');
    this.decoder.removeListener('decoded', this.onPacket);
    if (this.webContents && this.webContents.removeListener) {
      this.webContents.removeListener('ipc-message', this.onMessage);
    }
  }
}
