import { ConfiguratorUiKeyGeneratorComponent } from './configurator-ui-key-generator.component';

/**
const attributeCode = 1;
const currentAttribute: Configurator.Attribute = {
  name: 'attributeId',
  attrCode: attributeCode,
  uiType: Configurator.UiType.RADIOBUTTON,
};

const attributeIncomplete: Configurator.Attribute = { name: 'name' };
 */

describe('ConfigUIKeyGeneratorService', () => {
  let classUnderTest: ConfiguratorUiKeyGeneratorComponent;

  beforeEach(() => {
    classUnderTest = new ConfiguratorUiKeyGeneratorComponent();
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });
});
