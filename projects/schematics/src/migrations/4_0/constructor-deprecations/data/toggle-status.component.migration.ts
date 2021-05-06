import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
import {
  TOGGLE_STATUS_COMPONENT,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  ITEM_SERVICE,
  MESSAGE_SERVICE,
  FEATURE_CONFIG_SERVICE,
  SPARTACUS_CORE,
  DISABLE_INFO_SERVICE,
} from '../../../../shared/constants';

export const TOGGLE_STATUS_COMPONENT_MIGRATION_V1: ConstructorDeprecation = {
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
  ],
  addParams: [
    {
      className: DISABLE_INFO_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
  ],
};

export const TOGGLE_STATUS_COMPONENT_MIGRATION_V2: ConstructorDeprecation = {
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
  addParams: [
    {
      className: DISABLE_INFO_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    },
  ],
};
