import { deepMerge } from './deep-merge';

describe('deepMerge utility', () => {
  it('should merge two objects', () => {
    const a = { a: 1, b: 2 };
    const b = { c: 3, b: 0 };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: 1, b: 0, c: 3 }));
  });

  it('should merge two objects where one of them has a Date property', () => {
    const olderDate = new Date('2015-05-03T12:00:00.000Z');
    const newerDate = new Date('2019-06-01T12:00:00.000Z');

    const a = {
      a: 1,
      b: newerDate,
    };
    const b = {
      c: 3,
      b: olderDate,
    };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(
      jasmine.objectContaining({
        a: 1,
        b: olderDate,
        c: 3,
      })
    );
  });

  it('should merge two objects deep', () => {
    const a = {
      a: 'val a',
      b: 'val b',
      c: { d: { f: 'val f', h: 'val h' }, e: 'val e' },
    };
    const b = { c: { d: { f: 'override' } } };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(
      jasmine.objectContaining({
        a: 'val a',
        b: 'val b',
        c: { d: { f: 'override', h: 'val h' }, e: 'val e' },
      })
    );
  });

  it('should merge two objects deep when one of them has a Date property', () => {
    const olderDate = new Date('2015-05-03T12:00:00.000Z');
    const newerDate = new Date('2019-06-01T12:00:00.000Z');

    const a = {
      a: 'val a',
      b: 'val b',
      c: { d: { f: 'val f', h: olderDate }, e: 'val e' },
    };
    const b = { c: { d: { f: 'override', h: newerDate } } };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(
      jasmine.objectContaining({
        a: 'val a',
        b: 'val b',
        c: { d: { f: 'override', h: newerDate }, e: 'val e' },
      })
    );
  });

  it('should add properties from target', () => {
    const a = { a: 1 };
    const b = { b: 2 };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: 1, b: 2 }));
  });

  it('should add properties from target when one of them has a Date property', () => {
    const date = new Date('2015-05-03T12:00:00.000Z');

    const a = { a: 1 };
    const b = { b: date };
    const merged = deepMerge(a, b);
    expect(merged).toEqual(jasmine.objectContaining({ a: 1, b: date }));
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

  it('should be possible to overwrite simple type with an object', () => {
    const a = { a: 'test3' };
    const b = { a: { value: 'test1' } };
    const merged = deepMerge(a, undefined, b, null);
    expect(merged).toEqual(jasmine.objectContaining({ a: { value: 'test1' } }));
  });
});
