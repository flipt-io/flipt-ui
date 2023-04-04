import { addNamespaceToPath } from './helpers';

describe('addNamespaceToPath', () => {
  it('should return a path with the namespace key', () => {
    const path = '/';
    const key = 'test';
    const result = addNamespaceToPath(path, key);
    expect(result).toEqual('/namespaces/test');
  });

  it('should leave a path with the namespace key alone', () => {
    const path = '/namespaces/test';
    const key = 'test';
    const result = addNamespaceToPath(path, key);
    expect(result).toEqual('/namespaces/test');
  });

  it('handles existing noun in path', () => {
    const path = '/segments';
    const key = 'test';
    const result = addNamespaceToPath(path, key);
    expect(result).toEqual('/namespaces/test/segments');
  });
});
