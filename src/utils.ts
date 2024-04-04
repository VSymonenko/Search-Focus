type IsInputTarget = (target: EventTarget | null) => target is HTMLInputElement;

export const isInputTarget: IsInputTarget = (target): target is HTMLInputElement =>
  target instanceof HTMLInputElement;

export const modifyElement = <T, K extends keyof T, V extends T[K]>
  (_element: T, props: Readonly<Record<K, V>>) => {
    const entries = Object.entries(props) as [K, V][];
    // eslint-disable-next-line functional/no-return-void
    entries.forEach(([key, value]) => {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line functional/no-expression-statements, functional/immutable-data
      _element[key] = value;
    });
    return _element;
};

export const createElement = <
    T extends keyof HTMLElementTagNameMap,
    K extends keyof HTMLElementTagNameMap[T],
    V extends HTMLElementTagNameMap[T][K],
  >(tag: T, props?: Record<K, V>): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tag);
  return !props ? element : modifyElement(element, props);
}
