import { bcrypt } from './share';
import './ui.css';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';

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
const caseWrapper = document.createElement('div');
const caseInput = document.createElement('input');
const caseLabel = document.createElement('label');
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
