import { ConsignmentTracking } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';
import * as fromTrackingReducer from './consignment-tracking-by-id.reducer';
const { initialStateOfConsignmentTrackingById } = fromTrackingReducer;
const mockTracking: ConsignmentTracking = {
  trackingID: '1234567890',
  trackingEvents: [],
};
describe('Consignment Tracking By Id Reducer', () => {
  describe('for undefined action', () => {
    it('should return the default state', () => {
      const action = {} as OrderActions.ConsignmentTrackingByIdAction;
      const state = fromTrackingReducer.reducer(undefined, action);
      expect(state).toBe(initialStateOfConsignmentTrackingById);
    });
  });

  describe('for LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS action', () => {
    it('should populate the consignment tracking state entities', () => {
      const action = new OrderActions.LoadConsignmentTrackingByIdSuccess({
        orderCode: 'order1',
        consignmentCode: 'cons1',
        consignmentTracking: mockTracking,
      });
      const state = fromTrackingReducer.reducer(
        initialStateOfConsignmentTrackingById,
        action
      );
      expect(state).toEqual(mockTracking);
    });
  });

  describe('for LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL action', () => {
    it('should return the default state', () => {
      const action = new OrderActions.LoadConsignmentTrackingByIdFail({
        orderCode: 'order1',
        consignmentCode: 'cons1',
        error: 'there is error',
      });
      const state = fromTrackingReducer.reducer(
        initialStateOfConsignmentTrackingById,
        action
      );
      expect(state).toEqual(initialStateOfConsignmentTrackingById);
    });
  });
});
