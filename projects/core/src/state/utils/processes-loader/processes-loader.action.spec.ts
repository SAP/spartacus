import {
  ProcessesDecrementAction,
  processesDecrementMeta,
  ProcessesIncrementAction,
  processesIncrementMeta,
  ProcessesLoaderResetAction,
  processesLoaderResetMeta,
  PROCESSES_DECREMENT_ACTION,
  PROCESSES_INCREMENT_ACTION,
  PROCESSES_LOADER_RESET_ACTION,
} from './processes-loader.action';

describe('Processes Loader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('Action creators', () => {
    describe('ProcessesIncrementAction', () => {
      it('should create an action', () => {
        const action = new ProcessesIncrementAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_INCREMENT_ACTION,
          meta: processesIncrementMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesDecrementAction', () => {
      it('should create an action', () => {
        const action = new ProcessesDecrementAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_DECREMENT_ACTION,
          meta: processesDecrementMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesLoaderResetAction', () => {
      it('should create an action', () => {
        const action = new ProcessesLoaderResetAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_LOADER_RESET_ACTION,
          meta: processesLoaderResetMeta(TEST_ENTITY_TYPE),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('processesIncrementMeta', () => {
      it('should create a meta', () => {
        const meta = processesIncrementMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: undefined,
          processesCountDiff: 1,
        });
      });
    });

    describe('processesDecrementMeta', () => {
      it('should create a meta', () => {
        const meta = processesDecrementMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: undefined,
          processesCountDiff: -1,
        });
      });
    });

    describe('processesLoaderResetMeta', () => {
      it('should create a meta', () => {
        const meta = processesLoaderResetMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {},
          processesCountDiff: null,
        });
      });
    });
  });
});
