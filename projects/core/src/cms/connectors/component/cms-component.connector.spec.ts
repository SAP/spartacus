import { TestBed } from '@angular/core/testing';
import { CmsStructureConfigService, PageContext } from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { PageType } from '../../../model/cms.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsComponentConnector } from './cms-component.connector';
import createSpy = jasmine.createSpy;

class MockCmsComponentAdapter implements CmsComponentAdapter {
  load = createSpy('CmsComponentAdapter.load').and.callFake(id =>
    of('component' + id)
  );

  findComponentsByIds = createSpy(
    'CmsComponentAdapter.findComponentsByIds'
  ).and.callFake(idList => of(idList.map(id => 'component' + id)));

  findComponentsByIdsLegacy = createSpy(
    'CmsComponentAdapter.findComponentsByIdsLegacy'
  ).and.callFake(idList => of(idList.map(id => 'component' + id)));
}

const ids = ['comp_uid1', 'comp_uid2'];
const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

class MockCmsStructureConfigService {
  getComponentFromConfig = createSpy().and.returnValue(of(undefined));
  getComponentsFromConfig = createSpy().and.returnValue(
    of([undefined, undefined, 'config-component'])
  );
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      legacy: false,
    },
  },
  site: {
    baseSite: '',
  },
};

describe('CmsComponentConnector for 1905+ backend', () => {
  let service: CmsComponentConnector;
  let adapter: CmsComponentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsComponentAdapter, useClass: MockCmsComponentAdapter },
        {
          provide: CmsStructureConfigService,
          useClass: MockCmsStructureConfigService,
        },
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(CmsComponentConnector);
    adapter = TestBed.get(CmsComponentAdapter);
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

    it('should use CmsStructureConfigService', () => {
      const structureConfigService = TestBed.get(CmsStructureConfigService);
      service.get('333', context).subscribe();
      expect(
        structureConfigService.getComponentFromConfig
      ).toHaveBeenCalledWith('333');
    });
  });

  describe('getList using GET request', () => {
    it('should call adapter', () => {
      service.getList(ids, context).subscribe();
      expect(adapter.findComponentsByIds).toHaveBeenCalledWith(ids, context);
    });
    it('should use CmsStructureConfigService', () => {
      const structureConfigService = TestBed.get(CmsStructureConfigService);
      service.getList(ids, context).subscribe();
      expect(
        structureConfigService.getComponentsFromConfig
      ).toHaveBeenCalledWith(ids);
    });
    it('should merge config data with components', () => {
      let components;
      service.getList(ids, context).subscribe(res => (components = res));
      expect(components).toEqual([
        'config-component',
        'componentcomp_uid1',
        'componentcomp_uid2',
      ]);
    });
  });
});

describe('CmsComponentConnector for 1811 backend', () => {
  let service: CmsComponentConnector;
  let adapter: CmsComponentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsComponentAdapter, useClass: MockCmsComponentAdapter },
        {
          provide: CmsStructureConfigService,
          useClass: MockCmsStructureConfigService,
        },
        {
          provide: OccConfig,
          useValue: {
            backend: {
              occ: {
                legacy: true,
              },
            },
          },
        },
      ],
    });

    service = TestBed.get(CmsComponentConnector);
    adapter = TestBed.get(CmsComponentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList using POST request', () => {
    it('should call adapter', () => {
      service.getList(ids, context).subscribe();
      expect(adapter.findComponentsByIdsLegacy).toHaveBeenCalledWith(
        ids,
        context
      );
    });
    it('should use CmsStructureConfigService', () => {
      const structureConfigService = TestBed.get(CmsStructureConfigService);
      service.getList(ids, context).subscribe();
      expect(
        structureConfigService.getComponentsFromConfig
      ).toHaveBeenCalledWith(ids);
    });
    it('should merge config data with components', () => {
      let components;
      service.getList(ids, context).subscribe(res => (components = res));
      expect(components).toEqual([
        'config-component',
        'componentcomp_uid1',
        'componentcomp_uid2',
      ]);
    });
  });

  // function subscribeGetList() {
  //   service.getList(ids, context).subscribe();
  // }

  // function cmsStructureConfigService(id, pageContext) {
  //   const structureConfigService = TestBed.get(CmsStructureConfigService);
  //   service.getList(id, pageContext).subscribe();
  //   expect(structureConfigService.getComponentsFromConfig).toHaveBeenCalledWith(
  //     id
  //   );
  // }

  // function mergeConfigData() {
  //   let components;
  //   service.getList(ids, context).subscribe(res => (components = res));
  //   expect(components).toEqual([
  //     'config-component',
  //     'componentcomp_uid1',
  //     'componentcomp_uid2',
  //   ]);
  // }
});
