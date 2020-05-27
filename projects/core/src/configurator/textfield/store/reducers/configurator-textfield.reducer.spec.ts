import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../actions/index';
import { ConfigurationTextfieldState } from '../configuration-textfield-state';
import { reducer } from './configurator-textfield.reducer';

describe('ConfiguratorTextfieldReducer', () => {
  const configurationState: ConfigurationTextfieldState = {
    content: null,
  };
  const productCode = 'CONF_LAPTOP';
  const attributeName = 'attributeName';
  const configuration: ConfiguratorTextfield.Configuration = {
    configurationInfos: [{ configurationLabel: attributeName }],
  };
  it('should not change state in case action is not covered in reducer', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorTextfieldActions.CreateConfiguration({
        productCode: productCode,
        owner: undefined,
      })
    );
    expect(result).toBeDefined();
    expect(result.content).toBe(null);
  });

  it('should change state on CreateConfigurationSuccess ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorTextfieldActions.CreateConfigurationSuccess(configuration)
    );
    expect(result).toBeDefined();
    expect(result.content).toEqual(configuration);
  });

  it('should change state on readFromCartEntry ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess(
        configuration
      )
    );
    expect(result).toBeDefined();
    expect(result.content).toEqual(configuration);
  });

  it('should change state on UpdateConfiguration ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorTextfieldActions.UpdateConfiguration(configuration)
    );
    expect(result).toBeDefined();
    expect(result.content).toEqual(configuration);
  });

  it('should remove state on RemoveConfiguration ', () => {
    const result = reducer(
      configurationState,
      new ConfiguratorTextfieldActions.RemoveConfiguration()
    );
    expect(result).toBeDefined();
    expect(result.content).toBeNull();
  });
});
