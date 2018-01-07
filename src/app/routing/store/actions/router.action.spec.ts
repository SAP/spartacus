import * as fromRouter from "./router.action";

fdescribe("Router Actions", () => {
  describe("Go Action", () => {
    it("should create an action", () => {
      const payload = {
        path: ["test"]
      };
      const action = new fromRouter.Go(payload);
      expect({ ...action }).toEqual({
        type: fromRouter.GO,
        payload: payload
      });
    });
  });

  describe("Back Action", () => {
    it("should create an action", () => {
      const action = new fromRouter.Back();
      expect({ ...action }).toEqual({
        type: fromRouter.BACK
      });
    });
  });

  describe("Forward Action", () => {
    it("should create an action", () => {
      const action = new fromRouter.Forward();
      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD
      });
    });
  });
});
