/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { RouteParamsEnumeratorContext } from '../model/route-params-enumerator';
import { CatalogsFetchService } from '../services/catalogs-fetch.service';
import { CategoryRouteParamsEnumerator } from './category-route-params-enumerator';

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
                subcategories: [
                  {
                    id: '816',
                    name: 'Power Supplies',
                    url: '/Open-Catalogue/Components/Power-Supplies/c/816',
                    subcategories: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'brands',
            name: 'Brands',
            url: '/Brands/c/brands',
            subcategories: [
              { id: 'brand_1', name: 'HP', url: '/Brands/HP/c/brand_1' },
            ],
          },
          {
            id: 'configurations',
            url: '//c/configurations',
            subcategories: [
              { id: 'engraving', url: '///c/engraving', subcategories: [] },
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

describe('CategoryRouteParamsEnumerator', () => {
  let enumerator: CategoryRouteParamsEnumerator;

  const context: RouteParamsEnumeratorContext = {
    baseSiteId: 'electronics-spa',
    language: 'en',
    currency: 'USD',
    occBaseUrl: 'http://localhost:9002',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryRouteParamsEnumerator,
        {
          provide: CatalogsFetchService,
          useClass: MockCatalogsFetchService,
        },
      ],
    });

    enumerator = TestBed.inject(CategoryRouteParamsEnumerator);
  });

  it('should have cxRoute set to "category"', () => {
    expect(enumerator.cxRoute).toBe('category');
  });

  it('should be language-dependent', () => {
    expect(enumerator.languageDependent).toBe(true);
  });

  it('should enumerate category params excluding brands', async () => {
    const result = await enumerator.enumerate(context);

    expect(result.params).toEqual([
      { code: '1' },
      { code: '106' },
      { code: '816' },
    ]);
  });

  it('should filter out categories with invalid URLs (slash-only paths)', async () => {
    const result = await enumerator.enumerate(context);

    const ids = result.params.map((p) => p['code']);
    expect(ids).not.toContain('configurations');
    expect(ids).not.toContain('engraving');
  });

  it('should not include brand categories', async () => {
    const result = await enumerator.enumerate(context);

    const ids = result.params.map((p) => p['code']);
    expect(ids).not.toContain('brands');
    expect(ids).not.toContain('brand_1');
  });

  it('should pass language to CatalogsFetchService', async () => {
    const fetchService = TestBed.inject(CatalogsFetchService);
    await enumerator.enumerate(context);
    expect(fetchService.getCatalogs).toHaveBeenCalledWith('en');
  });

  it('should return empty params when catalogs are empty', async () => {
    const fetchService = TestBed.inject(CatalogsFetchService);
    (fetchService.getCatalogs as jasmine.Spy).and.returnValue(
      Promise.resolve([])
    );

    const result = await enumerator.enumerate(context);
    expect(result.params).toEqual([]);
  });
});

