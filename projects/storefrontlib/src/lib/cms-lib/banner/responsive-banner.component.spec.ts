import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { GenericLinkComponent } from '../../ui/components/generic-link/generic-link.component';
import { CmsService } from '../../cms/facade/cms.service';

const UseCmsModuleConfig: CmsModuleConfig = {
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
  transform() {}
}

describe('ResponsiveBannerComponent', () => {
  let responsiveBannerComponent: ResponsiveBannerComponent;
  let fixture: ComponentFixture<ResponsiveBannerComponent>;
  let el: DebugElement;

  const componentData = {
    uid: 'ElectronicsHompageSplashBannerComponent',
    typeCode: 'SimpleResponsiveBannerComponent',
    modifiedTime: '2018-01-04T15:25:06+0000',
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
    type: 'Simple Responsive Banner Component',
    urlLink: '/OpenCatalogue/Cameras/Digital-Cameras/Digital-SLR/c/578'
  };

  const MockCmsService = {
    getComponentData: () => of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ResponsiveBannerComponent,
        GenericLinkComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig }
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
    expect(responsiveBannerComponent.component).toBeNull();
    responsiveBannerComponent.onCmsComponentInit(
      componentData.uid,
      of(componentData)
    );
    expect(responsiveBannerComponent.component).toBe(componentData);
    expect(el.query(By.css('a')).nativeElement.href).toContain(
      responsiveBannerComponent.component.urlLink
    );
    expect(el.query(By.css('img')).nativeElement.src).toContain(
      responsiveBannerComponent.component.media.desktop.url
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      '/medias/Elec-480x320-HomeSpeed-EN-01-480W.jpg 200w,'
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      '/medias/Elec-770x350-HomeSpeed-EN-01-770W.jpg 500w,'
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      '/medias/Elec-960x330-HomeSpeed-EN-01-960W.jpg 800w,'
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      '/medias/Elec-1400x440-HomeSpeed-EN-01-1400W.jpg 1200w'
    );
    expect(el.query(By.css('picture')).nativeElement.classList[0]).toBe(
      'responsive-banner'
    );

    expect(el.query(By.css('picture')).nativeElement.classList[1]).toBe(
      componentData.uid
    );

    expect(el.query(By.css('picture')).nativeElement.innerHTML).toContain(
      'sizes="100%" src='
    );
  });
});
