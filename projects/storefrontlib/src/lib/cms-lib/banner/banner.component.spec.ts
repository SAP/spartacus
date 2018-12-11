import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BannerComponent } from './banner.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { CmsService } from '../../cms/facade/cms.service';
import { GenericLinkComponent } from '../../ui/components/generic-link/generic-link.component';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    SimpleBannerComponent: { selector: 'BannerComponent' }
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

describe('BannerComponent', () => {
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let el: DebugElement;

  const componentData = {
    uid: 'SiteLogoComponent',
    typeCode: 'SimpleBannerComponent',
    name: 'Site Logo Component',
    container: 'false',
    external: 'false',
    media: {
      code: '/images/theme/logo_hybris.jpg',
      mime: 'image/svg+xml',
      altText: 'hybris Accelerator',
      url: '/medias/logo-hybris.jpg'
    },
    type: 'Simple Banner Component',
    urlLink: '/logo'
  };

  const MockCmsService = {
    getComponentData: () => of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        BannerComponent,
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
    fixture = TestBed.createComponent(BannerComponent);
    bannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create banner component in CmsLib', () => {
    expect(bannerComponent).toBeTruthy();
  });

  it('should contain image source', () => {
    expect(bannerComponent.component).toBeNull();
    bannerComponent.onCmsComponentInit(componentData.uid);
    expect(bannerComponent.component).toBe(componentData);
    expect(el.query(By.css('img')).nativeElement.src).toContain(
      bannerComponent.component.media.url
    );
  });
});
