import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerCarouselComponent } from './banner-carousel.component';
import { CarouselComponent } from 'projects/storefrontlib/src/shared';
import { IconComponent, IconLoaderService } from '../../misc';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { Store } from '@ngrx/store';
import {
  RoutingConfig,
  CmsService,
  ContentSlotComponentData,
  CmsBannerCarouselComponent as model,
} from '@spartacus/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { of, Observable } from 'rxjs';

const mockCmsComponentData = {
  uid: 'test',
  data$: of(),
};

@Directive({
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

class MockIconLoaderService {}

class MockCmsComponentData {
  data$: Observable<model> = of(mockCmsComponentData);
}

class MockStore {}

class MockRoutingConfig {}

class MockRouter {}

class MockCmsService {}

fdescribe('CreateComponent', () => {
  let component: BannerCarouselComponent;
  let fixture: ComponentFixture<BannerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        BannerCarouselComponent,
        CarouselComponent,
        IconComponent,
        MockComponentWrapperDirective,
      ],
      providers: [
        { provide: IconLoaderService, useClass: MockIconLoaderService },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: Store, useClass: MockStore },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: Router, useClass: MockRouter },
        { provide: CmsService, useClass: MockCmsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items', () => {
    expect(component.getItems()).toBeTruthy();
  });
});
