import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { CONSIGNMENT_TRACKING_BY_ID_ENTITIES } from '../order-state';
import * as fromAction from './consignment-tracking-by-id.action';

const mockTracking: ConsignmentTracking = {
  trackingID: '1234567890',
  trackingUrl: 'url',
};

describe('Consignment Tracking By Id Actions', () => {
  describe('LoadConsignmentTrackingById Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadConsignmentTrackingById({
        orderCode: 'order1',
        consignmentCode: 'cons1',
        userId: 'user1',
      });

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING_BY_ID,
        payload: {
          orderCode: 'order1',
          consignmentCode: 'cons1',
          userId: 'user1',
        },
        meta: StateUtils.entityLoadMeta(
          CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
          'order1,cons1'
        ),
      });
    });
  });

  describe('LoadConsignmentTrackingByIdFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadConsignmentTrackingByIdFail({
        orderCode: 'order1',
        consignmentCode: 'cons1',
        error: 'error',
      });

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL,
        payload: {
          orderCode: 'order1',
          consignmentCode: 'cons1',
          error: 'error',
        },
        meta: StateUtils.entityFailMeta(
          CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
          'order1,cons1',
          'error'
        ),
      });
    });
  });

  describe('LoadConsignmentTrackingByIdSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadConsignmentTrackingByIdSuccess({
        orderCode: 'order1',
        consignmentCode: 'cons1',
        consignmentTracking: mockTracking,
      });

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS,
        payload: {
          orderCode: 'order1',
          consignmentCode: 'cons1',
          consignmentTracking: mockTracking,
        },
        meta: StateUtils.entitySuccessMeta(
          CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
          'order1,cons1'
        ),
      });
    });
  });
});
