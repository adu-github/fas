export default class Packet {
  static isPacketValid(packet) {
    if (packet == null) return false;
    if (typeof packet !== 'object') return false;
    if (packet.class == null || packet.class.name === 0) return false;
    if (packet.method == null || packet.method.name === 0) return false;
    return true;
  }
}
