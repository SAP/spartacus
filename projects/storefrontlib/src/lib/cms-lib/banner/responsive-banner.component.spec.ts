import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  CmsConfig,
  TranslateUrlOptions,
  Component as SpaComponent,
  CmsBannerComponent,
  CmsResponsiveBannerComponentMedia
} from '@spartacus/core';
import { BannerComponentService } from './banner.component.service';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { GenericLinkComponent } from '../../ui/components/generic-link/generic-link.component';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

const UseCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    SimpleResponsiveBannerComponent: { selector: 'ResponsiveBannerComponent' }
  },
  server: {
    baseUrl: 'https://localhost:9002'
  }
};

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(options: TranslateUrlOptions): string {
    return '/translated-path' + options.url;
  }
}

describe('ResponsiveBannerComponent', () => {
  let responsiveBannerComponent: ResponsiveBannerComponent;
  let fixture: ComponentFixture<ResponsiveBannerComponent>;
  let el: DebugElement;

  const componentData: CmsBannerComponent = {
    uid: 'ElectronicsHompageSplashBannerComponent',
    typeCode: 'SimpleResponsiveBannerComponent',
    modifiedtime: new Date('2018-01-04T15:25:06+0000'),
    name: 'Electronics Homepage Splash Banner Component',
    container: 'false',
    media: {
      tablet: {
        code: 'Elec_770x350_HomeSpeed_EN_01_770W.jpg',
        mime: 'image/jpeg',
        altText: 'Save Big On Select SLR & DSLR Cameras',
        url: '/medias/Elec-770x350-HomeSpeed-EN-01-770W.jpg'
      },
      desktop: {
        code: 'Elec_960x330_HomeSpeed_EN_01_960W.jpg',
        mime: 'image/jpeg',
        altText: 'Save Big On Select SLR & DSLR Cameras',
        url: '/medias/Elec-960x330-HomeSpeed-EN-01-960W.jpg'
      },
      mobile: {
        code: 'Elec_480x320_HomeSpeed_EN_01_480W.jpg',
        mime: 'image/jpeg',
        altText: 'Save Big On Select SLR & DSLR Cameras',
        url: '/medias/Elec-480x320-HomeSpeed-EN-01-480W.jpg'
      },
      widescreen: {
        code: 'Elec_1400x440_HomeSpeed_EN_01_1400W.jpg',
        mime: 'image/jpeg',
        altText: 'Save Big On Select SLR & DSLR Cameras',
        url: '/medias/Elec-1400x440-HomeSpeed-EN-01-1400W.jpg'
      }
    },
    urlLink: '/OpenCatalogue/Cameras/Digital-Cameras/Digital-SLR/c/578'
  };

  const MockCmsComponentData = <CmsComponentData<SpaComponent>>{
    data$: of(componentData),
    uid: 'test'
  };

  const MockBannerComponentService = new BannerComponentService(
    MockCmsComponentData,
    UseCmsModuleConfig
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ResponsiveBannerComponent,
        GenericLinkComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        {
          provide: BannerComponentService,
          useValue: MockBannerComponentService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveBannerComponent);
    responsiveBannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create responsive banner component', () => {
    expect(responsiveBannerComponent).toBeTruthy();
  });

  it('should contain responsive banner image source, source set and redirect url', () => {
    fixture.detectChanges();
    expect(el.query(By.css('a')).nativeElement.href).toContain(
      '/translated-path' + componentData.urlLink
    );
    expect(el.query(By.css('img')).nativeElement.src).toContain(
      (<CmsResponsiveBannerComponentMedia>componentData.media).desktop.url
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      `${
        (<CmsResponsiveBannerComponentMedia>componentData.media).mobile.url
      } 200w,`
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      `${
        (<CmsResponsiveBannerComponentMedia>componentData.media).tablet.url
      } 500w,`
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      `${
        (<CmsResponsiveBannerComponentMedia>componentData.media).desktop.url
      } 800w,`
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      `${
        (<CmsResponsiveBannerComponentMedia>componentData.media).widescreen.url
      } 1200w`
    );
    expect(el.query(By.css('picture')).nativeElement.classList[0]).toBe(
      'responsive-banner'
    );

    expect(el.query(By.css('picture')).nativeElement.classList[1]).toBe(
      MockCmsComponentData.uid
    );

    expect(el.query(By.css('picture')).nativeElement.innerHTML).toContain(
      'sizes="100%" src='
    );
  });
});
