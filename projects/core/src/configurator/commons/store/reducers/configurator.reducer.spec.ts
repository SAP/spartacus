import { ConfiguratorActions } from '../actions/index';
import { ConfigurationState } from '../configuration-state';
import { Configurator } from './../../../../model/configurator.model';
import { reducer } from './configurator.reducer';

describe('ConfiguratorReducer', () => {
  const configurationState: ConfigurationState = {
    content: null,
    refresh: false,
  };
  const productCode = 'CONF_LAPTOP';
  const configuration: Configurator.Configuration = {
    configId: 'a',
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

  it('should change state on ReadConfigurationSuccess ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorActions.ReadConfigurationSuccess(configuration)
    );
    expect(result).toBeDefined();
    expect(result.content).toBeDefined();
    expect(result.content.productCode).toBe(productCode);
  });

  it('should change state on UpdateConfigurationSuccess ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorActions.UpdateConfigurationSuccess(configuration)
    );
    expect(result).toBeDefined();
    expect(result.content).toBeDefined();
    expect(result.content.productCode).toBe(productCode);
  });
});
