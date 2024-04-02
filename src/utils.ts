type IsInputTarget = (target: EventTarget | null) => target is HTMLInputElement;

export const isInputTarget: IsInputTarget = (target): target is HTMLInputElement =>
  target instanceof HTMLInputElement;

// TODO migrate creation elements to createElement
export const createElement = <
    T extends keyof HTMLElementTagNameMap,
    K extends keyof HTMLElementTagNameMap[T],
    V extends HTMLElementTagNameMap[T][K],
  >(tag: T, props?: Record<K, V>): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tag);
  if (props) {
    (Object.entries(props) as Entries<typeof props>).forEach(([key, value]) => {
      element[key] = value;
    });
  }
  return element;
}
