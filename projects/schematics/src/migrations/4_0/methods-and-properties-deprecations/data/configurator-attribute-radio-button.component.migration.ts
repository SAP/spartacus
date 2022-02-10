import {
  CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT,
  ON_DESELECT,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//feature-libs/product-configurator/rulebased/components/attribute/types/radio-button/configurator-attribute-radio-button.component.ts
export const CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: ON_DESELECT,
      comment: `// ${TODO_SPARTACUS} Method '${ON_DESELECT}' was removed from '${CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT}'. It is no longer used.`,
    },
  ];
