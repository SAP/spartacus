import {
  ENTITY_FAIL_ACTION,
  ENTITY_LOAD_ACTION,
  ENTITY_RESET_ACTION,
  ENTITY_SUCCESS_ACTION,
  EntityFailAction,
  entityFailMeta,
  EntityLoadAction,
  entityLoadMeta,
  EntityLoaderResetAction,
  entityResetMeta,
  EntitySuccessAction,
  entitySuccessMeta,
} from './entity-loader.action';

describe('EntityLoader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testId';

  describe('Action creators', () => {
    describe('LoaderLoadAction', () => {
      it('should create an action', () => {
        const action = new EntityLoadAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect({ ...action }).toEqual({
          type: ENTITY_LOAD_ACTION,
          meta: entityLoadMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('LoaderFailAction', () => {
      it('should create an action', () => {
        const action = new EntityFailAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          'error'
        );
        expect({ ...action }).toEqual({
          type: ENTITY_FAIL_ACTION,
          meta: entityFailMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID, 'error'),
        });
      });
    });

    describe('LoaderSuccessAction', () => {
      it('should create an action', () => {
        const payload = 'payload';
        const action = new EntitySuccessAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID,
          payload
        );
        expect({ ...action }).toEqual({
          type: ENTITY_SUCCESS_ACTION,
          meta: entitySuccessMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
          payload,
        });
      });
    });

    describe('LoaderResetAction', () => {
      it('should create an action', () => {
        const action = new EntityLoaderResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_RESET_ACTION,
          meta: entityResetMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('loadMeta', () => {
      it('should create a meta', () => {
        const meta = entityLoadMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          loader: {
            load: true,
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
        });
      });
    });

    describe('failMeta', () => {
      it('should create a meta', () => {
        const meta = entityFailMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID, 'error');
        expect(meta).toEqual({
          loader: {
            error: 'error',
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
        });
      });
    });

    describe('successMeta', () => {
      it('should create a meta', () => {
        const meta = entitySuccessMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          loader: {
            success: true,
          },
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
        });
      });
    });

    describe('resetMeta', () => {
      it('should create a meta', () => {
        const meta = entityResetMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          loader: {},
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
        });
      });
    });
  });
});
