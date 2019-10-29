// import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CmsBannerCarouselComponent as model,
  CmsService,
  ContentSlotComponentData,
  RoutingConfig,
} from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';
import { CarouselComponent } from 'projects/storefrontlib/src/shared';
import { Observable, of } from 'rxjs';
import { IconComponent, IconLoaderService } from '../../misc';
import { BannerCarouselComponent } from './banner-carousel.component';

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

class MockCmsService {
  getComponentData() {
    return of();
  }
}

fdescribe('CreateComponent', () => {
  let component: BannerCarouselComponent;
  let fixture: ComponentFixture<BannerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerCarouselComponent,
        CarouselComponent,
        IconComponent,
        MockComponentWrapperDirective,
      ],
      providers: [
        { provide: IconLoaderService, useClass: MockIconLoaderService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: Store, useClass: MockStore },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items', () => {
    expect(component.getItems()).toBeTruthy();
  });
});
