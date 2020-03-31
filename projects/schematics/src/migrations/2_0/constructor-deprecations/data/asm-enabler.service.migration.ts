import {
  ANGULAR_COMMON,
  ANGULAR_CORE,
  ASM_ENABLER_SERVICE,
  COMPONENT_FACTORY_RESOLVER,
  LAUNCH_DIALOG_SERVICE,
  LOCATION,
  OUTLET_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ASM_ENABLE_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/asm/services/asm-enabler.service.ts
  class: ASM_ENABLER_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: LOCATION,
      importPath: ANGULAR_COMMON,
    },
    {
      className: WINDOW_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: COMPONENT_FACTORY_RESOLVER,
      importPath: ANGULAR_CORE,
    },
    {
      className: OUTLET_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  removeParams: [
    {
      className: COMPONENT_FACTORY_RESOLVER,
      importPath: ANGULAR_CORE,
    },
    {
      className: OUTLET_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: LAUNCH_DIALOG_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
