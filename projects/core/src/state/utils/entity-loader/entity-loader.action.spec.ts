import {
  ENTITY_FAIL_ACTION,
  ENTITY_LOAD_ACTION,
  ENTITY_SUCCESS_ACTION,
  EntityFailAction,
  entityFailMeta,
  EntityLoadAction,
  entityLoadMeta,
  EntitySuccessAction,
  entitySuccessMeta
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
          meta: entityLoadMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID)
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
          meta: entityFailMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID, 'error')
        });
      });
    });

    describe('LoaderSuccessAction', () => {
      it('should create an action', () => {
        const action = new EntitySuccessAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_SUCCESS_ACTION,
          meta: entitySuccessMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID)
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
            type: TEST_ENTITY_TYPE,
            load: true
          },
          entityId: TEST_ENTITY_ID
        });
      });
    });

    describe('failMeta', () => {
      it('should create a meta', () => {
        const meta = entityFailMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID, 'error');
        expect(meta).toEqual({
          loader: {
            type: TEST_ENTITY_TYPE,
            error: 'error'
          },
          entityId: TEST_ENTITY_ID
        });
      });
    });

    describe('successMeta', () => {
      it('should create a meta', () => {
        const meta = entitySuccessMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          loader: {
            type: TEST_ENTITY_TYPE
          },
          entityId: TEST_ENTITY_ID
        });
      });
    });
  });
});
