import * as s from '../src/store';

import { describe, expect, test } from 'vitest';

describe('createStore', () => {
  test('should return the initial state', () => {
    const store = s.createStore({ count: 0 });
    expect(store.getState()).toEqual({ count: 0 });
  });

  test('should be throw error when no init value', () => {
    expect(s.createStore).toThrowError(/you should be pass initial state/)
  });
});

describe('getState', () => {
  test('should be return state', () => {
    const store = s.createStore({ count: 8 });
    expect(store.getState()).toEqual({ count: 8 });
  });

  test('should be return state with key', () => {
    const store = s.createStore({ count: 8 });
    expect(store.getState('count')).toBe(8);
  });

  test('should be return undefined when key not found', () => {
    const store = s.createStore({ count: 8 });
    // @ts-expect-error ts(2345)
    expect(store.getState('name')).toBeUndefined();
  });

  test('should be apply function for return state', () => {
    const store = s.createStore({ count: 7, name: 'foo' });
    expect(store.getState((state) => state.count)).toBe(7);
  });
});

describe('setState', () => {
  test.skip('should update state', () => {
    const store = s.createStore({ count: 0, name: 'test' });
    // @ts-expect-error ts(2551)
    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1, name: 'test' });
  });

  test.skip('should be return initial state in setState', () => {
    const store = s.createStore({ count: 9 });
    // @ts-expect-error ts(2551)
    const state = store.setState((_state) => _state);
    expect(state).toEqual({ count: 9 });
  });

  test.skip('should update state with function', () => {
    const store = s.createStore({ count: 0 });
    // @ts-expect-error ts(2551)
    store.setState((state) => ({ count: state.count + 1 }));
    expect(store.getState()).toEqual({ count: 1 });
  });

  test('should be create update state callback', () => {
    const store = s.createStore({ count: 2 });
    const updateCount = store.updateState('count');
    expect(store.getState('count')).toBe(2);

    updateCount(5);
    expect(store.getState('count')).toBe(5);
  });
});
