import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { ResponsiveBannerComponent } from './responsive-banner.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { ConfigService } from '../../newcms/config.service';
import { SvgLoaderService } from './svg-loader.service';

class UseConfigService {
  cmsComponentMapping = {
    SimpleResponsiveBannerComponent: 'ResponsiveBannerComponent'
  };
  server = {
    baseUrl: 'https://localhost:9002'
  };
}

class MockSvgLoaderService {
  isSVG(any) {
    return false;
  }
}

fdescribe('ResponsiveBannerComponent', () => {
  let responsiveBannerComponent: ResponsiveBannerComponent;
  let fixture: ComponentFixture<ResponsiveBannerComponent>;
  let store: Store<fromCmsReducer.CmsState>;
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

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule
        ],
        declarations: [ResponsiveBannerComponent],
        providers: [
          { provide: ConfigService, useClass: UseConfigService },
          { provide: SvgLoaderService, useClass: MockSvgLoaderService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveBannerComponent);
    responsiveBannerComponent = fixture.componentInstance;
    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should create responsive banner component', () => {
    expect(responsiveBannerComponent).toBeTruthy();
  });

  it('should contain responsive banner image source, source set and redirect url', () => {
    expect(responsiveBannerComponent.component).toBeNull();
    responsiveBannerComponent.bootstrap();
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
      'https://localhost:9002/medias/Elec-960x330-HomeSpeed-EN-01-960W.jpg 800w,'
    );
    expect(el.query(By.css('img')).nativeElement.srcset).toContain(
      'https://localhost:9002/medias/Elec-1400x440-HomeSpeed-EN-01-1400W.jpg 1200w'
    );
    expect(el.query(By.css('picture')).nativeElement.classList[0]).toBe(
      'responsive-banner'
    );
    expect(el.query(By.css('picture')).nativeElement.innerHTML).toContain(
      '<img sizes="100%" src='
    );
  });
});
