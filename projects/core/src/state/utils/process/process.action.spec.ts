import {
  popMeta,
  ProcessPopAction,
  ProcessPushAction,
  ProcessResetAction,
  PROCESS_POP_ACTION,
  PROCESS_PUSH_ACTION,
  PROCESS_RESET_ACTION,
  pushMeta,
  resetMeta,
} from './process.action';

describe('Process Actions', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('Action creators', () => {
    describe('ProcessPushAction', () => {
      it('should create an action', () => {
        const action = new ProcessPushAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESS_PUSH_ACTION,
          meta: pushMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessPopAction', () => {
      it('should create an action', () => {
        const action = new ProcessPopAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESS_POP_ACTION,
          meta: popMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessResetAction', () => {
      it('should create an action', () => {
        const action = new ProcessResetAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESS_RESET_ACTION,
          meta: resetMeta(TEST_ENTITY_TYPE),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('pushMeta', () => {
      it('should create a meta', () => {
        const meta = pushMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: undefined,
          processesCount: 1,
        });
      });
    });

    describe('popMeta', () => {
      it('should create a meta', () => {
        const meta = popMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: undefined,
          processesCount: -1,
        });
      });
    });

    describe('resetMeta', () => {
      it('should create a meta', () => {
        const meta = resetMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {},
        });
      });
    });
  });
});
