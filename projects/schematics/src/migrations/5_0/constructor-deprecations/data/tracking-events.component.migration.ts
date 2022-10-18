import {
  ANGULAR_CORE,
  ELEMENT_REF,
  LAUNCH_DIALOG_SERVICE,
  NGB_ACTIVE_MODAL,
  NG_BOOTSTRAP,
  ORDER_FACADE,
  ORDER_HISTORY_FACADE,
  TRACKING_EVENTS_COMPONENT,
} from '../../../../shared/constants';
import {
  SPARTACUS_ORDER_COMPONENTS,
  SPARTACUS_ORDER_ROOT,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // feature-libs/order/components/order-details/order-detail-items/consignment-tracking/tracking-events/tracking-events.component.ts
    class: TRACKING_EVENTS_COMPONENT,
    importPath: SPARTACUS_ORDER_COMPONENTS,
    deprecatedParams: [
      {
        className: NGB_ACTIVE_MODAL,
        importPath: NG_BOOTSTRAP,
      },
      {
        className: ORDER_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
    ],
    removeParams: [
      {
        className: NGB_ACTIVE_MODAL,
        importPath: NG_BOOTSTRAP,
      },
      {
        className: ORDER_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
    ],
    addParams: [
      {
        className: ORDER_HISTORY_FACADE,
        importPath: SPARTACUS_ORDER_ROOT,
      },
      {
        className: LAUNCH_DIALOG_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
      {
        className: ELEMENT_REF,
        importPath: ANGULAR_CORE,
      },
    ],
  };
