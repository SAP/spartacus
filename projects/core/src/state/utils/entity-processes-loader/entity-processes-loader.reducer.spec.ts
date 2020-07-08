import { StateUtils } from '@spartacus/core';
import { initialProcessesState } from '../processes-loader';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
  EntityProcessesLoaderResetAction,
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

      const expectedState = StateUtils.initialEntityState;

      expect(state).toEqual(expectedState);
    });
  });

  describe('single entity', () => {
    const TEST_ENTITY_ID = 'testId';

    describe('PROCESSES INCREMENT ACTION', () => {
      it('should increment processesCount state', () => {
        const action = new EntityProcessesIncrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
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

    describe('PROCESSES DECREMENT ACTION', () => {
      it('should decrement processesCount state', () => {
        const action = new EntityProcessesDecrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITY_ID]: {
              processesCount: 2,
              loading: false,
              error: false,
              success: false,
              value: undefined,
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

    describe('PROCESSES LOADER RESET ACTION', () => {
      it('should reset processes loader state', () => {
        const action = new EntityProcessesLoaderResetAction(
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

    describe('PROCESSES INCREMENT ACTION', () => {
      it('should increment processesCount state', () => {
        const action = new EntityProcessesIncrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID
        );
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

    describe('PROCESSES DECREMENT ACTION', () => {
      it('should decrement processesCount state', () => {
        const action = new EntityProcessesDecrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              processesCount: 3,
              loading: false,
              error: false,
              success: false,
              value: undefined,
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
              processesCount: 2,
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

    describe('PROCESSES LOADER RESET ACTION', () => {
      it('should reset processes loader state', () => {
        const action = new EntityProcessesLoaderResetAction(
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
              ...StateUtils.initialLoaderState,
            },
            [TEST_ENTITIES_ID[1]]: {
              ...initialProcessesState,
              ...StateUtils.initialLoaderState,
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
