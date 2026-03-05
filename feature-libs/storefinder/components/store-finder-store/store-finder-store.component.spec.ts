import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  I18nTestingModule,
  MockTranslatePipe,
  PointOfService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { ICON_TYPE, IconComponent, SpinnerModule } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';
import { StoreFinderStoreDescriptionComponent } from '../store-finder-store-description/store-finder-store-description.component';
import { StoreFinderStoreComponent } from './store-finder-store.component';
import createSpy = jasmine.createSpy;

class MockStoreFinderService implements Partial<StoreFinderService> {
  getStoresLoading = createSpy('getStoresLoading');
  getFindStoreEntityById = createSpy('getFindStoreEntityById').and.returnValue(
    EMPTY
  );
  viewStoreById = createSpy('viewStoreById');
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-store-finder-store-description',
  template: '',
})
class MockStoreFinderStoreDescriptionComponent {
  @Input() location: PointOfService;
  @Input() disableMap: boolean;
}

const mockActivatedRoute = {
  snapshot: {
    params: {
      store: 'test-store',
      country: 'test',
    },
  },
};

describe('StoreFinderStoreComponent', () => {
  let component: StoreFinderStoreComponent;
  let fixture: ComponentFixture<StoreFinderStoreComponent>;
  let routingService: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, StoreFinderStoreComponent, I18nTestingModule],
      providers: [
        { provide: RoutingService, useValue: { go: jasmine.createSpy() } },
        {
          provide: StoreFinderService,
          useClass: MockStoreFinderService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    })
      .overrideComponent(StoreFinderStoreComponent, {
        remove: {
          imports: [
            TranslatePipe,
            IconComponent,
            StoreFinderStoreDescriptionComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxIconComponent,
            MockStoreFinderStoreDescriptionComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    routingService = TestBed.inject(RoutingService);
    fixture = TestBed.createComponent(StoreFinderStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goBack and return to previous view', () => {
    component.goBack();

    expect(routingService.go).toHaveBeenCalledWith([
      `store-finder/country/${mockActivatedRoute.snapshot.params.country}`,
    ]);
  });
});
