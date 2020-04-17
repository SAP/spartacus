import { Handler, resolveHandler } from '@spartacus/core';
import createSpy = jasmine.createSpy;

describe('resolveHandler', () => {
  it('should resolve handler when hasMatch returns true', () => {
    const handlers: Handler[] = [
      {
        hasMatch: () => false,
      },
      {
        hasMatch: () => true,
      },
    ];
    expect(resolveHandler(handlers)).toBe(handlers[1]);
  });

  it('should resolve handler without hasMatch', () => {
    const handlers: Handler[] = [
      {},
      {
        hasMatch: () => false,
      },
    ];
    expect(resolveHandler(handlers)).toBe(handlers[0]);
  });

  it('should resolve handler with highest priority', () => {
    const handlers: Handler[] = [
      {
        getPriority: () => -1,
      },
      {
        getPriority: () => 2,
      },
      {
        getPriority: () => 1,
      },
    ];
    expect(resolveHandler(handlers)).toBe(handlers[1]);
  });

  describe('handler without getPriority method is treated as Priotity.NORMAL or 0', () => {
    it('should resolve handler with highest priority', () => {
      const handlers: Handler[] = [
        {
          getPriority: () => -1100,
        },
        {},
        {
          getPriority: () => 1,
        },
      ];
      expect(resolveHandler(handlers)).toBe(handlers[2]);
    });

    it('should resolve handler with highest priority', () => {
      const handlers: Handler[] = [
        {
          getPriority: () => -1,
        },
        {},
        {
          getPriority: () => -3,
        },
      ];
      expect(resolveHandler(handlers)).toBe(handlers[1]);
    });
  });

  it('should take into account both hasMatch and getPriority', () => {
    const handlers: Handler[] = [
      {
        getPriority: () => 100,
        hasMatch: () => false,
      },
      {
        getPriority: () => 2,
        hasMatch: () => true,
      },
    ];
    expect(resolveHandler(handlers)).toBe(handlers[1]);
  });

  it('should return undefined if there is no match', () => {
    const handlers: Handler[] = [
      {
        hasMatch: () => false,
      },
    ];
    expect(resolveHandler(handlers)).toBeUndefined();
  });

  it('should return undefined if there is no handlers', () => {
    expect(resolveHandler([])).toBeUndefined();
  });

  it('should return undefined for passing undefined as handlers array', () => {
    expect(resolveHandler(undefined)).toBeUndefined();
  });

  it('will pass hasMatch parameters to hasMatch method', () => {
    const handlers: Handler[] = [
      {
        hasMatch: createSpy(),
      },
    ];
    const hasMatchParams = ['a', 3];
    resolveHandler(handlers, hasMatchParams);
    expect(handlers[0].hasMatch).toHaveBeenCalledWith(...hasMatchParams);
  });

  it('will pass getPriority parameters to getPriority method', () => {
    const handlers: Handler[] = [
      {
        getPriority: createSpy(),
      },
      {
        getPriority: createSpy(),
      },
    ];
    const getPriorityParams = ['a', 3];
    resolveHandler(handlers, undefined, getPriorityParams);
    expect(handlers[0].getPriority).toHaveBeenCalledWith(...getPriorityParams);
    expect(handlers[1].getPriority).toHaveBeenCalledWith(...getPriorityParams);
  });

  it('should not do priority valuation if only one handler is matching', () => {
    const handlers: Handler[] = [
      {
        getPriority: createSpy(),
      },
    ];
    resolveHandler(handlers);
    expect(handlers[0].getPriority).not.toHaveBeenCalled();
  });
});
