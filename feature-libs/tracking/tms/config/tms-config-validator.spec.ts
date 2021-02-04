import { CxEvent } from '@spartacus/core';
import { WindowObject } from '../model/tms.model';
import { TmsConfig } from './tms-config';
import { tmsConfigValidator } from './tms-config-validator';

describe('tmsConfigValidator', () => {
  it('should warn about undefined dataLayerPush', () => {
    const config: TmsConfig = {
      tagManager: {
        aep: {
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeTruthy();
  });

  it('should not warn if the config is valid', () => {
    const config: TmsConfig = {
      tagManager: {
        gtm: {
          pushStrategy: <T extends CxEvent>(
            _event: T,
            _winObj: WindowObject
          ) => {},
          events: [],
        },
        aep: {
          pushStrategy: <T extends CxEvent>(
            _event: T,
            _winObj: WindowObject
          ) => {},
          events: [],
        },
      },
    };
    expect(tmsConfigValidator(config)).toBeFalsy();
  });
});
