const withNativeArrayBuffer = typeof ArrayBuffer === 'function';

const isView = (obj) =>
  typeof ArrayBuffer.isView === 'function'
    ? ArrayBuffer.isView(obj)
    : obj.buffer instanceof ArrayBuffer;

const toString = Object.prototype.toString;

const withNativeBlob =
  typeof Blob === 'function' ||
  (typeof Blob !== 'undefined' &&
    toString.call(Blob) === '[object BlobConstructor]');

const withNativeFile =
  typeof File === 'function' ||
  (typeof File !== 'undefined' &&
    toString.call(File) === '[object FileConstructor]');

function isBinary(obj) {
  return (
    (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  );
}

function hasBinary(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (
    obj.toJSON &&
    typeof obj.toJSON === 'function' &&
    arguments.length === 1
  ) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

export { isBinary, hasBinary };
