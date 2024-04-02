import * as u from '../src/utils';

import { describe, expect, test } from 'vitest';

describe('isInputTarget', () => {
  const event = new InputEvent('input');

  test('should be false if event is not set', () => {
    expect(u.isInputTarget(event.target)).toBeFalsy();
  });

  test('should be return true if event is InputEvent', () => {
    const input = document.createElement('input');
    input.dispatchEvent(event);
    expect(u.isInputTarget(event.target)).toBeTruthy();
  });
});

describe('createElement', () => {
  test('should be return HTMLInputElement', () => {
    const input = u.createElement('input');
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  test('should be create input with type checkbox', () => {
    const input = u.createElement('input', { type: 'checkbox' });
    expect(input.type).toBe('checkbox');
  });
});
