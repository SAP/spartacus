import {
  ANGULAR_CORE,
  PLATFORM_ID_STRING,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const WINDOW_REF_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/window/window-ref.ts
  class: WINDOW_REF,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
  addParams: [
    {
      className: PLATFORM_ID_STRING,
      importPath: ANGULAR_CORE,
    },
  ],
};
