export default async (className, classParams, methodName, methodParams) => {
  try {
    let clazz = require(`./${className}`);
    let services = new clazz.default(...classParams);
    if (services == null) {
      return {
        success: false,
        error: `'${className}' is not a class.`,
      };
    }
    let action = services[methodName];
    if (action == null) {
      return {
        success: false,
        error: `'${methodName}' is not a method.`,
      };
    }
    try {
      const result = await action.apply(services, methodParams);
      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: `'${className}' load error: ${err.message}`,
    };
  }
};
