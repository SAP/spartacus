import { StringTemplate } from './string-template';

describe('StringTemplate', () => {
  describe('No keys in String', () => {
    it('should return template string', () => {
      const url = '/xxx/xxx';
      const result = StringTemplate.resolve(url, { id: '123' });
      expect(result).toEqual(url);
    });
  });

  describe('No Values', () => {
    it('should return template string', () => {
      const url = '/xxx/xxx/${id}';
      const result = StringTemplate.resolve(url, {});
      expect(result).toEqual(url);
    });
  });

  describe('Matching keys in String and Values', () => {
    it('should return template string with value', () => {
      const url = '/xxx/xxx/${id}';
      const id = 123;
      const result = StringTemplate.resolve(url, { id });
      expect(result).toEqual(`/xxx/xxx/${id}`);
    });
  });

  describe('Wrong keys in String and Values', () => {
    it('should return template string with no value', () => {
      const url = '/xxx/xxx/${id}';
      const productId = 123;
      const result = StringTemplate.resolve(url, { productId });
      expect(result).toEqual(url);
    });

    it('should return template string when the case is wrong', () => {
      const url = '/xxx/xxx/${PrOdUctiD}';
      const productId = 123;
      const result = StringTemplate.resolve(url, { productId });
      expect(result).toEqual(url);
    });
  });

  describe('Mutiple variables', () => {
    it('should return template string with values when variables are different', () => {
      const url = '/xxx/xxx/${id}/code/${code}';
      const id = 123;
      const code = 456;
      const result = StringTemplate.resolve(url, { id, code });
      expect(result).toEqual(`/xxx/xxx/${id}/code/${code}`);
    });

    it('should return template string with values when variables are the same', () => {
      const url = '/xxx/xxx/${id}/code/${id}';
      const id = 123;
      const result = StringTemplate.resolve(url, { id });
      expect(result).toEqual(`/xxx/xxx/${id}/code/${id}`);
    });
  });
});
