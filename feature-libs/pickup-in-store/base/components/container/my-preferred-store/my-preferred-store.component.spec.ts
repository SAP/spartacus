import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsConfig,
  CmsService,
  ConfigModule,
  I18nTestingModule,
  Page,
  RoutingService,
} from '@spartacus/core';
import { StoreModule } from '@spartacus/pickup-in-store/base/components';
import { PreferredStoreService } from '@spartacus/pickup-in-store/base/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { CardModule, IconTestingModule } from '@spartacus/storefront';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { PickupLocationsSearchFacade } from 'feature-libs/pickup-in-store/root/facade';
import { MockStoreFinderService } from 'feature-libs/storefinder/components/abstract-store-item/abstract-store-item.component.spec';
import { Observable, of } from 'rxjs';
import { MyPreferredStoreComponent } from './my-preferred-store.component';

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
  refreshLatestPage() {}
  refreshPageById() {}
  refreshComponent() {}
}

describe('MyPreferredStoreComponent', () => {
  let component: MyPreferredStoreComponent;
  let fixture: ComponentFixture<MyPreferredStoreComponent>;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPreferredStoreComponent],
      imports: [
        CardModule,
        CommonModule,
        I18nTestingModule,
        IconTestingModule,
        StoreModule,
        ConfigModule.withConfig({
          cmsComponents: {
            MyPreferredStore: {
              component: MyPreferredStoreComponent,
            },
          },
        } as CmsConfig),
      ],
      providers: [
        { provide: PreferredStoreService, useClass: MockPreferredStoreService },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: StoreFinderService, useClass: MockStoreFinderService },
        { provide: CmsService, useClass: MockCmsService },
      ],
    }).compileComponents();
    routingService = TestBed.inject(RoutingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPreferredStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should toggleOpenHours', () => {
    const initialValue = !!component.openHoursOpen;
    component.toggleOpenHours();
    expect(component.openHoursOpen).toEqual(!initialValue);
  });

  it('should changeStore', () => {
    spyOn(routingService, 'go');
    component.changeStore();
    expect(routingService.go).toHaveBeenCalledWith(['/store-finder']);
  });

  it('should getDirectionsToStore', () => {
    spyOn(component, 'getDirectionsToStore');

    const getDirectionBtn =
      fixture.debugElement.nativeElement.querySelector('.cx-action-link');
    getDirectionBtn.click();

    expect(component.getDirectionsToStore).toHaveBeenCalled();
  });
});
