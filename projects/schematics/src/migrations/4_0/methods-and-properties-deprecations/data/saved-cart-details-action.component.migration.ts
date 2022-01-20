import {
  NG_ON_INIT,
  ON_RESTORE_COMPLETE,
  OPEN_DIALOG,
  RESTORE_SAVED_CART,
  SAVED_CART_DETAILS_ACTION_COMPONENT,
  SAVED_CART_FORM_DIALOG_COMPONENT,
  SAVED_CART_FORM_TYPE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs/cart/saved-cart/components/details/saved-cart-details-action/saved-cart-details-action.component.ts
export const SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: SAVED_CART_DETAILS_ACTION_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: SAVED_CART_FORM_TYPE,
      comment: `// ${TODO_SPARTACUS} Property '${SAVED_CART_DETAILS_ACTION_COMPONENT}.${SAVED_CART_FORM_TYPE}' was removed.`,
    },
    {
      class: SAVED_CART_DETAILS_ACTION_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: NG_ON_INIT,
      comment: `// ${TODO_SPARTACUS} Method '${SAVED_CART_DETAILS_ACTION_COMPONENT}.${NG_ON_INIT}' was removed.`,
    },
    {
      class: SAVED_CART_DETAILS_ACTION_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: OPEN_DIALOG,
      comment: `//${TODO_SPARTACUS} Method ${SAVED_CART_DETAILS_ACTION_COMPONENT}.${OPEN_DIALOG} has a new required 2nd argument 'type'.`,
    },
    {
      class: SAVED_CART_DETAILS_ACTION_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: RESTORE_SAVED_CART,
      comment: `// ${TODO_SPARTACUS} Method '${SAVED_CART_DETAILS_ACTION_COMPONENT}.${RESTORE_SAVED_CART}' was removed. ${SAVED_CART_FORM_DIALOG_COMPONENT} will handle the restore saved cart logic`,
    },
    {
      class: SAVED_CART_DETAILS_ACTION_COMPONENT,
      importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
      deprecatedNode: ON_RESTORE_COMPLETE,
      comment: `// ${TODO_SPARTACUS} Method '${SAVED_CART_DETAILS_ACTION_COMPONENT}.${ON_RESTORE_COMPLETE}' was removed. ${SAVED_CART_FORM_DIALOG_COMPONENT} will handle the restore saved cart completion logic`,
    },
  ];
