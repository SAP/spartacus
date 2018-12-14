import { LoaderState } from './loader-state';
import { loaderErrorSelector, loaderLoadingSelector, loaderValueSelector } from './loader.selectors';

fdescribe('Loader selectores', () => {
  const TestState: LoaderState<string> = {
    loading: true,
    error: false,
    value: 'test value'
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

});
