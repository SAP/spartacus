import {
  QUALTRICS_COMPONENT,
  QUALTRICS_CONFIG,
  QUALTRICS_LOADER_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const QUALTRICS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
  class: QUALTRICS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: QUALTRICS_LOADER_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: QUALTRICS_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
