import {
  ANGULAR_CORE,
  ANY_TYPE,
  PLATFORM,
  PLATFORM_ID_STRING,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const LAUNCH_DIALOG_SERVICE_MIGRATION: ConstructorDeprecation = {
  // TODO Delete ONLY FOR TESTING
  class: 'LaunchDialogService',
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: 'LayoutConfig',
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: 'platform',
      staticType: 'any',
    },
    {
      className: 'RandomClass',
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    // {
    //   className: 'SomethingHere',
    //   importPath: SPARTACUS_STOREFRONTLIB,
    // },
  ],
  removeParams: [
    {
      className: PLATFORM,
      staticType: ANY_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
    {
      className: 'RandomClass',
      importPath: SPARTACUS_STOREFRONTLIB,
      injectionToken: {
        token: 'RandomClass',
        // importPath: SPARTACUS_STOREFRONTLIB, // TODO try without it
      },
    },
  ],
};
