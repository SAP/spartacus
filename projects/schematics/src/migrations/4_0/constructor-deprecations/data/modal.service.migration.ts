import {
  ANGULAR_CORE,
  APPLICATION_REF,
  FEATURE_CONFIG_SERVICE,
  MODAL_SERVICE,
  NGB_MODAL,
  NG_BOOTSTRAP,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const MODAL_SERVICE_MIGRATION_V1: ConstructorDeprecation = {
  // projects/storefrontlib/shared/components/modal/modal.service.ts
  class: MODAL_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: NGB_MODAL, importPath: NG_BOOTSTRAP },
    { className: APPLICATION_REF, importPath: ANGULAR_CORE },
    { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
  removeParams: [
    { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_STOREFRONTLIB },
  ],
};

export const MODAL_SERVICE_MIGRATION_V2: ConstructorDeprecation = {
  // projects/storefrontlib/shared/components/modal/modal.service.ts
  class: MODAL_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [{ className: NGB_MODAL, importPath: NG_BOOTSTRAP }],
  addParams: [{ className: APPLICATION_REF, importPath: ANGULAR_CORE }],
};
