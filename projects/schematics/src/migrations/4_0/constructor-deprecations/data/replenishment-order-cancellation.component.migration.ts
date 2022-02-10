import {
  ANGULAR_CORE,
  LAUNCH_DIALOG_SERVICE,
  REPLENISHMENT_ORDER_CANCELLATION_COMPONENT,
  REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  USER_REPLENISHMENT_ORDER_SERVICE,
  VIEW_CONTAINER_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const REPLENISHMENT_ORDER_CANCELLATION_COMPONENT_MIGRATION_V1: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/myaccount/order/replenishment-order-details/replenishment-order-cancellation/replenishment-order-cancellation.component.ts
    class: REPLENISHMENT_ORDER_CANCELLATION_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: USER_REPLENISHMENT_ORDER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
    ],
    removeParams: [
      {
        className: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    addParams: [
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };

export const REPLENISHMENT_ORDER_CANCELLATION_COMPONENT_MIGRATION_V2: ConstructorDeprecation =
  {
    // storefrontlib/cms-components/myaccount/order/replenishment-order-details/replenishment-order-cancellation/replenishment-order-cancellation.component.ts
    class: REPLENISHMENT_ORDER_CANCELLATION_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      {
        className: USER_REPLENISHMENT_ORDER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: VIEW_CONTAINER_REF,
        importPath: ANGULAR_CORE,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
    removeParams: [
      {
        className: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
