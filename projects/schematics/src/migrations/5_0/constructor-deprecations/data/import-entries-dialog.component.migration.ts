import {
  ELEMENT_REF,
  IMPORT_ENTRIES_DIALOG_COMPONENT,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const IMPORT_ENTRIES_DIALOG_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    //projects/components/import-to-cart/import-entries-dialog/import-entries-dialog.component.ts
    class: IMPORT_ENTRIES_DIALOG_COMPONENT,
    importPath: SPARTACUS_CORE,
    deprecatedParams: [],
    addParams: [
      {
        className: ELEMENT_REF,
        importPath: SPARTACUS_CORE,
      },
    ],
  };
