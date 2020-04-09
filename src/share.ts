const separator = '@@';

const encription = (key: FrameKey): string => {
  return `${key.name}${separator}${key.id}`;
}

const decription = (key: string): FrameKey => {
  const [name, id] = key.split(separator);
  return { name, id };
}

export const bcrypt = (key: string | FrameKey): string | FrameKey => {
  return (typeof key === 'string') ? decription(key) : encription(key);
}
