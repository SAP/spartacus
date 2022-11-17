import { TestBed } from '@angular/core/testing';
import { PageMetaResolver } from '..';
import { PageType } from '../../model';
import { Page } from '../model/page.model';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  slots: {},
};

const mockContentPageWithTemplate: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'any-template',
  slots: {},
};

describe('PageMetaResolver', () => {
  let service: PageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageMetaResolver],
    });
    service = TestBed.inject(PageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should score 1 for ContentPage', () => {
    service.pageType = PageType.CONTENT_PAGE;
    expect(service.getScore(mockContentPage)).toEqual(1);
  });

  it('should score 0 for ContentPage with lacking page template', () => {
    service.pageType = PageType.CONTENT_PAGE;
    service.pageTemplate = 'page-requires-template';
    expect(service.getScore(mockContentPage)).toEqual(0);
  });

  it('should score -1 for CategoryPage', () => {
    service.pageType = PageType.CATEGORY_PAGE;
    expect(service.getScore(mockContentPage)).toEqual(-1);
  });

  it('should score -2 for non CategoryPage and lacking page template', () => {
    service.pageType = PageType.CATEGORY_PAGE;
    service.pageTemplate = 'page-requires-template';
    expect(service.getScore(mockContentPage)).toEqual(-2);
  });

  it('should score 1 for ContentPage with page template', () => {
    service.pageType = PageType.CONTENT_PAGE;
    expect(service.getScore(mockContentPageWithTemplate)).toEqual(1);
  });

  it('should score 2 for ContentPage with page template', () => {
    service.pageType = PageType.CONTENT_PAGE;
    service.pageTemplate = 'any-template';
    expect(service.getScore(mockContentPageWithTemplate)).toEqual(2);
  });
});
