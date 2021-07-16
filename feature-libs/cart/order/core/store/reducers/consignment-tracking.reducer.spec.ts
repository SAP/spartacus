import { ConsignmentTracking } from '../../../model/index';
import { UserActions } from '../actions/index';
import * as fromTrackingReducer from './consignment-tracking.reducer';

describe('Consignment Tracking Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromTrackingReducer;
      const action = {} as UserActions.ConsignmentTrackingAction;
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
      const action = new UserActions.LoadConsignmentTrackingSuccess(
        mockTracking
      );
      const state = fromTrackingReducer.reducer(initialState, action);

      expect(state.tracking).toEqual(mockTracking);
    });
  });

  describe('CLEAR_CONSIGNMENT_TRACKING action', () => {
    it('should return the default state', () => {
      const { initialState } = fromTrackingReducer;
      const action = new UserActions.ClearConsignmentTracking();
      const state = fromTrackingReducer.reducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
