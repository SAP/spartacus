import {
  KEYBOARD_FOCUS_SERVICE,
  SKIP_LINK_CONFIG,
  SKIP_LINK_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SKIP_LINK_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\layout\a11y\skip-link\service\skip-link.service.ts
  class: SKIP_LINK_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SKIP_LINK_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: KEYBOARD_FOCUS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
