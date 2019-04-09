import { TestBed } from '@angular/core/testing';

import { CmsPageConnector } from './cms-page.connector';
import { CmsPageAdapter } from './cms-page.adapter';
import {
  CmsStructureConfig,
  NormalizersService,
  PageContext,
  PageType,
} from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { CMS_PAGE_NORMALIZER } from './cms-page.normalizer';
import createSpy = jasmine.createSpy;

class MockCmsPageAdapter implements CmsPageAdapter<any> {
  load = createSpy('CmsComponentAdapter.load').and.callFake(({ id }) =>
    of('page' + id)
  );
}

class MockNormalizerService {
  pipeable = createSpy().and.returnValue(x => x);
}

const CmsStructureConfigMock: CmsStructureConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
    language: '',
    currency: '',
  },
  cmsStructure: {
    pages: [],
    slots: {},
  },
};

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

describe('CmsPageConnector', () => {
  let service: CmsPageConnector;
  let adapter: CmsPageAdapter<any>;
  let normalizers: NormalizersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsPageAdapter, useClass: MockCmsPageAdapter },
        { provide: NormalizersService, useClass: MockNormalizerService },
        {
          provide: CmsStructureConfig,
          useValue: CmsStructureConfigMock,
        },
      ],
    });

    service = TestBed.get(CmsPageConnector);
    adapter = TestBed.get(CmsPageAdapter);
    normalizers = TestBed.get(NormalizersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', () => {
      let result;
      service.get(context).subscribe(res => (result = res));
      expect(result).toBe('page123');
      expect(adapter.load).toHaveBeenCalledWith(context);
    });

    it('should use normalizer', () => {
      service.get(context).subscribe();
      expect(normalizers.pipeable).toHaveBeenCalledWith(CMS_PAGE_NORMALIZER);
    });
  });
});
