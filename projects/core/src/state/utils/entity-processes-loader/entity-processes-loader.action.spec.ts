import {
  processesDecrementMeta,
  processesIncrementMeta,
  processesLoaderResetMeta,
} from '../processes-loader/processes-loader.action';
import {
  EntityProcessesDecrementAction,
  entityProcessesDecrementMeta,
  EntityProcessesIncrementAction,
  entityProcessesIncrementMeta,
  EntityProcessesLoaderResetAction,
  entityProcessesLoaderResetMeta,
  ENTITY_PROCESSES_DECREMENT_ACTION,
  ENTITY_PROCESSES_INCREMENT_ACTION,
  ENTITY_PROCESSES_LOADER_RESET_ACTION,
} from './entity-processes-loader.action';

describe('EntityProcessesLoader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';
  const TEST_ENTITY_ID = 'testId';

  describe('Action creators', () => {
    describe('EntityProcessesIncrementAction', () => {
      it('should create an action', () => {
        const action = new EntityProcessesIncrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_PROCESSES_INCREMENT_ACTION,
          meta: entityProcessesIncrementMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('EntityProcessesDecrementAction', () => {
      it('should create an action', () => {
        const action = new EntityProcessesDecrementAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_PROCESSES_DECREMENT_ACTION,
          meta: entityProcessesDecrementMeta(TEST_ENTITY_TYPE, TEST_ENTITY_ID),
        });
      });
    });

    describe('EntityProcessesResetAction', () => {
      it('should create an action', () => {
        const action = new EntityProcessesLoaderResetAction(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect({ ...action }).toEqual({
          type: ENTITY_PROCESSES_LOADER_RESET_ACTION,
          meta: entityProcessesLoaderResetMeta(
            TEST_ENTITY_TYPE,
            TEST_ENTITY_ID
          ),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('entityProcessesIncrementMeta', () => {
      it('should create a meta', () => {
        const meta = entityProcessesIncrementMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect(meta).toEqual({
          ...processesIncrementMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });

    describe('entityProcessesDecrementMeta', () => {
      it('should create a meta', () => {
        const meta = entityProcessesDecrementMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect(meta).toEqual({
          ...processesDecrementMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });

    describe('entityProcessesResetMeta', () => {
      it('should create a meta', () => {
        const meta = entityProcessesLoaderResetMeta(
          TEST_ENTITY_TYPE,
          TEST_ENTITY_ID
        );
        expect(meta).toEqual({
          ...processesLoaderResetMeta(TEST_ENTITY_TYPE),
          entityId: TEST_ENTITY_ID,
        });
      });
    });
  });
});
