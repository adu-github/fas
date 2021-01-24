import events from 'events';
import { ipcRenderer } from 'electron';
import Encoder from '../parser/encoder';
import Decoder from '../parser/decoder';
import PacketType from '../parser/packetType';

/**
 * send message from render process to main process via 'message' channel.
 */
export default class RenderToContents extends events.EventEmitter {
  /**
   * initizale class with message id and acks
   */
  constructor() {
    super();
    this.mid = 0;
    this.acks = new Map();
    this.decoder = new Decoder();
    this.onPacket = this.onPacket.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.decoder.addListener('decoded', this.onPacket);
    ipcRenderer.addListener('message', this.onMessage);
  }

  onMessage(event, packet) {
    this.decoder.add(packet);
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
    ipcRenderer.send('message', ...packets);
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

  /**
   * destroy object
   */
  destroy() {
    this.acks.clear();
    this.removeAllListeners('message');
    ipcRenderer.removeListener('message', this.onMessage);
    this.decoder.removeListener('decoded', this.onPacket);
  }
}
