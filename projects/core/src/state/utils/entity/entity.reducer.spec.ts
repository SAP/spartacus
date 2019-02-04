import { entityReducer, initialEntityState } from './entity.reducer';
import { EntityAction } from './entity.action';

describe('Entity reducer', () => {
  const testSubReducer = jasmine
    .createSpy()
    .and.callFake((state = 'test', action) =>
      action.payload ? action.payload : state
    );

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = entityReducer('testType', testSubReducer)(
        undefined,
        action
      );

      expect(state).toEqual(initialEntityState);
    });
  });

  describe('entity action', () => {
    it('should use targeted reducer', () => {
      const action = {
        meta: { entityId: 'testId', entityType: 'testType' }
      } as EntityAction;
      const state = entityReducer('testType', testSubReducer)(
        undefined,
        action
      );
      const expectedState = {
        entities: {
          testId: 'test'
        }
      };

      expect(state).toEqual(expectedState);
      expect(testSubReducer).toHaveBeenCalledWith(undefined, action);
    });

    it('should use targeted reducer for multiple items', () => {
      const action = {
        payload: 'data',
        meta: { entityId: ['id1', 'id2'], entityType: 'testType' }
      } as EntityAction;
      const state = entityReducer('testType', testSubReducer)(
        undefined,
        action
      );
      const expectedState = {
        entities: {
          id1: 'data',
          id2: 'data'
        }
      };

      expect(state).toEqual(expectedState);
      expect(testSubReducer).toHaveBeenCalledWith(undefined, action);
    });

    it('should use targeted reducer for multiple items with payload partitioning', () => {
      const action = {
        payload: ['data1', 'data2'],
        meta: { entityId: ['id1', 'id2'], entityType: 'testType' }
      } as EntityAction;
      const state = entityReducer('testType', testSubReducer)(
        undefined,
        action
      );
      const expectedState = {
        entities: {
          id1: 'data1',
          id2: 'data2'
        }
      };

      expect(state).toEqual(expectedState);
      expect(testSubReducer).toHaveBeenCalledWith(undefined, {
        ...action,
        payload: action.payload[0]
      });
      expect(testSubReducer).toHaveBeenCalledWith(undefined, {
        ...action,
        payload: action.payload[1]
      });
    });
  });
});
