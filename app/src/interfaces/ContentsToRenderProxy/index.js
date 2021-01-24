export default class ContentsToRenderProxy {
  /**
   * constructor return a proxy instance
   * @param {Object} contentsToRender
   * @param {String} className class name
   * @param  {...any} params
   */
  constructor(contentsToRender, className, ...params) {
    this.timeout = 0;
    return new Proxy(this, {
      get: (target, propKey) => {
        return (...args) => {
          return new Promise((resolve, reject) => {
            className = className || target.constructor.name;
            const methodName = propKey;
            let timer = null;
            if (this.timeout > 0) {
              timer = setTimeout(() => {
                timer = null;
                const message = `call '${className}.${methodName}()' timeout.`;
                const err = new Error(message);
                reject(err);
              }, this.timeout);
            }
            const packet = {
              class: {
                name: className,
                arguments: params,
              },
              method: {
                name: methodName,
                arguments: args,
              },
            };
            contentsToRender.send(packet, (e) => {
              if (timer) {
                clearTimeout(timer);
                timer = null;
              }
              e.success ? resolve(e.data) : reject(new Error(e.error));
            });
          });
        };
      },
    });
  }

  setTimeout(millisecond = 5000) {
    if (millisecond < 0) millisecond = 0;
    this.timeout = millisecond;
  }
}
