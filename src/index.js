const isObj = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');

const validProps = (obj, props) => isObj(obj) && (typeof props === 'string' || (props && props.length));

const hasProp = (obj, prop) => isObj(obj) && Object.prototype.propertyIsEnumerable.call(obj, prop);

const getNextLevel = (currentObj, prop) => hasProp(currentObj, prop) ? currentObj[prop] : {};

const setNextLevel = (currentObj, prop) => {
  if (!hasProp(currentObj, prop)) currentObj[prop] = {};

  return currentObj[prop];
};

const dotGuard = (obj, props, reducer) => {
  const propList = typeof props === 'string' ? props.split('.') : props;
  const finalProp = propList.pop();
  const finalLevel = propList.reduce(reducer, obj);

  return { finalLevel, finalProp };
};

const get = (obj, props, fallBack) => {
  if (!validProps(obj, props)) return fallBack;
  const result = dotGuard(obj, props, getNextLevel);
  
  return hasProp(result.finalLevel, result.finalProp) ? result.finalLevel[result.finalProp] : fallBack;
};

const has = (obj, props) => {
  if (!validProps(obj, props)) return false;
  const result = dotGuard(obj, props, getNextLevel);

  return hasProp(result.finalLevel, result.finalProp);
};

const set = (obj, props, val) => {
  if (!validProps(obj, props)) return obj;
  const result = dotGuard(obj, props, setNextLevel);
  if (isObj(result.finalLevel)) result.finalLevel[result.finalProp] = val;
};

const del = (obj, props) => {
  if (!validProps(obj, props)) return obj;
  const result = dotGuard(obj, props, getNextLevel);
  delete result.finalLevel[result.finalProp];
}

module.exports = { get: get, has: has, set: set, del: del, dgGet: get, dgHas: has, dgSet: set, dgDel: del };
