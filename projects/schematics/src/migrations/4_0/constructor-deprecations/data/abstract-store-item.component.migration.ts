import {
  ABSTRACT_STORE_ITEM_COMPONENT,
  SPARTACUS_STOREFINDER,
  STORE_DATA_SERVICE,
  STORE_FINDER_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ABSTRACT_STORE_ITEM_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // feature-libs/storefinder/components/abstract-store-item/abstract-store-item.component.ts
  class: ABSTRACT_STORE_ITEM_COMPONENT,
  importPath: SPARTACUS_STOREFINDER,
  deprecatedParams: [
    {
      className: STORE_DATA_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
  ],
  removeParams: [
    {
      className: STORE_DATA_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
  ],
  addParams: [
    {
      className: STORE_FINDER_SERVICE,
      importPath: SPARTACUS_STOREFINDER,
    },
  ],
};
