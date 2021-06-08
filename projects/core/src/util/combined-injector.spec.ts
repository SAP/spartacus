import { InjectFlags, Injector } from '@angular/core';
import { CombinedInjector } from './combined-injector';

const rootInjector = Injector.create({
  providers: [
    { provide: '0', useValue: '0-root' },
    {
      provide: 'a',
      useValue: '0-main',
    },
    {
      provide: 'b',
      useValue: 'b-main',
    },
  ],
});

const mainInjector = Injector.create({
  providers: [
    {
      provide: 'a',
      useValue: 'a-main',
    },
    {
      provide: 'd',
      useValue: 'd-main',
    },
  ],
  parent: rootInjector,
});

const secondInjector = Injector.create({
  providers: [
    {
      provide: 'b',
      useValue: 'b-second',
    },
    {
      provide: 'd',
      useValue: 'd-second',
    },
    {
      provide: 'e',
      useValue: 'e-second',
    },
  ],
  parent: rootInjector,
});

const thirdInjector = Injector.create({
  providers: [
    {
      provide: 'c',
      useValue: 'c-third',
    },
    {
      provide: 'e',
      useValue: 'e-third',
    },
  ],
  parent: rootInjector,
});

describe('CombinedInjector', () => {
  let injector: CombinedInjector;
  beforeEach(() => {
    injector = new CombinedInjector(rootInjector, [
      mainInjector,
      secondInjector,
      thirdInjector,
    ]);
  });

  it('should return results from all injector', () => {
    expect(injector.get('a')).toEqual('a-main');
    expect(injector.get('b')).toEqual('b-second');
    expect(injector.get('c')).toEqual('c-third');
  });

  it('should fallback to root injector', () => {
    expect(injector.get('0')).toEqual('0-root');
  });
  it('should prioritize child injectors by their order', () => {
    expect(injector.get('e')).toEqual('e-second');
  });
  it('should support default value correctly', () => {
    expect(injector.get('xxx', 'default')).toEqual('default');
    expect(injector.get('a', 'default')).not.toEqual('default');
  });

  describe('when using self flag', () => {
    it('should throw error if default value is not provided', () => {
      expect(() =>
        injector.get('a' as any, undefined, InjectFlags.Self)
      ).toThrowError();
    });
    it('should return default value', () => {
      expect(injector.get('a' as any, 'default', InjectFlags.Self)).toEqual(
        'default'
      );
    });
  });
});
