import * as ui from '../src/ui';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

test('should be clear children nodes', () => {
  const root = document.createElement('div');
  const child = document.createElement('div');
  root.appendChild(child);
  
  ui.clearNode(root);
  expect(root.children.length).toEqual(0);
});

describe('find', () => {
  const list = [{ name: 'foo' }, { name: 'bar' }] as FrameKey[];

  test('should be case sensitive', () => {
    const result = ui.find(list, 'Foo', { caseSensitive: true } as FindOptions);
    expect(result.length).toEqual(0);

    const result2 = ui.find(list, 'foo', { caseSensitive: true } as FindOptions);
    expect(result2.length).toEqual(1);
  });

  test('should be case insensitive', () => {
    const result = ui.find(list, 'Foo');
    expect(result.length).toEqual(1);
  });

  const list2 = [...list, { name: 'foobar' } as FrameKey];
  test('should be math whole word', () => {
    const result = ui.find(list2, 'oo', { bounderies: true } as FindOptions);
    expect(result.length).toEqual(0);

    const result2 = ui.find(list2, 'foo', { bounderies: true } as FindOptions);
    expect(result2.length).toEqual(1);

    const result3 = ui.find(list2, 'oo');
    expect(result3.length).toEqual(2);
  });
});

test('should be focusing on Node', () => {
  const spy = vi.spyOn(globalThis.parent, 'postMessage');
  ui.focusOnFrame({ name: 'foo' } as FrameKey);
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
    const debounced = ui.debounce(mock, DELAY);
    debounced();
    expect(mock).not.toHaveBeenCalled();
    vi.advanceTimersByTime(DELAY + 1);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

test('should be appending list', () => {
  const ul = document.createElement('ul');
  const list = [{ name: 'foo' }, { name: 'bar' }] as FrameKey[];
  const spy = vi.spyOn(ul, 'appendChild');
  ui.appendList(list, ul);
  expect(spy).toHaveBeenCalledTimes(2);
});
