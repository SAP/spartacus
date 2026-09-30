import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CmsBannerComponent,
  CmsService,
  FeatureDirective,
  FeaturesConfig,
  FeaturesConfigModule,
  Page,
  PageContext,
  SemanticPathService,
  UrlCommand,
} from '@spartacus/core';
import {
  ImageFetchPriority,
  LCP_PRESENCE,
  LcpContextDirectiveModule,
  LcpPresence,
  MediaComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
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
  imports: [FeaturesConfigModule, LcpContextDirectiveModule],
})
class MockMediaComponent {
  @Input() container: any;
  @Input() elementType: 'img' | 'picture' = 'img';
  @Input() fetchPriority: ImageFetchPriority | null | undefined;
}

describe('BannerComponent', () => {
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let el: DebugElement;
  let mockLcpPresence$: BehaviorSubject<LcpPresence>;

  beforeEach(() => {
    mockLcpPresence$ = new BehaviorSubject<LcpPresence>(LcpPresence.NO_LCP);
    data$.next(mockBannerData);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        {
          provide: LCP_PRESENCE,
          useValue: mockLcpPresence$,
        },
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
        },
        { provide: CmsService, useClass: MockCmsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '6.3' },
          },
        },
      ],
    })
      .overrideComponent(BannerComponent, {
        add: {
          imports: [MockMediaComponent, MockFeatureDirective],
        },
        remove: { imports: [MediaComponent, FeatureDirective] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    bannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create banner component in CmsLib', () => {
    expect(bannerComponent).toBeTruthy();
  });

  describe('cx-media', () => {
    it('should contain cx-media', () => {
      fixture.detectChanges();
      expect(el.query(By.css('cx-media'))).toBeTruthy();
    });

    describe('LCP context handling', () => {
      describe('when contains LCP element', () => {
        beforeEach(() => {
          mockLcpPresence$.next(LcpPresence.HAS_LCP);
        });

        it('should prioritize downloading the image', () => {
          fixture.detectChanges();
          const mediaComponents = fixture.debugElement.queryAll(
            By.directive(MockMediaComponent)
          );
          expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
            ImageFetchPriority.HIGH
          );
        });
      });

      describe('when does NOT contain LCP element', () => {
        beforeEach(() => {
          mockLcpPresence$.next(LcpPresence.NO_LCP);
        });

        it('should NOT prioritize downloading the image', () => {
          fixture.detectChanges();
          const mediaComponents = fixture.debugElement.queryAll(
            By.directive(MockMediaComponent)
          );
          expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
            undefined
          );
        });
      });
    });
  });

  describe('setRouterLink()', () => {
    it('should return url', () => {
      vi.spyOn<any>(bannerComponent, 'setRouterLink');
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
      vi.spyOn<any>(bannerComponent, 'setRouterLink');
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
      vi.spyOn<any>(bannerComponent, 'setRouterLink');
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
      vi.spyOn<any>(bannerComponent, 'setRouterLink');
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
      const linkComponent = el.query(
        By.css('cx-generic-link')
      ).componentInstance;
      expect(linkComponent.ariaLabel).toEqual('Banner Headline');
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
      const linkComponent = el.query(
        By.css('cx-generic-link')
      ).componentInstance;
      fixture.detectChanges();
      expect(linkComponent.ariaLabel).toEqual('hybris Accelerator');
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

  describe('onKeydown()', () => {
    it('should not navigate when feature toggle is disabled', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = false;
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not navigate for non-arrow keys', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = true;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should navigate to next sibling on ArrowRight', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = true;

      const parent = document.createElement('div');
      const sibling1 = document.createElement('cx-banner');
      const sibling2 = document.createElement('cx-banner');
      const link1 = document.createElement('a');
      const link2 = document.createElement('a');
      sibling1.appendChild(link1);
      sibling2.appendChild(link2);
      parent.appendChild(sibling1);
      parent.appendChild(sibling2);

      vi.spyOn(
        (bannerComponent as any).el,
        'nativeElement',
        'get'
      ).mockReturnValue(sibling1);

      const focusSpy = vi.spyOn(link2, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should navigate to previous sibling on ArrowLeft', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = true;

      const parent = document.createElement('div');
      const sibling1 = document.createElement('cx-banner');
      const sibling2 = document.createElement('cx-banner');
      const link1 = document.createElement('a');
      const link2 = document.createElement('a');
      sibling1.appendChild(link1);
      sibling2.appendChild(link2);
      parent.appendChild(sibling1);
      parent.appendChild(sibling2);

      vi.spyOn(
        (bannerComponent as any).el,
        'nativeElement',
        'get'
      ).mockReturnValue(sibling2);

      const focusSpy = vi.spyOn(link1, 'focus');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should navigate down one row on ArrowDown', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = true;

      // 3 siblings in a single row (getBoundingClientRect().top === 0 for all
      // off-document elements), so getColumnsPerRow returns 3 and ArrowDown
      // from index 0 lands on index 3 — out of bounds, no focus
      const parent = document.createElement('div');
      const siblings = [0, 1, 2, 3].map(() => {
        const el = document.createElement('cx-banner');
        const link = document.createElement('a');
        el.appendChild(link);
        parent.appendChild(el);
        return el;
      });

      vi.spyOn(
        (bannerComponent as any).el,
        'nativeElement',
        'get'
      ).mockReturnValue(siblings[0]);

      const focusSpy = vi.spyOn(
        siblings[3].querySelector('a') as HTMLElement,
        'focus'
      );
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      // off-document elements share top=0, so all 4 are on one "row"
      // step=4, nextIndex=4 which is out of bounds → no focus
      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should navigate up one row on ArrowUp when columns are known', () => {
      (
        bannerComponent as any
      ).featureToggles.a11yOrgAdminTileArrowKeyNavigation = true;

      const parent = document.createElement('div');
      const siblings = [0, 1, 2, 3].map(() => {
        const el = document.createElement('cx-banner');
        const link = document.createElement('a');
        el.appendChild(link);
        parent.appendChild(el);
        return el;
      });

      // Mock two rows of 2: siblings[0,1] at top=0, siblings[2,3] at top=100
      [siblings[0], siblings[1]].forEach((s) =>
        vi
          .spyOn(s, 'getBoundingClientRect')
          .mockReturnValue({ top: 0 } as DOMRect)
      );
      [siblings[2], siblings[3]].forEach((s) =>
        vi
          .spyOn(s, 'getBoundingClientRect')
          .mockReturnValue({ top: 100 } as DOMRect)
      );

      vi.spyOn(
        (bannerComponent as any).el,
        'nativeElement',
        'get'
      ).mockReturnValue(siblings[2]);

      const focusSpy = vi.spyOn(
        siblings[0].querySelector('a') as HTMLElement,
        'focus'
      );
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      vi.spyOn(event, 'preventDefault');
      bannerComponent.onKeydown(event);
      // step=2 (2 columns), ArrowUp from index 2 → index 0
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('getColumnsPerRow()', () => {
    it('should return 0 for empty array', () => {
      expect((bannerComponent as any).getColumnsPerRow([])).toBe(0);
    });

    it('should return 1 for a single element', () => {
      const el = document.createElement('cx-banner');
      expect((bannerComponent as any).getColumnsPerRow([el])).toBe(1);
    });

    it('should return full count when all siblings share the same top', () => {
      // Off-document elements all return top=0, so they are all on one row
      const siblings = [0, 1, 2].map(() => document.createElement('cx-banner'));
      expect((bannerComponent as any).getColumnsPerRow(siblings)).toBe(3);
    });

    it('should stop counting at the first element on a new row', () => {
      const siblings = [0, 1, 2, 3].map(() =>
        document.createElement('cx-banner')
      );
      vi.spyOn(siblings[0], 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);
      vi.spyOn(siblings[1], 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);
      vi.spyOn(siblings[2], 'getBoundingClientRect').mockReturnValue({
        top: 100,
      } as DOMRect);
      vi.spyOn(siblings[3], 'getBoundingClientRect').mockReturnValue({
        top: 100,
      } as DOMRect);
      expect((bannerComponent as any).getColumnsPerRow(siblings)).toBe(2);
    });

    it('should treat sub-pixel differences (< 1px) as the same row', () => {
      const siblings = [0, 1].map(() => document.createElement('cx-banner'));
      vi.spyOn(siblings[0], 'getBoundingClientRect').mockReturnValue({
        top: 0,
      } as DOMRect);
      vi.spyOn(siblings[1], 'getBoundingClientRect').mockReturnValue({
        top: 0.5,
      } as DOMRect);
      expect((bannerComponent as any).getColumnsPerRow(siblings)).toBe(2);
    });
  });
});
