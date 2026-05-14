import { TestBed } from '@angular/core/testing';
import { PageContext } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsStructureConfigService } from '../../../cms/services/cms-structure-config.service';
import { PageType } from '../../../model/cms.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { CmsConfig } from '../../config/cms-config';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsComponentConnector } from './cms-component.connector';
import createSpy = jasmine.createSpy;

class MockCmsComponentAdapter implements CmsComponentAdapter {
  load = createSpy('CmsComponentAdapter.load').and.callFake((id) =>
    of('component' + id)
  );

  findComponentsByIds = createSpy(
    'CmsComponentAdapter.findComponentsByIds'
  ).and.callFake((idList) => of(idList.map((id) => 'component' + id)));
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

const MockCmsModuleConfig: CmsConfig = {
  componentsLoading: {
    pageSize: 2,
  },
};

describe('CmsComponentConnector', () => {
  let service: CmsComponentConnector;
  let adapter: CmsComponentAdapter;
  let structureConfigService: CmsStructureConfigService;

  describe('CmsComponentConnector for 1905+ backend', () => {
    beforeEach(() => {
      configureTestingModule();

      testBedConnector();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('get', () => {
      it('should call adapter', () => {
        let result;
        service.get('333', context).subscribe((res) => (result = res));
        expect(result).toBe('component333');
        expect(adapter.load).toHaveBeenCalledWith('333', context);
      });

      it('should use CmsStructureConfigService', () => {
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
        service.getList(ids, context).subscribe();
        cmsStructureConfigService();
      });

      it('should merge config data with components', () => {
        let components;
        service.getList(ids, context).subscribe((res) => (components = res));
        expect(components).toEqual([
          'config-component',
          'componentcomp_uid1',
          'componentcomp_uid2',
        ]);
      });
    });
  });

  describe('CmsComponentConnector for 1811 backend', () => {
    beforeEach(() => {
      configureTestingModule().overrideProvider(OccConfig, {
        useValue: {
          backend: {
            occ: {
              legacy: true,
            },
          },
        },
      });

      testBedConnector();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  function configureTestingModule(): TestBed {
    return TestBed.configureTestingModule({
      providers: [
        { provide: CmsComponentAdapter, useClass: MockCmsComponentAdapter },
        {
          provide: CmsStructureConfigService,
          useClass: MockCmsStructureConfigService,
        },
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
      ],
    });
  }

  function testBedConnector() {
    service = TestBed.inject(CmsComponentConnector);
    adapter = TestBed.inject(CmsComponentAdapter);
    structureConfigService = TestBed.inject(CmsStructureConfigService);
  }

  function cmsStructureConfigService() {
    expect(structureConfigService.getComponentsFromConfig).toHaveBeenCalledWith(
      ids
    );
  }
});
