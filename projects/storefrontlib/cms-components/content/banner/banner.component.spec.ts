import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsBannerComponent,
  CmsService,
  FeaturesConfig,
  FeaturesConfigModule,
  Page,
  PageContext,
  SemanticPathService,
  UrlCommand,
} from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { GenericLinkComponent } from '../../../shared/components/generic-link/generic-link.component';
import { BannerComponent } from './banner.component';

const media = {
  code: '/images/theme/logo_hybris.jpg',
  mime: 'image/svg+xml',
  altText: 'hybris Accelerator',
  url: '/medias/logo-hybris.jpg',
};

const mockBannerData: CmsBannerComponent = {
  uid: 'SiteLogoComponent',
  typeCode: 'SimpleBannerComponent',
  name: 'Site Logo Component',
  container: 'false',
  external: 'false',
  media,
  urlLink: '/logo',
};

const mockNoLinkBannerData: CmsBannerComponent = {
  uid: 'SiteLogoComponent',
  typeCode: 'SimpleBannerComponent',
  name: 'Site Logo Component',
  container: 'false',
  external: 'false',
  media,
  urlLink: '',
};

const data$: BehaviorSubject<CmsBannerComponent> = new BehaviorSubject(
  mockBannerData
);
class MockCmsComponentData {
  get data$(): Observable<CmsBannerComponent> {
    return data$.asObservable();
  }
}

class MockCmsService {
  getPage(pageContext: PageContext): Observable<Page> {
    return of({ label: `${pageContext.id}` });
  }
}

class MockSemanticPathService {
  transform(test: UrlCommand): any[] {
    return test.params.code ?? test.cxRoute;
  }
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() elementType: 'img' | 'picture' = 'img';
}

