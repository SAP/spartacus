import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';
import { tmsConfigValidator } from './tms-config-validator';

describe('tmsConfigValidator', () => {
  it('should warn about undefined dataLayerInit', () => {
    const config: TmsConfig = {
      tms: {
        gtm: {
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeTruthy();
  });
  it('should warn about undefined dataLayerPush', () => {
    const config: TmsConfig = {
      tms: {
        adobeLaunch: {
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeTruthy();
  });

  it('should not warn if the config is valid', () => {
    const config: TmsConfig = {
      tms: {
        gtm: {
          dataLayerInit: (_winRef: WindowRef) => {},
          dataLayerPush: <T extends CxEvent>(
            _event: T,
            _winRef: WindowRef
          ) => {},
          events: [],
        },
        adobeLaunch: {
          dataLayerInit: (_winRef: WindowRef) => {},
          dataLayerPush: <T extends CxEvent>(
            _event: T,
            _winRef: WindowRef
          ) => {},
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeFalsy();
  });
});
