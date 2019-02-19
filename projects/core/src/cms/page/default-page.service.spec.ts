import { TestBed, inject } from '@angular/core/testing';
import { DefaultPageService } from '../services/default-page.servicege.service';
import { CmsConfig } from '../config/cms-config';
import { PageType } from '../../occ/occ-models/occ.models';

const MockCmsModuleConfig: CmsConfig = {
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
        { provide: CmsConfig, useValue: MockCmsModuleConfig }
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
