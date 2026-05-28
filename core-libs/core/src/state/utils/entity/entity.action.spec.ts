import {
  ENTITY_REMOVE_ACTION,
  ENTITY_REMOVE_ALL_ACTION,
  entityMeta,
  EntityRemoveAction,
  EntityRemoveAllAction,
  entityRemoveAllMeta,
  entityRemoveMeta,
} from './entity.action';

describe('Entity Actions', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testId';

  describe('Action creators', () => {
    describe('EntityRemoveAction', () => {
      it('should create an action', () => {
        const action = new EntityRemoveAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect({ ...action }).toEqual({
          type: ENTITY_REMOVE_ACTION,
          meta: entityRemoveMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('EntityRemoveAllAction', () => {
      it('should create an action', () => {
        const action = new EntityRemoveAllAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: ENTITY_REMOVE_ALL_ACTION,
          meta: entityRemoveAllMeta(TEST_ENTITY_TYPE),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('entityMeta', () => {
      it('should create a meta', () => {
        const meta = entityMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
        });
      });
    });

    describe('entityRemoveMeta', () => {
      it('should create a meta', () => {
        const meta = entityRemoveMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          entityId: TEST_ENTITY_ID,
          entityType: TEST_ENTITY_TYPE,
          entityRemove: true,
        });
      });
    });

    describe('entityRemoveAllMeta', () => {
      it('should create a meta', () => {
        const meta = entityRemoveAllMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityId: null,
          entityType: TEST_ENTITY_TYPE,
          entityRemove: true,
        });
      });
    });
  });
});
