import { TestBed } from '@angular/core/testing';
import { CmsComponentConnector } from './cms-component.connector';
import { CmsComponentAdapter } from './cms-component.adapter';
import { CmsStructureConfigService, PageContext } from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { PageType } from '../../../model/cms.model';
import createSpy = jasmine.createSpy;

class MockCmsComponentAdapter implements CmsComponentAdapter {
  load = createSpy('CmsComponentAdapter.load').and.callFake(id =>
    of('component' + id)
  );

  loadList = createSpy('CmsComponentAdapter.loadList').and.callFake(idList =>
    of(idList.map(id => 'component' + id))
  );
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

describe('CmsComponentConnector', () => {
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

  describe('getList', () => {
    it('should call adapter', () => {
      service.getList(ids, context).subscribe();
      expect(adapter.loadList).toHaveBeenCalledWith(ids, context);
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
