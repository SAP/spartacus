import {
  ANGULAR_COMMON,
  ANGULAR_CORE,
  ANY_TYPE,
  BREAKPOINT_SERVICE,
  DOCUMENT,
  DOCUMENT_STRING,
  KEYBOARD_FOCUS_CONFIG,
  ON_NAVIGATE_FOCUS_SERVICE,
  ROUTER,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ON_NAVIGATE_FOCUS_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/layout/a11y/keyboard-focus/on-navigate/on-navigate-focus.service.ts
  class: ON_NAVIGATE_FOCUS_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: KEYBOARD_FOCUS_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_CORE,
    },
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
    {
      className: BREAKPOINT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
  ],
  addParams: [
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
};
