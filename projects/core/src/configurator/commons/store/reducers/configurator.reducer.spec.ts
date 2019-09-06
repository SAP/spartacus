import { Configuration } from 'projects/core/src/model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { ConfigurationState } from '../configuration-state';
import { reducer } from './configurator.reducer';

describe('ConfiguratorReducer', () => {
  const configurationState: ConfigurationState = {
    content: null,
    refresh: false,
  };
  const productCode = 'CONF_LAPTOP';
  const configuration: Configuration = {
    productCode: productCode,
  };
  it('should not change state on CreateConfiguration ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorActions.CreateConfiguration(productCode)
    );
    expect(result).toBeDefined();
    expect(result.content).toBe(null);
  });

  it('should change state on CreateConfigurationSuccess ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );
    expect(result).toBeDefined();
    expect(result.content).toBeDefined();
    expect(result.content.productCode).toBe(productCode);
  });
});
