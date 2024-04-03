export const createStore = <T extends object, K extends keyof T, V extends T[K]>
(init: T) => {
  if (!init) {
    throw new Error('you should be pass initial state');
  }

  const _state = { ...init};

  return {
    getState: (key?: K | ((state: T) => V | null)) => {
      if (typeof key === 'function') {
        return key({..._state});
      }

      return key ? _state[key] : {..._state};
    },
    updateState: (key: K) => (value: V) => {
      _state[key] = value;
    }
  }
}