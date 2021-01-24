import events from 'events';
import PacketType from './packetType';
import { isBinary } from './isBinary';
import BinaryReconstructor from './binaryReconstructor';

/**
 * A decoder instance
 *
 */
export default class Decoder extends events.EventEmitter {
  constructor() {
    super();
    this.reconstructor = null;
  }

  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  _add(obj) {
    let packet;
    if (typeof obj === 'string') {
      packet = this._decodeString(obj);
      if (
        packet.type === PacketType.BINARY_EVENT ||
        packet.type === PacketType.BINARY_ACK
      ) {
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          this.emit('decoded', packet);
        }
      } else {
        this.emit('decoded', packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error('got binary data when not reconstructing a packet');
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emit('decoded', packet);
        }
      }
    } else {
      throw new Error('Unknown type: ' + obj);
    }
  }

  add(...objs) {
    for (const obj of objs) {
      this._add(obj);
    }
  }

  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  _decodeString(str) {
    let i = 0;
    // look up type
    const p = {
      type: Number(str.charAt(0)),
    };
    // look up attachments if type binary
    if (
      p.type === PacketType.BINARY_EVENT ||
      p.type === PacketType.BINARY_ACK
    ) {
      const start = i + 1;
      while (str.charAt(++i) !== '-' && i != str.length) {
        // calc the end chat.
      }
      const buf = str.substring(start, i);
      if (buf != Number(buf) || str.charAt(i) !== '-') {
        throw new Error('Illegal attachments');
      }
      p.attachments = Number(buf);
    }
    // look up namespace (if any)
    if ('/' === str.charAt(i + 1)) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if (',' === c) break;
        if (i === str.length) break;
      }
      p.nsp = str.substring(start, i);
    } else {
      p.nsp = '/';
    }
    // look up id
    const next = str.charAt(i + 1);
    if ('' !== next && Number(next) == next) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        if (i === str.length) break;
      }
      p.id = Number(str.substring(start, i + 1));
    }
    // look up json data
    if (str.charAt(++i)) {
      const payload = this._tryParse(str.substr(i));
      if (Decoder._isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error('invalid payload');
      }
    }
    return p;
  }

  static _isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === 'object';
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT: //return Array.isArray(payload) && typeof payload[0] === 'string';
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }

  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }

  _tryParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
}
