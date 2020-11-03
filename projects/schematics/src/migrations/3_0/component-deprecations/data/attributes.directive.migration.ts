import { ATTRIBUTES_DIRECTIVE } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const ATTRIBUTES_DIRECTIVE_MIGRATION: ComponentData = {
  // integration-libs/cds/src/merchandising/cms-components/directives/attributes/attributes.directive.ts
  selector: '[cxAttributes]',
  componentClassName: ATTRIBUTES_DIRECTIVE,
  removedInputOutputProperties: [
    {
      name: 'cxAttributes',
      comment: `'cxAttributes' property type has changed from 'Map' to an 'object with dynamic keys'`,
    },
  ],
};
