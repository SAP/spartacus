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
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { IconTestingModule } from '@spartacus/storefront';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { PickupLocationsSearchFacade } from 'feature-libs/pickup-in-store/root/facade';
import { MockStoreFinderService } from 'feature-libs/storefinder/components/abstract-store-item/abstract-store-item.component.spec';
import { Observable, of } from 'rxjs';
import { PickUpInStoreDetailsComponent } from './pickup-in-store-details.component';

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

describe('PickUpInStoreDetailsComponent', () => {
  let component: PickUpInStoreDetailsComponent;
  let fixture: ComponentFixture<PickUpInStoreDetailsComponent>;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickUpInStoreDetailsComponent],
      imports: [
        CommonModule,
        I18nTestingModule,
        IconTestingModule,
        ConfigModule.withConfig({
          cmsComponents: {
            PickUpInStoreDetails: {
              component: PickUpInStoreDetailsComponent,
            },
          },
        } as CmsConfig),
      ],
      providers: [],
    }).compileComponents();
    routingService = TestBed.inject(RoutingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpInStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
