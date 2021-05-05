import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import {
  TOGGLE_STATUS_COMPONENT,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  ITEM_SERVICE,
  MESSAGE_SERVICE,
  FEATURE_CONFIG_SERVICE,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
export const TOGGLE_STATUS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: TOGGLE_STATUS_COMPONENT,
  importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  deprecatedParams: [
    {
      className: ITEM_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
    {
      className: MESSAGE_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: FEATURE_CONFIG_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
