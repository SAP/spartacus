import { EntityScopedLoaderActions } from './entity-scoped-loader.actions';
import {
  ENTITY_FAIL_ACTION,
  ENTITY_LOAD_ACTION,
  ENTITY_RESET_ACTION,
  ENTITY_SUCCESS_ACTION,
} from '../entity-loader/entity-loader.action';

describe('EntityScopedLoaderActions', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testId';
  const SCOPE = 'testScope';

  describe('Action creators', () => {
    describe('EntityScopedLoadAction', () => {
      it('should create an action', () => {
        const action = new EntityScopedLoaderActions.EntityScopedLoadAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        expect({ ...action }).toEqual({
          type: ENTITY_LOAD_ACTION,
          meta: EntityScopedLoaderActions.entityScopedLoadMeta(
            TEST_ENTITY_TYPE,
            TEST_ENTITY_ID,
            SCOPE
          ),
        });
      });
    });

    describe('EntityScopedFailAction', () => {
      it('should create an action', () => {
        const action = new EntityScopedLoaderActions.EntityScopedFailAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE,
          'error'
        );
        expect({ ...action }).toEqual({
          type: ENTITY_FAIL_ACTION,
          meta: EntityScopedLoaderActions.entityScopedFailMeta(
            TEST_ENTITY_TYPE,
            TEST_ENTITY_ID,
            SCOPE,
            'error'
          ),
        });
      });
    });

    describe('EntityScopedSuccessAction', () => {
      it('should create an action', () => {
        const payload = 'payload';
        const action = new EntityScopedLoaderActions.EntityScopedSuccessAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE,
          payload
        );
        expect({ ...action }).toEqual({
          type: ENTITY_SUCCESS_ACTION,
          meta: EntityScopedLoaderActions.entityScopedSuccessMeta(
            TEST_ENTITY_TYPE,
            TEST_ENTITY_ID,
            SCOPE
          ),
          payload,
        });
      });
    });

    describe('EntityScopedResetAction', () => {
      it('should create an action', () => {
        const action = new EntityScopedLoaderActions.EntityScopedResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        expect({ ...action }).toEqual({
          type: ENTITY_RESET_ACTION,
          meta: EntityScopedLoaderActions.entityScopedResetMeta(
            TEST_ENTITY_TYPE,
            TEST_ENTITY_ID,
            SCOPE
          ),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('entityScopedLoadMeta', () => {
      it('should create a meta', () => {
        const meta = EntityScopedLoaderActions.entityScopedLoadMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        expect(meta).toEqual({
          loader: {
            load: true,
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
          scope: SCOPE,
        });
      });
    });

    describe('entityScopedFailMeta', () => {
      it('should create a meta', () => {
        const meta = EntityScopedLoaderActions.entityScopedFailMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE,
          'error'
        );
        expect(meta).toEqual({
          loader: {
            error: 'error',
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
          scope: SCOPE,
        });
      });
    });

    describe('entityScopedSuccessMeta', () => {
      it('should create a meta', () => {
        const meta = EntityScopedLoaderActions.entityScopedSuccessMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        expect(meta).toEqual({
          loader: {
            success: true,
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
          scope: SCOPE,
        });
      });
    });

    describe('entityScopedResetMeta', () => {
      it('should create a meta', () => {
        const meta = EntityScopedLoaderActions.entityScopedResetMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          SCOPE
        );
        expect(meta).toEqual({
          loader: {},
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
          scope: SCOPE,
        });
      });
    });
  });
});
