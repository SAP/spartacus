import { AnimationSliderService } from "./animation-slider.service";


describe('animation slider service', () => {
  describe('clampToRange', () => {
    it('returns original value if in range', () => {
      expect(AnimationSliderService.clampToRange(40, 0, 100)).toEqual(40);
    });

    it('returns floor if value is below floor', () => {
      expect(AnimationSliderService.clampToRange(-10, 0, 100)).toEqual(0);
    });

    it('returns ceil if value is above ceil', () => {
      expect(AnimationSliderService.clampToRange(110, 0, 100)).toEqual(100);
    });
  });
});
