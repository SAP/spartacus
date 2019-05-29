import * as fromRouter from './router.action';

describe('Router Actions', () => {
  describe('Go Action', () => {
    it('should create an action', () => {
      const payload: { path: string[] } = {
        path: ['test'],
      };
      const action = new fromRouter.Go(payload);
      expect({ ...action }).toEqual({
        type: fromRouter.GO,
        payload: payload,
      });
    });
  });

  describe('GoByUrl Action', () => {
    it('should create an action', () => {
      const payload = 'test';
      const action = new fromRouter.GoByUrl(payload);
      expect({ ...action }).toEqual({
        type: fromRouter.GO_BY_URL,
        payload: payload,
      });
    });
  });

  describe('Back Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.Back();
      expect({ ...action }).toEqual({
        type: fromRouter.BACK,
      });
    });
  });

  describe('Forward Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.Forward();
      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD,
      });
    });
  });
});
