import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BannerComponent } from './banner.component';
import {
  CmsConfig,
  Component as SpaComponent,
  CmsBannerComponent,
  CmsBannerComponentMedia
} from '@spartacus/core';
import { GenericLinkComponent } from '../../ui/components/generic-link/generic-link.component';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { BannerComponentService } from './banner.component.service';

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
  transform(): any {}
}

describe('BannerComponent', () => {
  let bannerComponent: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let el: DebugElement;

  const componentData: CmsBannerComponent = {
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
    urlLink: '/logo'
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
        BannerComponent,
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
      (<CmsBannerComponentMedia>componentData.media).url
    );
  });
});
