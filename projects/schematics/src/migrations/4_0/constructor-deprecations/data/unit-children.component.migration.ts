import {
  CURRENT_UNIT_SERVICE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE,
  UNIT_CHILDREN_COMPONENT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const UNIT_CHILDREN_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs\organization\administration\components\unit\links\children\unit-children.component.ts
  class: UNIT_CHILDREN_COMPONENT,
  importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
  deprecatedParams: [],
  addParams: [
    {
      className: CURRENT_UNIT_SERVICE,
      importPath: SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE,
    },
  ],
};
