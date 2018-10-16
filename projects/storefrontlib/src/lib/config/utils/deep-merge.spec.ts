import { deepMerge } from './deep-merge';

describe('deepMerge utility', () => {
  it('should merge two objects', () => {
    const a = { a: 1, b: 2 };
    const b = { c: 3, b: 0 };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: 1, b: 0, c: 3 }));
  });

  it('should merge two objects deep', () => {
    const a = {
      a: 'val a',
      b: 'val b',
      c: { d: { f: 'val f', h: 'val h' }, e: 'val e' }
    };
    const b = { c: { d: { f: 'override' } } };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(
      jasmine.objectContaining({
        a: 'val a',
        b: 'val b',
        c: { d: { f: 'override', h: 'val h' }, e: 'val e' }
      })
    );
  });

  it('should add properties from target', () => {
    const a = { a: 1 };
    const b = { b: 2 };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: 1, b: 2 }));
  });

  it('should overrite arrays', () => {
    const a = { a: ['test', 'test2'] };
    const b = { a: ['test3'] };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: ['test3'] }));
  });

  it('should work for multiple parameters', () => {
    const a = { a: ['test1'] };
    const b = { a: ['test2'], b: ['testb'] };
    const c = { a: ['test3'] };
    const merged = deepMerge(a, b, c);
    expect(merged).toEqual(
      jasmine.objectContaining({ a: ['test3'], b: ['testb'] })
    );
  });

  it('should work for undefined 1st parameter', () => {
    const b = { a: ['test3'] };
    const merged = deepMerge(undefined, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: ['test3'] }));
  });

  it('should work for undefined and null parameters', () => {
    const a = { a: ['test3'] };
    const b = { a: ['test1'] };
    const merged = deepMerge(a, undefined, b, null);
    expect(merged).toEqual(jasmine.objectContaining({ a: ['test1'] }));
  });
});
