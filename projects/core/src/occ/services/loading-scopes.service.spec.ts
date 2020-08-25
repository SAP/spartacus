import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { LoadingScopesService } from './loading-scopes.service';

describe('LoadingScopesService', () => {
  let service: LoadingScopesService;
  const MAX_AGE = 60;

  const mockConfig: OccConfig = {
    backend: {
      loadingScopes: {
        product: {
          list: {
            include: ['base'],
          },
          detail: {
            include: ['list'],
          },
          order: {
            include: ['base', 'list'],
            maxAge: MAX_AGE,
          },
          zczapy: {
            include: ['order', 'detail', 'list'],
          },
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OccConfig, useValue: mockConfig }],
    });
    service = TestBed.inject(LoadingScopesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('expand', () => {
    it('should return scopes if there is no config', () => {
      const result = service.expand('test', ['test']);
      expect(result).toEqual(['test']);
    });

    it('should extend scopes', () => {
      const result = service.expand('product', ['list']);
      expect(result).toEqual(['base', 'list']);
    });

    it('should extend scopes multiple level deep', () => {
      const result = service.expand('product', ['detail']);
      expect(result).toEqual(['base', 'list', 'detail']);
    });

    it('should not duplicate scopes', () => {
      const result = service.expand('product', ['detail', 'order', 'base']);
      expect(result).toEqual(['detail', 'list', 'order', 'base']);
    });

    it('should keep proper order of included scopes', () => {
      const result = service.expand('product', ['order', 'list']);
      expect(result).toEqual(['order', 'base', 'list']);
    });

    it('should behave predictably for complex cases', () => {
      expect(service.expand('product', ['order', 'zczapy', 'detail'])).toEqual([
        'order',
        'zczapy',
        'base',
        'list',
        'detail',
      ]);

      expect(service.expand('product', ['order', 'zczapy'])).toEqual([
        'order',
        'detail',
        'base',
        'list',
        'zczapy',
      ]);

      expect(service.expand('product', ['zczapy'])).toEqual([
        'order',
        'detail',
        'base',
        'list',
        'zczapy',
      ]);

      expect(service.expand('product', ['zczapy', 'order'])).toEqual([
        'detail',
        'zczapy',
        'base',
        'list',
        'order',
      ]);
    });
  });

  describe('getMaxAge', () => {
    it('should return maxAge in milliseconds', () => {
      const MAXIMUM_AGE = 60000;
      const result = service.getMaxAge('product', 'order');
      expect(result).toEqual(MAXIMUM_AGE);
    });
    it('should return 0 for not configured maxAge', () => {
      const result = service.getMaxAge('product', 'detail');
      expect(result).toEqual(0);
    });
  });
});
