import { TestBed } from '@angular/core/testing';
import { MockUrlPipe, URL_TESTING_ALLOWLISTED_PARAMS } from './mock-url.pipe';

describe('MockUrlPipe', () => {
  let pipe: MockUrlPipe;

  describe('when no params are whitelisted', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MockUrlPipe],
      });

      pipe = TestBed.inject(MockUrlPipe);
    });

    it('should transform simple string', () => {
      expect(pipe.transform('product')).toEqual('product');
    });

    it('should transform array with simple string', () => {
      expect(pipe.transform(['product'])).toEqual('product');
    });

    it('should transform cxRoute', () => {
      expect(pipe.transform({ cxRoute: 'product' })).toEqual('cxRoute:product');
    });

    it('should transform array with cxRoute', () => {
      expect(pipe.transform(['foo', { cxRoute: 'product' }, 'bar'])).toEqual(
        'foo cxRoute:product bar'
      );
    });

    it('should transform cxRoute with params sorted alphabetically by key', () => {
      expect(
        pipe.transform({
          cxRoute: 'product',
          params: { name: 'ABC', code: 123 },
        })
      ).toEqual('cxRoute:product code:123 name:ABC');
    });

    it('should transform array with cxRoute and params', () => {
      expect(
        pipe.transform([
          { cxRoute: 'product', params: { name: 'ABC', code: 123 } },
        ])
      ).toEqual('cxRoute:product code:123 name:ABC');
    });
  });

  describe('when some params are whitelisted', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          MockUrlPipe,
          {
            provide: URL_TESTING_ALLOWLISTED_PARAMS,
            useValue: ['code', 'name'],
          },
        ],
      });

      pipe = TestBed.inject(MockUrlPipe);
    });

    it('should transform cxRoute with params', () => {
      expect(
        pipe.transform({
          cxRoute: 'product',
          params: { name: 'ABC', code: 123 },
        })
      ).toEqual('cxRoute:product code:123 name:ABC');
    });

    it('should ignore params other than whitelisted', () => {
      expect(
        pipe.transform({
          cxRoute: 'product',
          params: { description: 'Super long description...', code: 123 },
        })
      ).toEqual('cxRoute:product code:123');
    });
  });
});
