import { entityScopedLoaderReducer } from './entity-scoped-loader.reducer';
import { StateUtils } from '@spartacus/core';
import { EntityScopedLoaderActions } from './entity-scoped-loader.actions';

describe('entityScopedLoaderReducer', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = entityScopedLoaderReducer(TEST_ENTITY_TYPE)(
        undefined,
        action
      );

      const expectedState = StateUtils.initialEntityState;

      expect(state).toEqual(expectedState);
    });
  });

  describe('without scope', () => {
    const TEST_ENTITY_ID = 'testId';

    describe('single entity', () => {
      it('LOAD ACTION should set load state', () => {
        const action = new EntityScopedLoaderActions.EntityScopedLoadAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        const state = entityScopedLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITY_ID]: {
              '': {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('multiple entities', () => {
      const TEST_ENTITIES_ID = ['test1', 'test2'];

      it('LOAD ACTION should set load state', () => {
        const action = new EntityScopedLoaderActions.EntityScopedLoadAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID
        );
        const state = entityScopedLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              '': {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
            [TEST_ENTITIES_ID[1]]: {
              '': {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });
  });

  describe('with scope', () => {
    const SCOPE = 'testScope';
    const TEST_ENTITY_ID = 'testId';

    describe('single entity', () => {
      it('LOAD ACTION should set load state', () => {
        const action = new EntityScopedLoaderActions.EntityScopedLoadAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        const state = entityScopedLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState: any = {
          entities: {
            [TEST_ENTITY_ID]: {
              [SCOPE]: {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });

    describe('multiple entities', () => {
      const TEST_ENTITIES_ID = ['test1', 'test2'];

      it('LOAD ACTION should set load state', () => {
        const action = new EntityScopedLoaderActions.EntityScopedLoadAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITIES_ID,
          SCOPE
        );
        const state = entityScopedLoaderReducer(TEST_ENTITY_TYPE)(
          undefined,
          action
        );
        const expectedState = {
          entities: {
            [TEST_ENTITIES_ID[0]]: {
              [SCOPE]: {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
            [TEST_ENTITIES_ID[1]]: {
              [SCOPE]: {
                loading: true,
                error: false,
                success: false,
                value: undefined,
              },
            },
          },
        };
        expect(state).toEqual(expectedState);
      });
    });
  });
});
