import { CmsStructureConfigService, PageContext } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PageType } from '../../../model/cms.model';
import { CmsPageConnector } from './cms-page.connector';

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

describe('CmsPageConnector', () => {
  let service: CmsPageConnector;
  let adapter: { load: ReturnType<typeof vi.fn> };
  let structureConfigService: {
    mergePageStructure: ReturnType<typeof vi.fn>;
    shouldIgnoreBackend: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      load: vi.fn().mockImplementation(({ id }) => of('page' + id)),
    };
    structureConfigService = {
      mergePageStructure: vi.fn().mockImplementation((id) => of(id)),
      shouldIgnoreBackend: vi.fn().mockReturnValue(of(false)),
    };
    service = new CmsPageConnector(
      adapter as any,
      structureConfigService as any
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', () => {
      let result: any;
      service.get(context).subscribe((res) => (result = res));
      expect(result).toBe('123');
      expect(adapter.load).toHaveBeenCalledWith(context);
    });

    it('should use CmsStructureConfigService', () => {
      service.get(context).subscribe();
      expect(structureConfigService.shouldIgnoreBackend).toHaveBeenCalledWith(
        context.id
      );
      expect(structureConfigService.mergePageStructure).toHaveBeenCalledWith(
        context.id,
        'page123' as any
      );
    });
  });
});
