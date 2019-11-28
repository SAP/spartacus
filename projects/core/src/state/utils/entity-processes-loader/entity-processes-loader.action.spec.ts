import {
  popMeta,
  processesResetMeta,
  pushMeta,
} from '../processes-loader/processes-loader.action';
import {
  EntityPopAction,
  entityPopMeta,
  EntityProcessesResetAction,
  entityProcessesResetMeta,
  EntityPushAction,
  entityPushMeta,
  ENTITY_POP_ACTION,
  ENTITY_PROCESSES_RESET_ACTION,
  ENTITY_PUSH_ACTION,
} from './entity-processes-loader.action';

describe('EntityProcessesLoader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testId';

  describe('Action creators', () => {
    describe('EntityPushAction', () => {
      it('should create an action', () => {
        const action = new EntityPushAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect({ ...action }).toEqual({
          type: ENTITY_PUSH_ACTION,
          meta: entityPushMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('EntityPopAction', () => {
      it('should create an action', () => {
        const action = new EntityPopAction(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect({ ...action }).toEqual({
          type: ENTITY_POP_ACTION,
          meta: entityPopMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('EntityProcessesResetAction', () => {
      it('should create an action', () => {
        const action = new EntityProcessesResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_PROCESSES_RESET_ACTION,
          meta: entityProcessesResetMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('entityPushMeta', () => {
      it('should create a meta', () => {
        const meta = entityPushMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          ...pushMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });

    describe('entityPopMeta', () => {
      it('should create a meta', () => {
        const meta = entityPopMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          ...popMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });

    describe('entityProcessesResetMeta', () => {
      it('should create a meta', () => {
        const meta = entityProcessesResetMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID);
        expect(meta).toEqual({
          ...processesResetMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });
  });
});
