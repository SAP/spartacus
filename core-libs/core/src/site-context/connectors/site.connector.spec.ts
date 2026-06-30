import { CountryType } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { SiteConnector } from './site.connector';

const mockLanguages = ['l', 'a', 'n', 'g'];
const mockCurrencies = ['c', 'u', 'r', 'r'];
const mockBaseSite = { uid: 'test-uid' };
const mockBaseSites = [{ uid: 'test-uid' }];

describe('SiteConnector', () => {
  let service: SiteConnector;
  let adapter: {
    loadCurrencies: ReturnType<typeof vi.fn>;
    loadLanguages: ReturnType<typeof vi.fn>;
    loadCountries: ReturnType<typeof vi.fn>;
    loadRegions: ReturnType<typeof vi.fn>;
    loadBaseSite: ReturnType<typeof vi.fn>;
    loadBaseSites: ReturnType<typeof vi.fn>;
    loadCities: ReturnType<typeof vi.fn>;
    loadDistricts: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      loadCurrencies: vi.fn().mockReturnValue(of(mockCurrencies)),
      loadLanguages: vi.fn().mockReturnValue(of(mockLanguages)),
      loadCountries: vi.fn().mockReturnValue(of([])),
      loadRegions: vi.fn().mockImplementation((countryCode: string) =>
        of(`loadRegions-${countryCode}`)
      ),
      loadBaseSite: vi.fn().mockReturnValue(of(mockBaseSite)),
      loadBaseSites: vi.fn().mockReturnValue(of(mockBaseSites)),
      loadCities: vi.fn().mockReturnValue(of([])),
      loadDistricts: vi.fn().mockReturnValue(of([])),
    };
    service = new SiteConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLanguages should call adapter', () => {
    let result: any;
    service.getLanguages().subscribe((res) => (result = res));
    expect(result).toBe(mockLanguages);
    expect(adapter.loadLanguages).toHaveBeenCalled();
  });

  it('getCurrencies should call adapter', () => {
    let result: any;
    service.getCurrencies().subscribe((res) => (result = res));
    expect(result).toBe(mockCurrencies);
    expect(adapter.loadCurrencies).toHaveBeenCalled();
  });

  it('getCountries should call adapter', () => {
    let result: any;
    service
      .getCountries(CountryType.SHIPPING)
      .subscribe((res) => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadCountries).toHaveBeenCalledWith(CountryType.SHIPPING);
  });

  it('getRegions should call adapter', () => {
    let result: any;
    service.getRegions('CA').subscribe((res) => (result = res));
    expect(result).toEqual('loadRegions-CA');
    expect(adapter.loadRegions).toHaveBeenCalledWith('CA');
  });

  it('getBaseSite should call adapter', () => {
    let result: any;
    service.getBaseSite('testSiteId').subscribe((res) => (result = res));
    expect(result).toBe(mockBaseSite);
    expect(adapter.loadBaseSite).toHaveBeenCalledWith('testSiteId');
  });

  it('getBaseSites should call adapter', () => {
    let result: any;
    service.getBaseSites().subscribe((res) => (result = res));
    expect(result).toBe(mockBaseSites);
    expect(adapter.loadBaseSites).toHaveBeenCalled();
  });
});
