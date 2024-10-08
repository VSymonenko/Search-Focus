import './ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';

import * as s from './store';
import * as u from './utils';

import { bcrypt } from './share';

const DEBOUNCE_DELAY = 200;

const options: FindOptions = {
  caseSensitive: false,
  bounderies: false,
}

const store = s.createStore(options);
const listStore = s.createStore({ list: [] } as { list: FrameKey[] });

const input = u.createElement('input', {
  type: 'search',
  placeholder: 'type for searching',
  className: 'input__field',
});

const inputWrapper = u.createElement('div', {
  className: 'input-container input',
});
inputWrapper.appendChild(input);

const root = document.getElementById('search-and-focus');
const optionsPanel = u.createElement('div', { className: 'options-panel' });
const header = document.createElement('header');
header.appendChild(inputWrapper);
const ul = document.createElement('ul');
const caseInput = u.createElement('input', {
  type: 'checkbox',
  id: 'case-sensitive',
  className: 'checkbox__box',
});
const caseLabel = u.createElement('label', {
  className: 'checkbox__label',
  htmlFor: 'case-sensitive',
  innerText: 'Case sensitive',
});
const caseWrapper = u.createElement('div', { className: 'checkbox' });
caseWrapper.appendChild(caseInput);
caseWrapper.appendChild(caseLabel);
const bounderiesWrapper = u.createElement('div', { className: 'checkbox' });
const bounderiesInput = u.createElement('input', {
  type: 'checkbox',
  id: 'bounderies-switch',
  className: 'checkbox__box',
});
const bounderiesLabel = u.createElement('label', {
  innerText: 'Match Whole Word',
  htmlFor: 'bounderies-switch',
  className: 'checkbox__label',
});

optionsPanel.appendChild(caseWrapper);
optionsPanel.appendChild(bounderiesWrapper);
bounderiesWrapper.appendChild(bounderiesInput);
bounderiesWrapper.appendChild(bounderiesLabel);

export const updateCaseSensitive = store.updateState('caseSensitive');

export const handleCaseSensitive = (event: Event) => {
  if (u.isInputTarget(event.target)) {
    updateCaseSensitive(event.target.checked);
    updateList(event);
  }
}

caseInput.addEventListener('change', handleCaseSensitive);

export const updateBounderies = store.updateState('bounderies');

export const handleBounderies = (event: Event) => {
  if (u.isInputTarget(event.target)) {
    updateBounderies(event.target.checked);
    updateList(event);
  }
};

bounderiesInput.addEventListener('change', handleBounderies);

onmessage = (event) => {
  if (event.data.pluginMessage) {
    const { type, list: frameList } = event.data.pluginMessage;
    if (type === 'send-list') {
      listStore.updateState('list')(frameList.map((key: string) => bcrypt(key)));
    }
  }
};

type Find = (items: FrameKey[], value: string, _opts?: FindOptions) => FrameKey[];
export const find: Find = (items, value, _opts = store.getState() as FindOptions) =>
  items
    .filter(({ name }) => {
      return _opts.caseSensitive
        ? name.includes(value)
        : name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    })
    .filter(({ name }) => {
      const regex = new RegExp(`\\b${value.toLowerCase()}\\b`);
      return _opts.bounderies ? regex.test(name.toLowerCase()) : true;
    });

export const clearNode = (node: Node) => {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};

export const focusOnFrame = (frame: FrameKey) => {
  const key = bcrypt(frame);
  parent.postMessage({ pluginMessage: {
    type: 'focus',
    data: { key },
  }}, '*');
};

type Debounce = <T extends unknown[]>(cb: (...args: T) => void, delay?: number) =>
  (...args: T) => void;

export const debounce: Debounce = (cb, delay = DEBOUNCE_DELAY) => {
  let id: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      cb(...args);
    }, delay);
  } 
};

export const appendList = (_list: FrameKey[], _ul = ul) => {
  _list.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.addEventListener('click', () => focusOnFrame(item));
    _ul.appendChild(li);
  });
};

export const updateList = (event: Event) => {
  clearNode(ul);
  if (u.isInputTarget(event.target)) {
    const { value } = input;
    let result: FrameKey[];
    if (value.length <= 1) {
      return;
    } else {
      const list = listStore.getState('list') as FrameKey[];
      result = find(list, value);
      appendList(result);
    }
  }
};

const updated = debounce(updateList);
input.addEventListener('input', updated);

[header, optionsPanel, ul].forEach(item => {
  root?.append(item);
});
