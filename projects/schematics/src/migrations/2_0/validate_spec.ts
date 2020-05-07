import { validateAngularVersion } from './validate';

describe('validate migration', () => {
  describe('getComponentState', () => {
    it('should NOT throw the exception if the major version is 9 or greater', () => {
      expect(() => validateAngularVersion('~9.0.0')).not.toThrow();
    });
    it('should throw the exception if the major version is less than 9', () => {
      expect(() => validateAngularVersion('8.0.0')).toThrow();
    });
  });
});
