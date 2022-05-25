import {
  ELEMENT_REF,
  IMPORT_ENTRIES_DIALOG_COMPONENT,
  LAUNCH_DIALOG_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CART_IMPORT_EXPORT_COMPONENTS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const IMPORT_ENTRIES_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //feature-libs/cart/import-export/components/import-to-cart/import-entries-dialog/import-entries-dialog.component.ts
    class: IMPORT_ENTRIES_DIALOG_COMPONENT,
    importPath: SPARTACUS_CART_IMPORT_EXPORT_COMPONENTS,
    deprecatedParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: ELEMENT_REF,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
