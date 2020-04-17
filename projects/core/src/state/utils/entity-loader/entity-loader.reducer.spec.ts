import { entityLoaderReducer } from './entity-loader.reducer';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityLoaderResetAction,
  EntitySuccessAction,
} from './entity-loader.action';
import { StateUtils } from '@spartacus/core';

describe('EntityLoader reducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);

      const expectedState = StateUtils.initialEntityState;

      expect(state).toEqual(expectedState);
    });
  });

  describe('single entity', () => {
    const TEST_ENTITY_ID = 'testeId';

    describe('LOAD ACTION', () => {
      it('should set load state', () => {
        const action = new EntityLoadAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              loading: true,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('FAIL ACTION', () => {
      it('should set load state', () => {
        const action = new EntityFailAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              loading: false,
              error: true,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('SUCCESS ACTION', () => {
      it('should set load state', () => {
        const data = 'test Data';
        const action = {
          ...new EntitySuccessAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
          payload: data,
        };

        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              loading: false,
              error: false,
              success: true,
              value: data,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('RESET ACTION', () => {
      it('should reset load state', () => {
        const action = new EntityLoaderResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITY_ID]: {
              loading: false,
              error: false,
              success: true,
              value: 'data',
            },
          },
        };

        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(
          initialState,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
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

    describe('LOAD ACTION', () => {
      it('should set load state', () => {
        const action = new EntityLoadAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID);
        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              loading: true,
              error: false,
              success: false,
              value: undefined,
            },
            [TEST_ENTITIES_ID[1]]: {
              loading: true,
              error: false,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('FAIL ACTION', () => {
      it('should set load state', () => {
        const action = new EntityFailAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID);
        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              loading: false,
              error: true,
              success: false,
              value: undefined,
            },
            [TEST_ENTITIES_ID[1]]: {
              loading: false,
              error: true,
              success: false,
              value: undefined,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('SUCCESS ACTION', () => {
      it('should set load state', () => {
        const data = 'test Data';
        const action = {
          ...new EntitySuccessAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID),
          payload: data,
        };

        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              loading: false,
              error: false,
              success: true,
              value: data,
            },
            [TEST_ENTITIES_ID[1]]: {
              loading: false,
              error: false,
              success: true,
              value: data,
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('SUCCESS ACTION with multiple payloads', () => {
      it('should set load state', () => {
        const data = ['data1', 'data2'];
        const action = {
          ...new EntitySuccessAction(TEST_ENTITY_TYPE, TEST_ENTITIES_ID),
          payload: data,
        };

        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(undefined, action);
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              loading: false,
              error: false,
              success: true,
              value: data[0],
            },
            [TEST_ENTITIES_ID[1]]: {
              loading: false,
              error: false,
              success: true,
              value: data[1],
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('RESET ACTION', () => {
      it('should reset load state', () => {
        const action = new EntityLoaderResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID
        );
        const initialState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              loading: false,
              error: false,
              success: true,
              value: 'data1',
            },
            [TEST_ENTITIES_ID[1]]: {
              loading: false,
              error: false,
              success: true,
              value: 'data2',
            },
            'another entity': {
              loading: false,
              error: false,
              success: true,
              value: 'data3',
            },
          },
        };

        const state = entityLoaderReducer(TEST_ENTITY_TYPE)(
          initialState,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: StateUtils.initialLoaderState,
            [TEST_ENTITIES_ID[1]]: StateUtils.initialLoaderState,
            'another entity': {
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
