import {
  FindOptions,
  clearNode,
  debounce,
  find,
  focusOnFrame,
} from '../src/ui';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

test('should be clear children nodes', () => {
  const root = document.createElement('div');
  const child = document.createElement('div');
  root.appendChild(child);
  
  clearNode(root);
  expect(root.children.length).toEqual(0);
});

describe('find', () => {
  const list = [{ name: 'foo' }, { name: 'bar' }] as FrameKey[];

  test('should be case sensitive', () => {
    const result = find(list, 'Foo', { caseSensitive: true } as FindOptions);
    expect(result.length).toEqual(0);

    const result2 = find(list, 'foo', { caseSensitive: true } as FindOptions);
    expect(result2.length).toEqual(1);
  });

  test('should be case insensitive', () => {
    const result = find(list, 'Foo');
    expect(result.length).toEqual(1);
  });

  const list2 = [...list, { name: 'foobar' } as FrameKey];
  test('should be math whole word', () => {
    const result = find(list2, 'oo', { bounderies: true } as FindOptions);
    expect(result.length).toEqual(0);

    const result2 = find(list2, 'foo', { bounderies: true } as FindOptions);
    expect(result2.length).toEqual(1);

    const result3 = find(list2, 'oo');
    expect(result3.length).toEqual(2);
  });
});

test('should be focusing on Node', () => {
  const spy = vi.spyOn(globalThis.parent, 'postMessage');
  focusOnFrame({ name: 'foo' } as FrameKey);
  expect(spy).toHaveBeenCalledTimes(1);
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should be invoking callback after delay', () => {
    const DELAY = 100;
    const mock = vi.fn();
    const debounced = debounce(mock, DELAY);
    debounced();
    expect(mock).not.toHaveBeenCalled();
    vi.advanceTimersByTime(DELAY + 1);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
