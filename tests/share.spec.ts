import { bcrypt } from '../src/share';

test('should be bidirectional transform', () => {
  const key = {
    name: 'test',
    id: '1',
  };
  const delimiter = '➕';

  const str = bcrypt(key, delimiter);

  expect(str).toEqual('test➕1');

  expect(bcrypt(str, delimiter)).toEqual(
    expect.objectContaining({
      name: 'test',
      id: '1',
    })
  );
});
