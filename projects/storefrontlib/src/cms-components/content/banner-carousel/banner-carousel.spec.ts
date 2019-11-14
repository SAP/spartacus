import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsService } from '@spartacus/core';
import {
  CmsBannerCarouselComponent,
  CmsBannerCarouselEffect,
  CmsComponent,
} from 'projects/core/src/model/cms.model';
import {
  CmsComponentData,
  ComponentWrapperDirective,
} from 'projects/storefrontlib/src/cms-structure';
import { CarouselComponent } from 'projects/storefrontlib/src/shared';
import { of } from 'rxjs';
import { IconComponent } from '../../misc';
import { BannerCarouselComponent } from './banner-carousel.component';

const componentData: CmsBannerCarouselComponent = {
  uid: 'SiteLogoComponent',
  typeCode: 'SimpleBannerCarouselComponent',
  name: 'Site Logo Component',
  banners: 'Test Banner',
  effect: CmsBannerCarouselEffect.CURTAIN,
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

class MockCmsService {}

fdescribe('CreateComponent', () => {
  let bannerCarouselComponent: BannerCarouselComponent;
  let fixture: ComponentFixture<BannerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        BannerCarouselComponent,
        CarouselComponent,
        ComponentWrapperDirective,
        IconComponent,
      ],
      providers: [
        { provide: CmsComponentData, use: MockCmsComponentData },
        { provide: CmsService, use: MockCmsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCarouselComponent);
    console.log('test');
    bannerCarouselComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(bannerCarouselComponent).toBeTruthy();
  });
});
