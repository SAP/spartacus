import { UiType } from '../../../../../model/configurator.model';
import { OccConfigurator } from '../occ-configurator.models';
import { UiTypeFinderVariantService } from './ui-type-finder-variant.service';

describe('UiTypeFinderVariantService (in unit test)', () => {
  let uiTypeFinder: UiTypeFinderVariantService;

  beforeEach(() => {
    uiTypeFinder = new UiTypeFinderVariantService();
  });

  it('should be created', () => {
    expect(uiTypeFinder).toBeTruthy();
  });

  it('should return UIType Radio Button for Radio Button occ configurator type', () => {
    expect(
      uiTypeFinder.findUiTypeForOccConfiguratorVariantType(
        OccConfigurator.UiType.RADIO_BUTTON
      )
    ).toBe(UiType.RADIOBUTTON);
  });

  it('should return UIType Not Implemented for unkonwn occ configurator type', () => {
    expect(
      uiTypeFinder.findUiTypeForOccConfiguratorVariantType(
        OccConfigurator.UiType.CHECK_BOX_LIST
      )
    ).toBe(UiType.NOT_IMPLEMENTED);
  });
});
