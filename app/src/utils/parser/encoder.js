import PacketType from './packetType';
import { hasBinary } from './isBinary';
import { deconstructPacket } from './binary';

/**
 * A encoder instance
 */

export default class Encoder {
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        obj.type =
          obj.type === PacketType.EVENT
            ? PacketType.BINARY_EVENT
            : PacketType.BINARY_ACK;
        return this._encodeAsBinary(obj);
      }
    }
    return [this._encodeAsString(obj)];
  }

  /**
   * Encode packet as string.
   */
  _encodeAsString(obj) {
    let str = '' + obj.type;
    if (
      obj.type === PacketType.BINARY_EVENT ||
      obj.type === PacketType.BINARY_ACK
    ) {
      str += obj.attachments + '-';
    }
    if (obj.nsp && '/' !== obj.nsp) {
      str += obj.nsp + ',';
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data);
    }
    return str;
  }

  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  _encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
}
