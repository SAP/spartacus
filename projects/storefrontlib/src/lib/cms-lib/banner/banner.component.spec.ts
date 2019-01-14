import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BannerComponent } from './banner.component';
import { CmsConfig, Component } from '@spartacus/core';
import { GenericLinkComponent } from '../../ui/components/generic-link/generic-link.component';
import { CmsComponentData } from '../../cms/components/cms-component-data';

const UseCmsModuleConfig: CmsConfig = {
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

  const MockCmsComponentData = <CmsComponentData<Component>>{
    data$: of(componentData),
    uid: 'test',
    contextParameters: null
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
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: CmsConfig, useValue: UseCmsModuleConfig }
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
    fixture.detectChanges();
    expect(el.query(By.css('img')).nativeElement.src).toContain(
      componentData.media.url
    );
  });
});
