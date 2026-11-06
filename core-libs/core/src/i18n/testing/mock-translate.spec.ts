import { mockTranslate } from './mock-translate';

describe('mockTranslate', () => {
  it('should return key when no options given', () => {
    expect(mockTranslate('testKey')).toBe('testKey');
  });

  it('should return key when options is empty object ', () => {
    expect(mockTranslate('testKey', {})).toBe('testKey');
  });

  it('should return keys when options is empty object ', () => {
    expect(mockTranslate(['testKey1', 'testKey2'], {})).toBe(
      'testKey1,testKey2'
    );
  });

  it('should return key and option when there is one option ', () => {
    expect(mockTranslate('testKey', { a: 1 })).toBe('testKey a:1');
  });

  it('should return key and options sorted by name', () => {
    expect(mockTranslate('testKey', { c: 3, a: 1, b: 2 })).toBe(
      'testKey a:1 b:2 c:3'
    );
  });

  it('should return keys and options sorted by name', () => {
    expect(mockTranslate(['testKey1', 'testKey2'], { c: 3, a: 1, b: 2 })).toBe(
      'testKey1,testKey2 a:1 b:2 c:3'
    );
  });
});
