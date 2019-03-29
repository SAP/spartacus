import { EntityLoaderState } from './entity-loader-state';
import {
  entityErrorSelector,
  entityLoadingSelector,
  entityValueSelector,
} from './entity-loader.selectors';

describe('EntityLoader selectors', () => {
  const testId = 'testId';
  const testValue = 'test value';

  const TestState: EntityLoaderState<string> = {
    entities: {
      [testId]: {
        loading: true,
        error: false,
        success: false,
        value: testValue,
      },
    },
  };

  it('loaderValueSelector should return value', () => {
    const value = entityValueSelector(TestState, testId);
    expect(value).toBe(testValue);
  });

  it('loaderLoadingSelector should return loading flag', () => {
    const value = entityLoadingSelector(TestState, testId);
    expect(value).toBe(true);
  });

  it('loaderErrorSelector should return error flag', () => {
    const value = entityErrorSelector(TestState, testId);
    expect(value).toBe(false);
  });

  it('loaderSuccessSelector should return success flag', () => {
    const value = entityErrorSelector(TestState, testId);
    expect(value).toBe(false);
  });
});
