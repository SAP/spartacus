import { EntityState } from './entity-state';
import { entitySelector } from './entity.selectors';

describe('Entity selectors', () => {
  const TestState: EntityState<string> = {
    entities: {
      testId: 'testData',
    },
  };

  it('entitySelector should return state', () => {
    const value = entitySelector(TestState, 'testId');
    expect(value).toBe('testData');
  });
});
