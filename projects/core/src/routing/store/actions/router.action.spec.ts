import * as fromRouter from './router.action';

describe('Router Actions', () => {
  describe('Go Action', () => {
    it('should create an action', () => {
      const payload: { path: string[] } = {
        path: ['test']
      };
      const action = new fromRouter.Go(payload);
      expect({ ...action }).toEqual({
        type: fromRouter.GO,
        payload: payload
      });
    });
  });

  describe('Back Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.Back();
      expect({ ...action }).toEqual({
        type: fromRouter.BACK
      });
    });
  });

  describe('Forward Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.Forward();
      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD
      });
    });
  });

  describe('SaveRedirectUrl Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.SaveRedirectUrl('/test');
      expect({ ...action }).toEqual({
        type: fromRouter.SAVE_REDIRECT_URL,
        payload: '/test'
      });
    });
  });

  describe('ClearRedirectAction Action', () => {
    it('should create an action', () => {
      const action = new fromRouter.ClearRedirectUrl();
      expect({ ...action }).toEqual({
        type: fromRouter.CLEAR_REDIRECT_URL
      });
    });
  });
});
