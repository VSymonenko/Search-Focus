import { bcrypt } from './share';
import './ui.css';

const DEBOUNCE_DELAY = 200;

const ff = document.getElementById('find-and-focus');
const inputWrapper = document.createElement('div');
const input = document.createElement('input');
const ul = document.createElement('ul');
let list: FrameKey[];

inputWrapper.className = 'input-container';
inputWrapper.appendChild(input);

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

const find = (items: FrameKey[], value: string): FrameKey[] => {
  return items
    ?.filter(({name}) => name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    .sort();
};

const clearNode = (node: Node) => {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};

const focusOnFrame = (frame: FrameKey) => {
  const key = bcrypt(frame);
  parent.postMessage({ pluginMessage: {
    type: 'focus',
    data: { key },
  }}, '*');
};

const debounce = (cb: Function, delay: number = DEBOUNCE_DELAY) => {
  let id: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(id);
    id = setTimeout(() => {
      cb(...args);
    }, delay);
  } 
};

const updateList = (event: Event) => {
  clearNode(ul);
  if (event.target instanceof HTMLInputElement) {
    const { value } = event.target;
    let result: FrameKey[];
    if (value.length <= 1) {
      return;
    } else {
      result = find(list, value);
      result.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.addEventListener('click', () => focusOnFrame(item));
        ul.appendChild(li);
      });
    }
  }
};
const updated = debounce(updateList);
input.addEventListener('input', updated);

[inputWrapper, ul].forEach(item => {
  ff?.append(item);
});
