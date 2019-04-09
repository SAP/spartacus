import { TestBed } from '@angular/core/testing';

import { CmsComponentConnector } from './cms-component.connector';
import { CmsComponentAdapter } from './cms-component.adapter';
import {
  CmsStructureConfig,
  NormalizersService,
  PageContext,
  PageType,
} from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import createSpy = jasmine.createSpy;
import {
  CMS_COMPONENT_LIST_NORMALIZER,
  CMS_COMPONENT_NORMALIZER,
} from './cms-component.normalizer';
import { IdList } from '../../model/idList.model';

class MockCmsComponentAdapter implements CmsComponentAdapter<any, any> {
  load = createSpy('CmsComponentAdapter.load').and.callFake(id =>
    of('component' + id)
  );

  loadList = createSpy('CmsComponentAdapter.loadList').and.callFake(idList =>
    of('component' + idList)
  );
}

class MockNormalizerService {
  pipeable = createSpy().and.returnValue(x => x);
}

const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

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

describe('CmsComponentConnector', () => {
  let service: CmsComponentConnector;
  let adapter: CmsComponentAdapter<any, any>;
  let normalizers: NormalizersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsComponentAdapter, useClass: MockCmsComponentAdapter },
        { provide: NormalizersService, useClass: MockNormalizerService },
        {
          provide: CmsStructureConfig,
          useValue: CmsStructureConfigMock,
        },
      ],
    });

    service = TestBed.get(CmsComponentConnector);
    adapter = TestBed.get(CmsComponentAdapter);
    normalizers = TestBed.get(NormalizersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', () => {
      let result;
      service.get('333', context).subscribe(res => (result = res));
      expect(result).toBe('component333');
      expect(adapter.load).toHaveBeenCalledWith('333', context);
    });

    it('should use normalizer', () => {
      service.get('333', context).subscribe();
      expect(normalizers.pipeable).toHaveBeenCalledWith(
        CMS_COMPONENT_NORMALIZER
      );
    });
  });

  describe('getList', () => {
    it('should call adapter', () => {
      service.getList(ids, context).subscribe();
      expect(adapter.loadList).toHaveBeenCalledWith(
        ids,
        context,
        undefined,
        undefined,
        undefined,
        undefined
      );
    });

    it('should use normalizer', () => {
      service.getList(ids, context).subscribe();
      expect(normalizers.pipeable).toHaveBeenCalledWith(
        CMS_COMPONENT_LIST_NORMALIZER
      );
    });
  });
});
