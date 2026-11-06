import { LoaderState } from './loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from './loader.selectors';

describe('Loader selectors', () => {
  const TestState: LoaderState<string> = {
    loading: true,
    error: false,
    success: false,
    value: 'test value',
  };

  it('loaderValueSelector should return value', () => {
    const value = loaderValueSelector(TestState);
    expect(value).toBe(TestState.value);
  });

  it('loaderLoadingSelector should return loading flag', () => {
    const value = loaderLoadingSelector(TestState);
    expect(value).toBe(TestState.loading);
  });

  it('loaderErrorSelector should return error flag', () => {
    const value = loaderErrorSelector(TestState);
    expect(value).toBe(TestState.error);
  });

  it('loaderErrorSelector should return error flag', () => {
    const value = loaderSuccessSelector(TestState);
    expect(value).toBe(TestState.success);
  });
});
