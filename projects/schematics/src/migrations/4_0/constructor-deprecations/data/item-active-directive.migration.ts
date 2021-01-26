import {
  CURRENT_UNIT_SERVICE,
  ITEM_ACTIVE_DIRECTIVE,
  ITEM_SERVICE,
  MESSAGE_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ITEM_ACTIVE_DIRECTIVE_MIGRATION: ConstructorDeprecation = {
  // feature-libs\organization\administration\components\shared\item-active.directive.ts
  class: ITEM_ACTIVE_DIRECTIVE,
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
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
