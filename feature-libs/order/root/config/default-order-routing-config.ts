import { RoutingConfig } from '@spartacus/core';

export const defaultOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orders: {
        paths: ['my-account/orders'],
      },
      orderDetails: {
        paths: ['my-account/order/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      orderGuest: {
        paths: ['guest/order/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      orderReturn: {
        paths: ['my-account/order/return/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      orderReturnConfirmation: {
        paths: ['my-account/order/return/confirmation/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      orderCancel: {
        paths: ['my-account/order/cancel/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      orderCancelConfirmation: {
        paths: ['my-account/order/cancel/confirmation/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      returnRequestDetails: {
        paths: ['my-account/return-request/:returnCode'],
        paramsMapping: { returnCode: 'rma' },
      },
      replenishmentOrders: {
        paths: ['my-account/my-replenishments'],
      },
      replenishmentDetails: {
        paths: ['my-account/my-replenishment/:replenishmentOrderCode'],
        paramsMapping: { replenishmentOrderCode: 'replenishmentOrderCode' },
      },
    },
  },
};
