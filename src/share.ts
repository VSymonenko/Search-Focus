const delimiter = '💪( ͡❛ ͜ʖ ͡❛҂)';

const encription = (key: FrameKey, separator: string): string => {
  return `${key.name}${separator}${key.id}`;
}

const decription = (key: string, separator: string): FrameKey => {
  const [name, id] = key.split(separator);
  return { name, id };
}

export const bcrypt = (key: string | FrameKey, separator: string = delimiter): string | FrameKey => {
  return (typeof key === 'string') ? decription(key, separator) : encription(key, separator);
}
