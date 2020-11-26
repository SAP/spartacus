import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderService } from '@spartacus/misc/storefinder/core';
import { SpinnerModule } from '@spartacus/storefront';

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

@Component({
  selector: 'cx-store-finder-list-item',
  template: '',
})
class MockStoreFinderListItemComponent {
  @Input()
  location;
}

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

const mockStoreFinderService = {
  getViewAllStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  getViewAllStoresLoading: jasmine.createSpy(),
  findStoresAction: jasmine.createSpy().and.returnValue(of(Observable)),
};

const mockRoutingService = {
  go: jasmine.createSpy('go'),
};

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SpinnerModule],
      declarations: [
        StoreFinderGridComponent,
        MockStoreFinderListItemComponent,
      ],
      providers: [
        { provide: StoreFinderService, useValue: mockStoreFinderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    storeFinderService = TestBed.inject(StoreFinderService);
  });

  it('should create with country routing parameter', () => {
    route.snapshot.params = { country: countryIsoCode };
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(storeFinderService.findStoresAction).toHaveBeenCalledWith(
      '',
      {
        pageSize: -1,
      },
      undefined,
      countryIsoCode
    );
  });

  it('should create with country and region routing parameters', () => {
    route.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode,
    };
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
