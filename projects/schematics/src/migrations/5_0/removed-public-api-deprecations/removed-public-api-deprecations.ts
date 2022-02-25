import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  BAD_REQUEST_HANDLER,
  BAD_VOUCHER_REQUEST_HANDLER,
  CONFIGURATOR_EVENT_LISTENER,
  HANDLE_VOUCHER_OPERATION_ERROR,
  SPARTACUS_CORE,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // feature-libs/product-configurator/rulebased/core/event/rulebased-configurator-event.listener.ts
  {
    node: CONFIGURATOR_EVENT_LISTENER,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    comment: `'${CONFIGURATOR_EVENT_LISTENER} has been removed and is no longer part of the public API. Please use 'ConfiguratorRouterListener' instead`,
  },
  // projects/core/src/global-message/http-interceptors/handlers/bad-request/bad-request.handler.ts
  {
    node: BAD_REQUEST_HANDLER,
    importPath: SPARTACUS_CORE,
    comment: `'${HANDLE_VOUCHER_OPERATION_ERROR} has been removed and is no longer part of the public API. Please use new methods in ${BAD_VOUCHER_REQUEST_HANDLER}`,
  },
];

export const CART_LIB_REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  {
    node: 'OrderConfirmationOverviewComponent',
    importPath: '@spartacus/checkout/components',
    comment:
      'Class OrderConfirmationOverviewComponent has been removed and is no longer part of the public API.',
  },
  {
    node: 'RESET_WISH_LIST_DETAILS',
    importPath: '@spartacus/core',
    comment:
      'Variable CartActions.RESET_WISH_LIST_DETAILS has been removed and is no longer part of the public API.',
  },
  {
    node: 'SET_TEMP_CART',
    importPath: '@spartacus/core',
    comment:
      'Variable CartActions.SET_TEMP_CART has been removed and is no longer part of the public API.',
  },
  {
    node: 'SetTempCart',
    importPath: '@spartacus/core',
    comment:
      'Class CartActions.SetTempCart has been removed and is no longer part of the public API.',
  },
  {
    node: 'CartModule',
    importPath: '@spartacus/core',
    comment:
      'Class CartModule has been removed and is no longer part of the public API.',
  },
  {
    node: 'CartOccModule',
    importPath: '@spartacus/core',
    comment:
      'Class CartOccModule has been removed and is no longer part of the public API.',
  },
  {
    node: 'getActiveCartId',
    importPath: '@spartacus/core',
    comment:
      'Variable MultiCartSelectors.getActiveCartId has been removed and is no longer part of the public API.',
  },
  {
    node: 'getWishListId',
    importPath: '@spartacus/core',
    comment:
      'Variable MultiCartSelectors.getWishListId has been removed and is no longer part of the public API.',
  },
  {
    node: 'OccOrderNormalizer',
    importPath: '@spartacus/core',
    comment:
      'Class OccOrderNormalizer has been removed and is no longer part of the public API.',
  },
  {
    node: 'OccReplenishmentOrderNormalizer',
    importPath: '@spartacus/core',
    comment:
      'Class OccReplenishmentOrderNormalizer has been removed and is no longer part of the public API.',
  },
  {
    node: 'OccUserOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class OccUserOrderAdapter has been removed and is no longer part of the public API.',
  },
  {
    node: 'OccUserReplenishmentOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class OccUserReplenishmentOrderAdapter has been removed and is no longer part of the public API.',
  },
  {
    node: 'OrderEntryPromotionsService',
    importPath: '@spartacus/core',
    comment:
      'Class OrderEntryPromotionsService has been removed and is no longer part of the public API.',
  },
  {
    node: 'SaveCartAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class SaveCartAdapter has been removed and is no longer part of the public API.',
  },
  {
    node: 'SaveCartConnector',
    importPath: '@spartacus/core',
    comment:
      'Class SaveCartConnector has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_ORDER_DETAILS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_ORDER_DETAILS has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_ORDERS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_ORDERS has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_REPLENISHMENT_ORDER_DETAILS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_REPLENISHMENT_ORDER_DETAILS has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_REPLENISHMENT_ORDERS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_REPLENISHMENT_ORDERS has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_RETURN_REQUEST_DETAILS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_RETURN_REQUEST_DETAILS has been removed and is no longer part of the public API.',
  },
  {
    node: 'USER_RETURN_REQUESTS',
    importPath: '@spartacus/core',
    comment:
      'Variable USER_RETURN_REQUESTS has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserOccTransitional_4_2_Module',
    importPath: '@spartacus/core',
    comment:
      'Class UserOccTransitional_4_2_Module has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserOccTransitionalModule',
    importPath: '@spartacus/core',
    comment:
      'Class UserOccTransitionalModule has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderAdapter has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserOrderConnector',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderConnector has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserOrderService',
    importPath: '@spartacus/core',
    comment:
      'Class UserOrderService has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserReplenishmentOrderAdapter',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderAdapter has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserReplenishmentOrderConnector',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderConnector has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserReplenishmentOrderService',
    importPath: '@spartacus/core',
    comment:
      'Class UserReplenishmentOrderService has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserTransitional_4_2_Module',
    importPath: '@spartacus/core',
    comment:
      'Class UserTransitional_4_2_Module has been removed and is no longer part of the public API.',
  },
  {
    node: 'UserTransitionalModule',
    importPath: '@spartacus/core',
    comment:
      'Class UserTransitionalModule has been removed and is no longer part of the public API.',
  },
  {
    node: 'CartComponentModule',
    importPath: '@spartacus/storefront',
    comment:
      'Class CartComponentModule has been removed and is no longer part of the public API.',
  },
  {
    node: 'CartOrderEntriesContext',
    importPath: '@spartacus/storefront',
    comment:
      'Class CartOrderEntriesContext has been removed and is no longer part of the public API.',
  },
  {
    node: 'OrderDetailsServiceTransitionalToken',
    importPath: '@spartacus/storefront',
    comment:
      'Class OrderDetailsServiceTransitionalToken has been removed and is no longer part of the public API.',
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, [
      ...REMOVED_PUBLIC_API_DATA,
      ...CART_LIB_REMOVED_PUBLIC_API_DATA,
    ]);
  };
}
