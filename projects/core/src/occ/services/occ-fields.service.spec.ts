import { OccFieldsModels, OccFieldsService } from './occ-fields.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('OccFieldsService', () => {
  let service: OccFieldsService;
  const models: OccFieldsModels[] = [
    {
      url: 'https://test/url?fields=ala',
      model: { scope: 'scope1', id: 'a' },
    },
    {
      url: 'https://test/url?fields=ma,kota',
      model: { scope: 'scope2', id: 'b' },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(OccFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('optimalLoad', () => {
    it('should return optimized scoped model data', async () => {
      const dataFactory = () => of({ ala: '1', ma: '2', kota: '3' }) as any;
      const result = service.optimalLoad(models, dataFactory);
      expect(result[0].id).toEqual(models[0].model.id);
      expect(result[0].scope).toEqual(models[0].model.scope);

      expect(await result[0].data$.toPromise()).toEqual({ ala: '1' });

      expect(result[1].id).toEqual(models[1].model.id);
      expect(result[1].scope).toEqual(models[1].model.scope);
      expect(await result[1].data$.toPromise()).toEqual({ ma: '2', kota: '3' });
    });
  });

  describe('getMergedUrls', () => {
    it('should nor merge same ULRs with different fields parameters', () => {
      expect(service.getMergedUrls(models)).toEqual({
        'https://test/url?fields=ala,ma,kota': {
          scope1: {
            fields: { ala: {} },
            model: { scope: 'scope1', id: 'a' },
            url: 'https://test/url?fields=ala',
          },
          scope2: {
            fields: {
              ma: {},
              kota: {},
            },
            model: {
              scope: 'scope2',
              id: 'b',
            },
            url: 'https://test/url?fields=ma,kota',
          },
        },
      });
    });

    it('should nor merge distinct ULRs', () => {
      const distinctModels: OccFieldsModels[] = [
        {
          url: 'https://test/url?fields=ala&c=a',
          model: { scope: 'scope1', id: 'a' },
        },
        {
          url: 'https://test/url?fields=ma,kota',
          model: { scope: 'scope2', id: 'b' },
        },
      ];
      expect(service.getMergedUrls(distinctModels)).toEqual({
        'https://test/url?c=a&fields=ala': {
          scope1: {
            fields: { ala: {} },
            model: { scope: 'scope1', id: 'a' },
            url: 'https://test/url?fields=ala&c=a',
          },
        },
        'https://test/url?fields=ma,kota': {
          scope2: {
            fields: {
              ma: {},
              kota: {},
            },
            model: {
              scope: 'scope2',
              id: 'b',
            },
            url: 'https://test/url?fields=ma,kota',
          },
        },
      });
    });
  });
});
