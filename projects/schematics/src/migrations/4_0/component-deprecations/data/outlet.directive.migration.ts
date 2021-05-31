import { OUTLET_DIRECTIVE } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

//projects/storefrontlib/src/cms-structure/outlet/outlet.directive.ts
export const OUTLET_DIRECTIVE_MIGRATION: ComponentData = {
  selector: '[cxOutlet]',
  componentClassName: OUTLET_DIRECTIVE,
  removedProperties: [
    {
      name: 'context',
      comment: `'context' property was removed. Has been replaced with context$ of type Observable<T>.`,
    },
  ],
};
