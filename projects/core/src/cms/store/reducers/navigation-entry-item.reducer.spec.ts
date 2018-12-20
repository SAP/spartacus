import * as fromComponent from './navigation-entry-item.reducer';
import * as fromActions from '../actions/navigation-entry-item.action';
import { CmsComponent } from '../../../occ/occ-models/index';

describe('Navigation Entry Item Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromComponent;
      const action = {} as any;
      const state = fromComponent.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_NAVIGATION_ITEMS_SUCCESS action', () => {
    it('should populate the component state nodes', () => {
      const mockComponents: CmsComponent[] = [
        { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
        { uid: 'comp2', typeCode: 'SimpleBannerComponent2' }
      ];

      const mockPayload = { nodeId: 'testId', components: mockComponents };

      const mockNodes: any = {
        testId: {
          comp1_AbstractCMSComponent: {
            uid: 'comp1',
            typeCode: 'SimpleBannerComponent1'
          },
          comp2_AbstractCMSComponent: {
            uid: 'comp2',
            typeCode: 'SimpleBannerComponent2'
          }
        }
      };

      const { initialState } = fromComponent;
      const action = new fromActions.LoadNavigationItemsSuccess(mockPayload);
      const state = fromComponent.reducer(initialState, action);
      expect(state.nodes).toEqual(mockNodes);
    });
  });
});
