import {
  failMeta,
  LOADER_FAIL_ACTION,
  LOADER_LOAD_ACTION,
  LOADER_RESET_ACTION,
  LOADER_SUCCESS_ACTION,
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
  loadMeta,
  resetMeta,
  successMeta,
} from './loader.action';

describe('Loader Actions', () => {
  const TEST_ENTITY_TYPE = 'test';

  describe('Action creators', () => {
    describe('LoaderLoadAction', () => {
      it('should create an action', () => {
        const action = new LoaderLoadAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: LOADER_LOAD_ACTION,
          meta: loadMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('LoaderFailAction', () => {
      it('should create an action', () => {
        const action = new LoaderFailAction(TEST_ENTITY_TYPE, 'error');
        expect({ ...action }).toEqual({
          type: LOADER_FAIL_ACTION,
          meta: failMeta(TEST_ENTITY_TYPE, 'error'),
        });
      });
    });

    describe('LoaderSuccessAction', () => {
      it('should create an action', () => {
        const action = new LoaderSuccessAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: LOADER_SUCCESS_ACTION,
          meta: successMeta(TEST_ENTITY_TYPE),
        });
      });
    });

    describe('LoaderResetAction', () => {
      it('should create an action', () => {
        const action = new LoaderResetAction(TEST_ENTITY_TYPE);
        expect({ ...action }).toEqual({
          type: LOADER_RESET_ACTION,
          meta: resetMeta(TEST_ENTITY_TYPE),
        });
      });
    });
  });

  describe('meta creators', () => {
    describe('loadMeta', () => {
      it('should create a meta', () => {
        const meta = loadMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {
            load: true,
          },
        });
      });
    });

    describe('failMeta', () => {
      it('should create a meta', () => {
        const meta = failMeta(TEST_ENTITY_TYPE, 'error');
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {
            error: 'error',
          },
        });
      });
    });

    describe('successMeta', () => {
      it('should create a meta', () => {
        const meta = successMeta(TEST_ENTITY_TYPE);
        expect(meta).toEqual({
          entityType: TEST_ENTITY_TYPE,
          loader: {
            success: true,
          },
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
