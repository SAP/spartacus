import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsBannerComponent } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { GenericLinkComponent } from '../../../shared/components/generic-link/generic-link.component';
import { BannerComponent } from './banner.component';

const mockBannerData: CmsBannerComponent = {
  uid: 'SiteLogoComponent',
  typeCode: 'SimpleBannerComponent',
  name: 'Site Logo Component',
  container: 'false',
  external: 'false',
  media: {
    code: '/images/theme/logo_hybris.jpg',
    mime: 'image/svg+xml',
    altText: 'hybris Accelerator',
    url: '/medias/logo-hybris.jpg',
  },
  urlLink: '/logo',
};

const data$: BehaviorSubject<CmsBannerComponent> = new BehaviorSubject(
  mockBannerData
);
class MockCmsComponentData {
  get data$(): Observable<CmsBannerComponent> {
    return data$.asObservable();
  }
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

describe('BannerComponent', () => {
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BannerComponent, MockMediaComponent, GenericLinkComponent],
      providers: [
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
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
});
