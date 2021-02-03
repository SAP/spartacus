import { CxEvent } from '@spartacus/core';
import { WindowLike } from '../model/tms.model';
import { TmsConfig } from './tms-config';
import { tmsConfigValidator } from './tms-config-validator';

describe('tmsConfigValidator', () => {
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
          pushStrategy: <T extends CxEvent>(
            _event: T,
            _winRef: WindowLike
          ) => {},
          events: [],
        },
        adobeLaunch: {
          pushStrategy: <T extends CxEvent>(
            _event: T,
            _winRef: WindowLike
          ) => {},
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeFalsy();
  });
});
