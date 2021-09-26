import {
  DEFAULT_PAGE_SIZE,
  PRODUCT_LIST_COMPONENT_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/product/product-list/container/product-list-component.service.ts

export const PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: PRODUCT_LIST_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: DEFAULT_PAGE_SIZE,
      comment: `// ${TODO_SPARTACUS} Property '${PRODUCT_LIST_COMPONENT_SERVICE}.${DEFAULT_PAGE_SIZE}' was removed, to modify default page size use 'view.defaultPageSize' configuration property.`,
    },
  ];
