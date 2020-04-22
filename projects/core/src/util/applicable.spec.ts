import { Applicable, resolveApplicable } from '@spartacus/core';
import createSpy = jasmine.createSpy;

describe('resolveApplicable', () => {
  it('should resolve applicable when hasMatch returns true', () => {
    const applicables: Applicable[] = [
      {
        hasMatch: () => false,
      },
      {
        hasMatch: () => true,
      },
    ];
    expect(resolveApplicable(applicables)).toBe(applicables[1]);
  });

  it('should resolve applicable without hasMatch', () => {
    const applicables: Applicable[] = [
      {},
      {
        hasMatch: () => false,
      },
    ];
    expect(resolveApplicable(applicables)).toBe(applicables[0]);
  });

  it('should resolve applicable with highest priority', () => {
    const applicables: Applicable[] = [
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
    expect(resolveApplicable(applicables)).toBe(applicables[1]);
  });

  describe('applicable without getPriority method is treated as Priotity.NORMAL or 0', () => {
    it('should resolve applicable with highest priority', () => {
      const applicables: Applicable[] = [
        {
          getPriority: () => -1100,
        },
        {},
        {
          getPriority: () => 1,
        },
      ];
      expect(resolveApplicable(applicables)).toBe(applicables[2]);
    });

    it('should resolve applicable with highest priority', () => {
      const applicables: Applicable[] = [
        {
          getPriority: () => -1,
        },
        {},
        {
          getPriority: () => -3,
        },
      ];
      expect(resolveApplicable(applicables)).toBe(applicables[1]);
    });
  });

  it('should take into account both hasMatch and getPriority', () => {
    const applicables: Applicable[] = [
      {
        getPriority: () => 100,
        hasMatch: () => false,
      },
      {
        getPriority: () => 2,
        hasMatch: () => true,
      },
    ];
    expect(resolveApplicable(applicables)).toBe(applicables[1]);
  });

  it('should return undefined if there is no match', () => {
    const applicables: Applicable[] = [
      {
        hasMatch: () => false,
      },
    ];
    expect(resolveApplicable(applicables)).toBeUndefined();
  });

  it('should return undefined if there is no applicables', () => {
    expect(resolveApplicable([])).toBeUndefined();
  });

  it('should return undefined for passing undefined as applicables array', () => {
    expect(resolveApplicable(undefined)).toBeUndefined();
  });

  it('will pass hasMatch parameters to hasMatch method', () => {
    const applicables: Applicable[] = [
      {
        hasMatch: createSpy(),
      },
    ];
    const hasMatchParams = ['a', 3];
    resolveApplicable(applicables, hasMatchParams);
    expect(applicables[0].hasMatch).toHaveBeenCalledWith(...hasMatchParams);
  });

  it('will pass getPriority parameters to getPriority method', () => {
    const applicables: Applicable[] = [
      {
        getPriority: createSpy(),
      },
      {
        getPriority: createSpy(),
      },
    ];
    const getPriorityParams = ['a', 3];
    resolveApplicable(applicables, undefined, getPriorityParams);
    expect(applicables[0].getPriority).toHaveBeenCalledWith(
      ...getPriorityParams
    );
    expect(applicables[1].getPriority).toHaveBeenCalledWith(
      ...getPriorityParams
    );
  });

  it('should not do priority valuation if only one applicable is matching', () => {
    const applicables: Applicable[] = [
      {
        getPriority: createSpy(),
      },
    ];
    resolveApplicable(applicables);
    expect(applicables[0].getPriority).not.toHaveBeenCalled();
  });

  it('in case of identical priorities last one applicable should win', () => {
    const applicables: Applicable[] = [{}, {}, {}];
    expect(resolveApplicable(applicables)).toBe(applicables[2]);
  });
});
