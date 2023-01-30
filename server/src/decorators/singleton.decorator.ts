export function Singleton<T extends new (...args: any[]) => any>(ctr: T): T {
  let instance: T;

  return class {
    constructor(...args: any[]) {
      if (instance) {
        throw new Error('You cannot instantiate a singleton twice!');
      }

      instance = new ctr(...args);
      return instance;
    }
  } as T;
}
