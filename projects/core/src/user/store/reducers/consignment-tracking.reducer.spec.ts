import * as fromTrackingAction from '../actions/consignment-tracking.action';
import * as fromTrackingReducer from './consignment-tracking.reducer';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';

describe('Consignment Tracking Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromTrackingReducer;
      const action = {} as fromTrackingAction.ConsignmentTrackingAction;
      const state = fromTrackingReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CONSIGNMENT_TRACKING_SUCCESS action', () => {
    it('should populate the order details state entities', () => {
      const mockTracking: ConsignmentTracking = {
        trackingID: '1234567890',
        trackingEvents: [],
      };

      const { initialState } = fromTrackingReducer;
      const action = new fromTrackingAction.LoadConsignmentTrackingSuccess(
        mockTracking
      );
      const state = fromTrackingReducer.reducer(initialState, action);

      expect(state.tracking).toEqual(mockTracking);
    });
  });
});
