import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { StoreFinderModule } from '@spartacus/storefinder';
import { SpinnerModule } from '@spartacus/storefront';
import { MockPickupInStoreService } from 'feature-libs/pickup-in-store/core/facade/pickup-in-store.service.spec';
import { StoreListComponent } from './store-list.component';

describe('StoreListComponent', () => {
  let component: StoreListComponent;
  let fixture: ComponentFixture<StoreListComponent>;
  let pickupInStoreService: PickupInStoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SpinnerModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
        StoreFinderModule,
      ],
      declarations: [StoreListComponent],
      providers: [
        { provide: PickupInStoreFacade, useClass: MockPickupInStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreListComponent);
    component = fixture.componentInstance;
    pickupInStoreService = TestBed.inject(PickupInStoreFacade);

    fixture.detectChanges();
  });

  it('should create store list', () => {
    expect(component).toBeDefined();
  });

  it('should get local stores on init', () => {
    spyOn(pickupInStoreService, 'getStores');
    spyOn(pickupInStoreService, 'getStockLoading');
    spyOn(pickupInStoreService, 'getSearchHasBeenPerformed');
    component.ngOnInit();
    expect(pickupInStoreService.getStores).toHaveBeenCalled();
    expect(pickupInStoreService.getStockLoading).toHaveBeenCalled();
    expect(pickupInStoreService.getSearchHasBeenPerformed).toHaveBeenCalled();
  });

  it('get storeSearch() returns storeFinderSearchQuery', () => {
    component.storeSearch = {};
    fixture.detectChanges();
    expect(component.storeSearch).toEqual({});
  });
});
