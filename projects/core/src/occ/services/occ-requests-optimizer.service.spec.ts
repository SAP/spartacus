import { TestBed } from '@angular/core/testing';
import { OccRequestsOptimizerService } from './occ-requests-optimizer.service';
import { ScopedDataWithUrl } from './occ-fields.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('OccRequestsOptimizerService', () => {
  let service: OccRequestsOptimizerService;
  const models: ScopedDataWithUrl[] = [
    {
      url: 'https://test/url?fields=ala',
      scopedData: { scope: 'scope1' },
    },
    {
      url: 'https://test/url?fields=ma,kota',
      scopedData: { scope: 'scope2' },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OccRequestsOptimizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scopedDataLoad', () => {
    it('should return optimized scoped model data', async () => {
      const dataFactory = () => of({ ala: '1', ma: '2', kota: '3' }) as any;
      const result = service.scopedDataLoad(models, dataFactory);
      expect(result[0].scope).toEqual(models[0].scopedData.scope);

      expect(await result[0].data$.toPromise()).toEqual({ ala: '1' });

      expect(result[1].scope).toEqual(models[1].scopedData.scope);
      expect(await result[1].data$.toPromise()).toEqual({ ma: '2', kota: '3' });
    });
  });
});
