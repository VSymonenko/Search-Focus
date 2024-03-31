type IsInputTarget = (target: EventTarget | null) => target is HTMLInputElement;

export const isInputTarget: IsInputTarget = (target): target is HTMLInputElement =>
  target instanceof HTMLInputElement;
