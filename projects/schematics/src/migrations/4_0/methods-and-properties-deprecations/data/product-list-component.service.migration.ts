import {
  DEFAULT_PAGE_SIZE,
  PRODUCT_LIST_COMPONENT_SERVICE,
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/product/product-list/container/product-list-component.service.ts

export const PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PRODUCT_LIST_COMPONENT_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: DEFAULT_PAGE_SIZE,
    comment: `Property '${DEFAULT_PAGE_SIZE}' was removed, to modify default page size use '${PROVIDE_CONFIG_FUNCTION}' and set your default page size.`,
  },
];
