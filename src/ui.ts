const ff = document.getElementById('find-and-focus');
const input = document.createElement('input');
const ul = document.createElement('ul');

input.type = 'search';
input.autofocus = true;
input.placeholder = 'type for searching';

const find = (items: string[], value: string): string[] => {
  return items
    .filter((it) => it.includes(value))
    .sort();
};

const updateList = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    const { value } = event.target;
    if (value.length < 1) { return; }
    const result = find(['asd', '21', 'asda1', 'asd21sda'], '21'); // TODO: get array value from figma API
  
    result.forEach((item: string) => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }
};

input.addEventListener('input', updateList);


[input, ul].forEach(item => {
  ff?.append(item);
})