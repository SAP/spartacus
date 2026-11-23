import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CmsPageAdapter,
  CmsStructureConfigService,
  CmsStructureModel,
  PageContext,
} from '@spartacus/core';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { Mock } from 'vitest';
import { PageType } from '../../../model/cms.model';
import { CmsPageConnector } from './cms-page.connector';

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

@Injectable()
class MockCmsPageAdapter implements Partial<CmsPageAdapter> {
  load(pageContext: PageContext): Observable<CmsStructureModel> {
    return of({ page: { pageId: pageContext.id, type: pageContext.type } });
  }
}

@Injectable()
class MockCmsStructureConfigService
  implements Partial<CmsStructureConfigService>
{
  mergePageStructure(
    _pageId: string,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return of(pageStructure);
  }
  shouldIgnoreBackend(_pageId: string): Observable<boolean> {
    return of(false);
  }
}

describe('CmsPageConnector', () => {
  let service: CmsPageConnector;
  let cmsPageAdapter: CmsPageAdapter;
  let cmsStructureConfigService: CmsStructureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsStructureConfigService,
          useClass: MockCmsStructureConfigService,
        },
        {
          provide: CmsPageAdapter,
          useClass: MockCmsPageAdapter,
        },
      ],
    });

    cmsStructureConfigService = TestBed.inject(CmsStructureConfigService);
    vi.spyOn(cmsStructureConfigService, 'shouldIgnoreBackend');
    vi.spyOn(cmsStructureConfigService, 'mergePageStructure');

    cmsPageAdapter = TestBed.inject(CmsPageAdapter);
    vi.spyOn(cmsPageAdapter, 'load');

    service = TestBed.inject(CmsPageConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', async () => {
      let result = await firstValueFrom(service.get(context));

      expect(result).toEqual({
        page: {
          pageId: context.id,
          type: context.type,
        },
      });
      expect(cmsPageAdapter.load).toHaveBeenCalledWith(context);
    });

    it('should use CmsStructureConfigService', async () => {
      await firstValueFrom(service.get(context));

      expect(
        cmsStructureConfigService.shouldIgnoreBackend
      ).toHaveBeenCalledWith(context.id);
      expect(cmsStructureConfigService.mergePageStructure).toHaveBeenCalledWith(
        context.id,
        {
          page: {
            pageId: context.id,
            type: context.type,
          },
        }
      );
    });

    describe('when page adapter fails', () => {
      it('should continue on a 400 error', async () => {
        (cmsPageAdapter.load as Mock).mockReturnValue(
          throwError(
            () => new HttpErrorResponse({ status: HttpStatusCode.BadRequest })
          )
        );

        await firstValueFrom(service.get(context));

        expect(
          cmsStructureConfigService.mergePageStructure
        ).toHaveBeenCalledWith(context.id, {});
      });

      it('should error on other status codes', async () => {
        (cmsPageAdapter.load as Mock).mockReturnValue(
          throwError(
            () => new HttpErrorResponse({ status: HttpStatusCode.Unauthorized })
          )
        );

        await expect(firstValueFrom(service.get(context))).rejects.toThrow(
          HttpErrorResponse
        );
      });
    });

    describe('when configured to ignore backend', () => {
      it('should skip loading the page', async () => {
        vi.spyOn(
          cmsStructureConfigService,
          'shouldIgnoreBackend'
        ).mockReturnValue(of(true));

        await firstValueFrom(service.get(context));

        expect(cmsPageAdapter.load).not.toHaveBeenCalled();
      });
    });
  });
});
