import { initialLoaderState } from '@spartacus/core';
import { initialEntityState } from '../entity/entity.reducer';
import { initialProcessesState } from '../processes-loader';
import {
  EntityPopAction,
  EntityProcessesResetAction,
  EntityPushAction,
} from './entity-processes-loader.action';
import { entityProcessesLoaderReducer } from './entity-processes-loader.reducer';

describe('EntityProcessesLoader reducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
        undefined,
        action
      );

      const expectedState = initialEntityState;

      expect(state).toEqual(expectedState);
    });
  });

  describe('single entity', () => {
    const TEST_ENTITY_ID = 'testId';

    describe('PUSH ACTION', () => {
      it('should increment processesCount state', () => {
        const action = new EntityPushAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              processesCount: 1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('POP ACTION', () => {
      it('should increment processesCount state', () => {
        const action = new EntityPopAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              processesCount: -1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('RESET ACTION', () => {
      it('should reset processes loader state', () => {
        const action = new EntityProcessesResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITY_ID]: {
              processesCount: 2,
              loading: false,
              error: false,
              success: true,
              value: 'data',
            },
          },
        };

        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          initialState,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              processesCount: 0,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });
  });

  describe('multiple entities', () => {
    const TEST_ENTITIES_ID = ['test1', 'test2'];

    describe('PUSH ACTION', () => {
      it('should increment processesCount state', () => {
        const action = new EntityPushAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID);
        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              processesCount: 1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
            [TEST_ENTITIES_ID[1]]: {
              processesCount: 1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('POP ACTION', () => {
      it('should decrement processesCount state', () => {
        const action = new EntityPopAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID);
        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              processesCount: -1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
            [TEST_ENTITIES_ID[1]]: {
              processesCount: -1,
              loading: false,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('RESET ACTION', () => {
      it('should reset processes loader state', () => {
        const action = new EntityProcessesResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              processesCount: 2,
              loading: false,
              error: false,
              success: true,
              value: 'data1',
            },
            [TEST_ENTITIES_ID[1]]: {
              processesCount: 3,
              loading: false,
              error: false,
              success: true,
              value: 'data2',
            },
            'another entity': {
              processesCount: 2,
              loading: false,
              error: false,
              success: true,
              value: 'data3',
            },
          },
        };

        const state = entityProcessesLoaderReducer(TEST_ENTITY_TYPE)(
          initialState,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              ...initialProcessesState,
              ...initialLoaderState,
            },
            [TEST_ENTITIES_ID[1]]: {
              ...initialProcessesState,
              ...initialLoaderState,
            },
            'another entity': {
              processesCount: 2,
              loading: false,
              error: false,
              success: true,
              value: 'data3',
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });
  });
});
