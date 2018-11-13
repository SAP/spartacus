import { TestBed, inject } from '@angular/core/testing';
import { DefaultPageService } from './default-page.service';
import { CmsModuleConfig } from '../cms-module-config';
import { PageType } from '@spartacus/core';

const MockCmsModuleConfig: CmsModuleConfig = {
  defaultPageIdForType: {
    ProductPage: ['testPage']
  }
};

describe('DefaultPageService', () => {
  let service: DefaultPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefaultPageService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig }
      ]
    });

    service = TestBed.get(DefaultPageService);
  });

  it('should DefaultPageService is injected', inject(
    [DefaultPageService],
    (pageService: DefaultPageService) => {
      expect(pageService).toBeTruthy();
    }
  ));

  describe('getDefaultPageIdsBytype', () => {
    it('should get the default pageId', () => {
      const result: string[] = service.getDefaultPageIdsBytype(
        PageType.PRODUCT_PAGE
      );
      expect(result).toEqual(['testPage']);
    });
  });
});
