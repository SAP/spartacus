/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { RouteParamsEnumeratorContext } from '../model/route-params-enumerator';
import { CatalogsFetchService } from '../services/catalogs-fetch.service';
import { BrandRouteParamsEnumerator } from './brand-route-params-enumerator';

const mockCatalogs = [
  {
    id: 'electronicsProductCatalog',
    catalogVersions: [
      { id: 'Staged', categories: [] },
      {
        id: 'Online',
        categories: [
          {
            id: '1',
            name: 'Open Catalogue',
            url: '/Open-Catalogue/c/1',
            subcategories: [
              {
                id: '106',
                name: 'Components',
                url: '/Open-Catalogue/Components/c/106',
                subcategories: [],
              },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            url: '/Brands/c/brands',
            subcategories: [
              { id: 'brand_1', name: 'HP', url: '/Brands/HP/c/brand_1' },
              { id: 'brand_5', name: 'Sony', url: '/Brands/Sony/c/brand_5' },
              {
                id: 'brand_10',
                name: 'Canon',
                url: '/Brands/Canon/c/brand_10',
              },
            ],
          },
        ],
      },
    ],
  },
];

class MockCatalogsFetchService {
  getCatalogs = jasmine
    .createSpy('getCatalogs')
    .and.returnValue(Promise.resolve(mockCatalogs));
}

describe('BrandRouteParamsEnumerator', () => {
  let enumerator: BrandRouteParamsEnumerator;

  const context: RouteParamsEnumeratorContext = {
    baseSiteId: 'electronics-spa',
    language: 'en',
    currency: 'USD',
    occBaseUrl: 'http://localhost:9002',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrandRouteParamsEnumerator,
        {
          provide: CatalogsFetchService,
          useClass: MockCatalogsFetchService,
        },
      ],
    });

    enumerator = TestBed.inject(BrandRouteParamsEnumerator);
  });

  it('should have cxRoute set to "brand"', () => {
    expect(enumerator.cxRoute).toBe('brand');
  });

  it('should be language-dependent', () => {
    expect(enumerator.languageDependent).toBe(true);
  });

  it('should enumerate brand params from catalogs', async () => {
    const result = await enumerator.enumerate(context);

    expect(result.params).toEqual([
      { brandName: 'HP', brandCode: 'brand_1' },
      { brandName: 'Sony', brandCode: 'brand_5' },
      { brandName: 'Canon', brandCode: 'brand_10' },
    ]);
  });

  it('should not include non-brand categories', async () => {
    const result = await enumerator.enumerate(context);

    const codes = result.params.map((p) => p['brandCode']);
    expect(codes).not.toContain('1');
    expect(codes).not.toContain('106');
  });

  it('should pass language to CatalogsFetchService', async () => {
    const fetchService = TestBed.inject(CatalogsFetchService);
    await enumerator.enumerate(context);
    expect(fetchService.getCatalogs).toHaveBeenCalledWith('en');
  });

  it('should return empty params when no brands category exists', async () => {
    const fetchService = TestBed.inject(CatalogsFetchService);
    (fetchService.getCatalogs as jasmine.Spy).and.returnValue(
      Promise.resolve([
        {
          id: 'electronicsProductCatalog',
          catalogVersions: [
            {
              id: 'Online',
              categories: [
                { id: '1', name: 'Open Catalogue', subcategories: [] },
              ],
            },
          ],
        },
      ])
    );

    const result = await enumerator.enumerate(context);
    expect(result.params).toEqual([]);
  });
});

