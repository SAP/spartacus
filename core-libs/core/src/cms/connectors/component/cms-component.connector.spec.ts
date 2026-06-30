import { PageContext } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CmsStructureConfigService } from '../../../cms/services/cms-structure-config.service';
import { PageType } from '../../../model/cms.model';
import { OccConfig } from '../../../occ/config/occ-config';
import { CmsConfig } from '../../config/cms-config';
import { CmsComponentConnector } from './cms-component.connector';

const ids = ['comp_uid1', 'comp_uid2'];
const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

const MockCmsModuleConfig: CmsConfig = {
  componentsLoading: {
    pageSize: 2,
  },
};

describe('CmsComponentConnector', () => {
  let service: CmsComponentConnector;
  let adapter: {
    load: ReturnType<typeof vi.fn>;
    findComponentsByIds: ReturnType<typeof vi.fn>;
  };
  let structureConfigService: {
    getComponentFromConfig: ReturnType<typeof vi.fn>;
    getComponentsFromConfig: ReturnType<typeof vi.fn>;
  };

  function setup(config: CmsConfig = MockCmsModuleConfig) {
    adapter = {
      load: vi.fn().mockImplementation((id) => of('component' + id)),
      findComponentsByIds: vi.fn().mockImplementation((idList) =>
        of(idList.map((id: string) => 'component' + id))
      ),
    };
    structureConfigService = {
      getComponentFromConfig: vi.fn().mockReturnValue(of(undefined)),
      getComponentsFromConfig: vi.fn().mockReturnValue(
        of([undefined, undefined, 'config-component'])
      ),
    };
    service = new CmsComponentConnector(
      structureConfigService as any,
      adapter as any,
      config
    );
  }

  describe('CmsComponentConnector for 1905+ backend', () => {
    beforeEach(() => {
      setup();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('get', () => {
      it('should call adapter', () => {
        let result: any;
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
        expect(structureConfigService.getComponentsFromConfig).toHaveBeenCalledWith(
          ids
        );
      });

      it('should merge config data with components', () => {
        let components: any;
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
      setup({
        ...MockCmsModuleConfig,
        backend: {
          occ: {
            legacy: true,
          },
        },
      } as any);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
