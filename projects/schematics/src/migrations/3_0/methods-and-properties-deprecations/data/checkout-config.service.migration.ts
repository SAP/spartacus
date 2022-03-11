import {
  CHECKOUT_CONFIG_SERVICE,
  CHECKOUT_STEP_SERVICE,
  GET_CHECKOUT_STEP,
  GET_CHECKOUT_STEP_ROUTE,
  GET_CURRENT_STEP_INDEX,
  GET_FIRST_CHECKOUT_STEP_ROUTE,
  GET_NEXT_CHECKOUT_STEP_URL,
  GET_PREVIOUS_CHECKOUT_STEP_URL,
  SPARTACUS_STOREFRONTLIB,
  STEPS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/checkout/services/checkout-config.service.ts
export const CHECKOUT_CONFIG_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: STEPS,
    comment: `// ${TODO_SPARTACUS} Method '${STEPS}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use ${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CHECKOUT_STEP,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CHECKOUT_STEP}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CHECKOUT_STEP}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CHECKOUT_STEP_ROUTE,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CHECKOUT_STEP_ROUTE}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CHECKOUT_STEP_ROUTE}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_FIRST_CHECKOUT_STEP_ROUTE,
    comment: `// ${TODO_SPARTACUS} Method '${GET_FIRST_CHECKOUT_STEP_ROUTE}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_FIRST_CHECKOUT_STEP_ROUTE}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_NEXT_CHECKOUT_STEP_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_NEXT_CHECKOUT_STEP_URL}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_NEXT_CHECKOUT_STEP_URL}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_PREVIOUS_CHECKOUT_STEP_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PREVIOUS_CHECKOUT_STEP_URL}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_PREVIOUS_CHECKOUT_STEP_URL}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CURRENT_STEP_INDEX,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CURRENT_STEP_INDEX}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CURRENT_STEP_INDEX}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
];
