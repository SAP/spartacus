import {
  popMeta,
  ProcessesLoaderPopAction,
  ProcessesLoaderPushAction,
  ProcessesLoaderResetAction,
  processesResetMeta,
  PROCESSES_LOADER_POP_ACTION,
  PROCESSES_LOADER_PUSH_ACTION,
  PROCESSES_LOADER_RESET_ACTION,
  pushMeta,
} from './processes-loader.action';

describe('Processes Loader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('Action creators', () => {
    describe('ProcessesLoaderPushAction', () => {
      it('should create an action', () => {
        const action = new ProcessesLoaderPushAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_LOADER_PUSH_ACTION,
          meta: pushMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesLoaderPopAction', () => {
      it('should create an action', () => {
        const action = new ProcessesLoaderPopAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_LOADER_POP_ACTION,
          meta: popMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesLoaderResetAction', () => {
      it('should create an action', () => {
        const action = new ProcessesLoaderResetAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_LOADER_RESET_ACTION,
          meta: processesResetMeta(TEST_ENTITY_TYPE),
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
          processesCountDiff: 1,
        });
      });
    });

    describe('popMeta', () => {
      it('should create a meta', () => {
        const meta = popMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: undefined,
          processesCountDiff: -1,
        });
      });
    });

    describe('processesResetMeta', () => {
      it('should create a meta', () => {
        const meta = processesResetMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {},
          processesCountDiff: null,
        });
      });
    });
  });
});
