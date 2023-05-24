/**
 * @description support vue ref , react useState and lit property.
 * @author 阿怪
 * @date 2023/5/6 11:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type Ref<T> = { value: T };
type State<T> = [T, Function];
type LitProp<T> = [T, Function, any];
export type MRefValue<T = any> = Ref<T> | State<T> | LitProp<T>;
export type RMRef<T = any> = ReturnType<typeof MRef<T>>;


const reactValue = (value: any) => {
  // if object
  if (Array.isArray(value)) {
    return [...value];
  }
  if (typeof value === 'object') {
    return { ...value };
  }
  return value;
};

export const MRef = <T>(val: MRefValue<T>) => {
  let isState = false;
  let isLitProp = false;
  if (Array.isArray(val)) {
    if (val.length === 2 && typeof val[1] === 'function') {
      isState = true;
    }
    if (val.length === 3) {
      isLitProp = true;
    }
  }
  return new Proxy({ value: val }, {
    get(target, p: PropertyKey, receiver) {
      if (isState) {
        return (target.value as State<T>)[0];
      }
      return (target.value as Ref<T>)?.value;
    },
    set(target, p: PropertyKey, value, receiver) {
      if (isState) {
        (target.value as State<T>)[1](reactValue(value));
      } else if (isLitProp) {
        const [_, handler, _this] = target.value as LitProp<T>;
        handler.call(_this, value);
      } else {
        (target.value as Ref<T>).value = value;
      }
      return true;
    }
  }) as ProxyConstructor & { value: T };
};