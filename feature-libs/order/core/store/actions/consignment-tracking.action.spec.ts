import { ConsignmentTracking } from '@spartacus/order/root';
import * as fromAction from './consignment-tracking.action';

const mockTracking: ConsignmentTracking = { trackingID: '1234567890' };

const mockTrackingParams = {
  userId: '123',
  orderCode: '00000001',
  consignmentCode: 'a00000001',
};

describe('Consignment Tracking Actions', () => {
  describe('LoadOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadConsignmentTracking(mockTrackingParams);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING,
        payload: mockTrackingParams,
      });
    });
  });

  describe('LoadConsignmentTrackingFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromAction.LoadConsignmentTrackingFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadConsignmentTrackingSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadConsignmentTrackingSuccess(
        mockTracking
      );

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CONSIGNMENT_TRACKING_SUCCESS,
        payload: mockTracking,
      });
    });
  });

  describe('Clear Consignment Tracking Action', () => {
    it('should create the action', () => {
      const action = new fromAction.ClearConsignmentTracking();
      expect({ ...action }).toEqual({
        type: fromAction.CLEAR_CONSIGNMENT_TRACKING,
      });
    });
  });
});
