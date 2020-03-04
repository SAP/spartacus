import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  PointOfService,
  RoutingService,
  StoreFinderService,
} from '@spartacus/core';
import { SpinnerModule } from '../../../../shared';
import { StoreFinderStoreComponent } from './store-finder-store.component';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const mockStoreFinderService = {
  getStoresLoading: jasmine.createSpy(),
  getFindStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  viewStoreById: jasmine.createSpy().and.returnValue(of(Observable)),
};

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, RouterTestingModule, I18nTestingModule],
      declarations: [
        StoreFinderStoreComponent,
        MockStoreFinderStoreDescriptionComponent,
        MockCxIconComponent,
      ],
      providers: [
        { provide: RoutingService, useValue: { go: jasmine.createSpy() } },
        {
          provide: StoreFinderService,
          useValue: mockStoreFinderService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
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
