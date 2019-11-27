import {
  popMeta,
  ProcessesPopAction,
  ProcessesPushAction,
  ProcessesResetAction,
  PROCESSES_POP_ACTION,
  PROCESSES_PUSH_ACTION,
  PROCESSES_RESET_ACTION,
  pushMeta,
  resetMeta,
} from './processes.action';

describe('Processes Actions', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('Action creators', () => {
    describe('ProcessesPushAction', () => {
      it('should create an action', () => {
        const action = new ProcessesPushAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_PUSH_ACTION,
          meta: pushMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesPopAction', () => {
      it('should create an action', () => {
        const action = new ProcessesPopAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_POP_ACTION,
          meta: popMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('ProcessesResetAction', () => {
      it('should create an action', () => {
        const action = new ProcessesResetAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: PROCESSES_RESET_ACTION,
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
