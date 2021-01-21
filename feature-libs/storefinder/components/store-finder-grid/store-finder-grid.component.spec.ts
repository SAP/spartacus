import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService, TranslationService } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderService } from '@spartacus/storefinder/core';
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

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

const isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject(true);
const isLoaded$: BehaviorSubject<Boolean> = new BehaviorSubject(true);

class MockStoreFinderService {
  getFindStoresEntities() {
    return of();
  }
  getStoresLoading = () => isLoading$.asObservable();
  getStoresLoaded = () => isLoaded$.asObservable();
  findStoresAction() {
    return of();
  }
}

const mockRoutingService = {
  go: jasmine.createSpy('go'),
};

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, SpinnerModule],
        declarations: [
          StoreFinderGridComponent,
          MockStoreFinderListItemComponent,
        ],
        providers: [
          { provide: StoreFinderService, useClass: MockStoreFinderService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: RoutingService, useValue: mockRoutingService },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    StoreFinderGridComponent.prototype.ngOnInit = () => {};
    route = TestBed.inject(ActivatedRoute);
    storeFinderService = TestBed.inject(StoreFinderService);
  });

  it('should create with country routing parameter', () => {
    component.ngOnInit();
    route.snapshot.params = { country: countryIsoCode };
    spyOn(storeFinderService, 'findStoresAction');
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

  it('should call findStores on language change', () => {
    spyOn(component, 'findStores');
    isLoading$.next(false);
    isLoaded$.next(false);
    fixture.detectChanges();

    expect(component.findStores).toHaveBeenCalled();
  });
});
