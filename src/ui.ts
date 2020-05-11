import { bcrypt } from './share';
import './ui.css';

const DEBOUNCE_DELAY = 200;

const options: FindOptions = {
  caseSensitive: false,
}

const sf = document.getElementById('search-and-focus');
const inputWrapper = document.createElement('div');
const input = document.createElement('input');
const optionsPanel = document.createElement('div');
const header = document.createElement('header');
const ul = document.createElement('ul');
const caseInput = document.createElement('input');
const caseLabel = document.createElement('label');
let list: FrameKey[] = [];

inputWrapper.className = 'input-container';
inputWrapper.appendChild(input);

header.appendChild(inputWrapper);

caseInput.type = 'checkbox';
caseInput.id = 'case-sensitive';
caseLabel.innerText = 'Case sensitive';
caseLabel.htmlFor = 'case-sensitive';

optionsPanel.className = 'options-panel';
optionsPanel.appendChild(caseInput);
optionsPanel.appendChild(caseLabel);

caseInput.addEventListener('change', (event) => {
  if (event.target instanceof HTMLInputElement) {
    options.caseSensitive = event.target.checked;
    updateList(event);
  }
})

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
    ?.filter(({name}) => {
      return options.caseSensitive ? name.includes(value) : name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });
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
    const { value } = input;
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

[header, optionsPanel, ul].forEach(item => {
  sf?.append(item);
});
