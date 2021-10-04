import {
  GET_CONTROL,
  ITEM_COUNTER_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/shared/components/item-counter/item-counter.component.ts
export const ITEM_COUNTER_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ITEM_COUNTER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CONTROL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CONTROL}' was removed from '${ITEM_COUNTER_COMPONENT}'. Instead of returning an Observable in the method, it is being subscribed in the ngOnInit.`,
  },
];
