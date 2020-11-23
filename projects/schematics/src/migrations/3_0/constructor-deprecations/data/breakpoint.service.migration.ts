import {
  ANGULAR_CORE,
  BREAKPOINT_SERVICE,
  LAYOUT_CONFIG,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const BREAKPOINT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/layout/breakpoint/breakpoint.service.ts
  class: BREAKPOINT_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
    {
      className: LAYOUT_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: 'platform',
      staticType: 'any',
      injectionToken: {
        token: 'PLATFORM_ID',
        importPath: ANGULAR_CORE,
      },
    },
    {
      className: 'SomethingElse',
      staticType: '{ test: string }',
    },
    {
      className: 'RandomClass',
      importPath: SPARTACUS_STOREFRONTLIB,
      injectionToken: {
        token: 'RandomClass',
        isArray: true,
        // importPath: SPARTACUS_STOREFRONTLIB, // TODO try without it
      },
    },
    // {
    //   className: 'SomethingLikeThis',
    //   importPath: SPARTACUS_CORE,
    // },
  ],
};
