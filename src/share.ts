const delimiter = '💪( ͡❛ ͜ʖ ͡❛҂)';

const encription = (key: Readonly<FrameKey>, separator: string): string => {
  return `${key.name}${separator}${key.id}`;
}

const decription = (key: string, separator: string): FrameKey => {
  const [name, id] = key.split(separator);
  return { name, id };
}

type Bcrypt = (key: string | Readonly<FrameKey>, separator?: string)
  => string | FrameKey;
export const bcrypt: Bcrypt = (key, separator = delimiter): string | FrameKey => {
  return (typeof key === 'string')
    ? decription(key, separator)
    : encription(key, separator);
}
