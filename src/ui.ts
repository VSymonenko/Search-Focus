import './ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';

import * as u from './utils';

import { bcrypt } from './share';

const DEBOUNCE_DELAY = 200;

export type FindOptions = {
  caseSensitive: boolean;
  bounderies: boolean;
};
const options: FindOptions = {
  caseSensitive: false,
  bounderies: false,
}

const sf = document.getElementById('search-and-focus');
const inputWrapper = document.createElement('div');
const input = document.createElement('input');
const optionsPanel = document.createElement('div');
const header = document.createElement('header');
const ul = document.createElement('ul');
const caseWrapper = document.createElement('div');
const caseInput = document.createElement('input');
const caseLabel = document.createElement('label');
const bounderiesWrapper = document.createElement('div');
const bounderiesInput = document.createElement('input');
const bounderiesLabel = document.createElement('label');
let list: FrameKey[] = [];

input.className = 'input__field';
inputWrapper.className = 'input-container input';
inputWrapper.appendChild(input);

header.appendChild(inputWrapper);
// TODO: cleanup design
caseWrapper.className = 'checkbox';
caseInput.type = 'checkbox';
caseInput.id = 'case-sensitive';
caseInput.className = 'checkbox__box';
caseLabel.innerText = 'Case sensitive';
caseLabel.htmlFor = 'case-sensitive';
caseLabel.className = 'checkbox__label';

bounderiesWrapper.className = 'checkbox';
bounderiesInput.type = 'checkbox';
bounderiesInput.id = 'bounderies-switch';
bounderiesInput.className = 'checkbox__box';
bounderiesLabel.innerText = 'Match Whole Word';
bounderiesLabel.htmlFor = 'bounderies-switch';
bounderiesLabel.className = 'checkbox__label';

optionsPanel.className = 'options-panel';
optionsPanel.appendChild(caseWrapper);
caseWrapper.appendChild(caseInput);
caseWrapper.appendChild(caseLabel);
optionsPanel.appendChild(bounderiesWrapper);
bounderiesWrapper.appendChild(bounderiesInput);
bounderiesWrapper.appendChild(bounderiesLabel);

export const updateOption = (option: keyof FindOptions) =>
  (value: boolean) => options[option] = value;

export const updateCaseSensitive = updateOption('caseSensitive');

export const handleCaseSensitive = (event: Event) => {
  if (u.isInputTarget(event.target)) {
    updateCaseSensitive(event.target.checked);
    updateList(event);
  }
}

caseInput.addEventListener('change', handleCaseSensitive);

export const updateBounderies = updateOption('bounderies');

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
      list = frameList.map((key: string) => bcrypt(key));
    }
  }
};

input.type = 'search';
input.placeholder = 'type for searching';

type Find = (items: FrameKey[], value: string, options?: FindOptions) => FrameKey[];
export const find: Find = (items, value, _options = options): FrameKey[] => {
  return items
    .filter(({name}) => {
      return _options.caseSensitive
        ? name.includes(value)
        : name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    })
    .filter(({name}) => {
      const regex = new RegExp(`\\b${value.toLowerCase()}\\b`);
      return _options.bounderies ? regex.test(name.toLowerCase()) : true;
    });
};

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

export const appendList = (list: FrameKey[], _ul = ul) => {
  list.forEach((item) => {
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
      result = find(list, value);
      appendList(result);
    }
  }
};

const updated = debounce(updateList);
input.addEventListener('input', updated);

[header, optionsPanel, ul].forEach(item => {
  sf?.append(item);
});