describe('BannerComponent', () => {
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let el: DebugElement;

  beforeEach(() => {
    console.log('Starting BannerComponent test');
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FeaturesConfigModule],
      declarations: [
        BannerComponent,
        MockMediaComponent,
        GenericLinkComponent,
        MockFeatureDirective,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
        },
        { provide: CmsService, useClass: MockCmsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '6.3', a11yOrganizationsBanner: true },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    bannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create banner component in CmsLib', () => {
    expect(bannerComponent).toBeTruthy();
  });

  it('should contain cx-media', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-media'))).toBeTruthy();
  });

  describe('setRouterLink()', () => {
    it('should return url', () => {
      spyOn<any>(bannerComponent, 'setRouterLink');
      data$.next(mockBannerData);
      fixture.detectChanges();
      expect(bannerComponent.routerLink).toEqual(mockBannerData.urlLink);
      expect(bannerComponent['setRouterLink']).toHaveBeenCalledWith(
        mockBannerData
      );
    });

    it('should return content page', () => {
      const mockBannerDataWithContentPage: CmsBannerComponent = {
        uid: 'SiteLogoComponent',
        typeCode: 'SimpleBannerComponent',
        contentPage: 'HomePage',
      };
      spyOn<any>(bannerComponent, 'setRouterLink').and.callThrough();
      data$.next(mockBannerDataWithContentPage);
      fixture.detectChanges();
      expect(bannerComponent.routerLink).toEqual('HomePage');
      expect(bannerComponent['setRouterLink']).toHaveBeenCalledWith(
        mockBannerDataWithContentPage
      );
    });

    it('should return product page', () => {
      const mockBannerDataWithProduct: CmsBannerComponent = {
        uid: 'CamerasComponent',
        typeCode: 'SimpleBannerComponent',
        product: 'Sony X Camera',
      };
      spyOn<any>(bannerComponent, 'setRouterLink').and.callThrough();
      data$.next(mockBannerDataWithProduct);
      fixture.detectChanges();
      expect(bannerComponent.routerLink).toEqual('Sony X Camera');
      expect(bannerComponent['setRouterLink']).toHaveBeenCalledWith(
        mockBannerDataWithProduct
      );
    });

    it('should return category page', () => {
      const mockBannerDataWithCategory: CmsBannerComponent = {
        uid: 'CamerasComponent',
        typeCode: 'SimpleBannerComponent',
        product: 'Cameras',
      };
      spyOn<any>(bannerComponent, 'setRouterLink').and.callThrough();
      data$.next(mockBannerDataWithCategory);
      fixture.detectChanges();
      expect(bannerComponent.routerLink).toEqual('Cameras');
      expect(bannerComponent['setRouterLink']).toHaveBeenCalledWith(
        mockBannerDataWithCategory
      );
    });

    it('should show content even there is no link', () => {
      bannerComponent.routerLink = undefined;
      data$.next(mockNoLinkBannerData);
      fixture.detectChanges();

      expect(el.query(By.css('.no-link'))).toBeTruthy();
    });
  });

  describe('getTarget()', () => {
    it('should return null by default', () => {
      expect(bannerComponent.getTarget({})).toBeNull();
    });

    it('should return null for non-external page', () => {
      expect(bannerComponent.getTarget({ external: 'false' })).toBeNull();
    });

    it('should return _blank for external page', () => {
      expect(bannerComponent.getTarget({ external: 'true' })).toEqual('_blank');
    });

    describe('boolean values', () => {
      it('should return null for false', () => {
        expect(
          bannerComponent.getTarget({ external: false as any })
        ).toBeNull();
      });

      it('should return _blank for true', () => {
        expect(bannerComponent.getTarget({ external: true as any })).toEqual(
          '_blank'
        );
      });
    });
  });

  describe('styling', () => {
    it('should have style classes', () => {
      data$.next({ styleClasses: 'cls-1 cls-2' });
      fixture.detectChanges();

      expect(bannerComponent.styleClasses).toContain('cls-1');
      expect(bannerComponent.styleClasses).toContain('cls-2');
      expect((el.nativeElement as HTMLElement).classList).toContain('cls-1');
      expect((el.nativeElement as HTMLElement).classList).toContain('cls-2');

      // roll back for other tests
      data$.next(mockBannerData);
    });
  });

  describe('getImageAltText()', () => {
    it('should return alt text for single image', () => {
      expect(bannerComponent.getImageAltText(mockBannerData)).toEqual(
        'hybris Accelerator'
      );
    });

    it('should return alt text for image group', () => {
      const mockDataWithImageGroup: CmsBannerComponent = {
        ...mockBannerData,
        media: {
          mobile: media,
        },
      };
      expect(bannerComponent.getImageAltText(mockDataWithImageGroup)).toEqual(
        'hybris Accelerator'
      );
    });

    it('should return undefined if no media is present', () => {
      const mockDataWithoutMedia: CmsBannerComponent = {
        ...mockBannerData,
        media: undefined,
      };
      expect(
        bannerComponent.getImageAltText(mockDataWithoutMedia)
      ).toBeUndefined();
    });
  });

  describe('getLinkAriaLabel()', () => {
    it('should prefer headline over image alt text', () => {
      const mockDataWithHeadline: CmsBannerComponent = {
        ...mockBannerData,
        headline: 'Banner Headline',
        media,
      };
      data$.next(mockDataWithHeadline);
      fixture.detectChanges();
      const linkElement = el.query(By.css('cx-generic-link')).nativeElement;
      expect(linkElement.getAttribute('ng-reflect-aria-label')).toEqual(
        'Banner Headline'
      );
    });

    it('should use image alt text if no headline is provided', () => {
      const mockDataWithAltTextOnly: CmsBannerComponent = {
        ...mockBannerData,
        headline: undefined,
        media: {
          mobile: media,
        },
      };
      data$.next(mockDataWithAltTextOnly);
      const linkElement = el.query(By.css('cx-generic-link')).nativeElement;
      fixture.detectChanges();
      expect(linkElement.getAttribute('ng-reflect-aria-label')).toEqual(
        'hybris Accelerator'
      );
    });

    it('should return undefined if neither headline nor alt text is available', () => {
      const mockDataWithoutHeadlineOrAltText: CmsBannerComponent = {
        ...mockBannerData,
        headline: undefined,
        media: undefined,
      };
      data$.next(mockDataWithoutHeadlineOrAltText);
      fixture.detectChanges();
      const linkElement = el.query(By.css('cx-generic-link')).nativeElement;
      expect(linkElement.getAttribute('ng-reflect-aria-label')).toBeNull();
    });
  });
});
