import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { StoreFinderListComponent } from './store-finder-list.component';
import {
  GoogleMapRendererService,
  StoreFinderService,
} from '@spartacus/storefinder/core';
import { SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const location: PointOfService = {
  displayName: 'Test Store',
};
const stores: Array<PointOfService> = [location];
const locations = { stores: stores, pagination: { currentPage: 0 } };

class StoreFinderServiceMock implements Partial<StoreFinderService> {
  getFindStoresEntities = createSpy('getFindStoresEntities').and.returnValue(
    of()
  );
  getStoresLoading = createSpy('getStoresLoading');
  callFindStoresAction = createSpy('callFindStoresAction');
  getStoreLatitude(_location: any): number {
    return 35.528984;
  }

  getStoreLongitude(_location: any): number {
    return 139.700168;
  }
}

class GoogleMapRendererServiceMock {
  centerMap(_latitute: number, _longitude: number) {}
  renderMap() {}
}

describe('StoreFinderDisplayListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;
  let storeMapComponent: StoreFinderMapComponent;
  let storeFinderService: StoreFinderService;
  let googleMapRendererService: GoogleMapRendererService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          SpinnerModule,
          I18nTestingModule,
          NgbNavModule,
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [StoreFinderListComponent, StoreFinderMapComponent],
        providers: [
          {
            provide: GoogleMapRendererService,
            useClass: GoogleMapRendererServiceMock,
          },
          { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    storeFinderService = TestBed.inject(StoreFinderService);
    googleMapRendererService = TestBed.inject(GoogleMapRendererService);

    spyOn(storeFinderService, 'getStoreLatitude');
    spyOn(storeFinderService, 'getStoreLongitude');
    spyOn(googleMapRendererService, 'centerMap');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should center store on map', () => {
    component.locations = locations;
    fixture.detectChanges();
    storeMapComponent = fixture.debugElement.query(
      By.css('cx-store-finder-map')
    ).componentInstance;
    spyOn(storeMapComponent, 'centerMap').and.callThrough();

    component.centerStoreOnMapByIndex(0, location);

    expect(storeMapComponent.centerMap).toHaveBeenCalled();
    expect(storeFinderService.getStoreLatitude).toHaveBeenCalled();
    expect(storeFinderService.getStoreLongitude).toHaveBeenCalled();
  });

  it('should select store from list', () => {
    const itemNumber = 4;
    const storeListItemMock = { scrollIntoView: function () {} };
    spyOn(document, 'getElementById').and.returnValue(storeListItemMock as any);
    spyOn(storeListItemMock, 'scrollIntoView');

    component.selectStoreItemList(itemNumber);

    expect(document.getElementById).toHaveBeenCalledWith('item-' + itemNumber);
    expect(storeListItemMock.scrollIntoView).toHaveBeenCalled();
  });

  it('should show store details', () => {
    component.locations = locations;
    fixture.detectChanges();
    expect(component.isDetailsModeVisible).toBe(false);

    component.centerStoreOnMapByIndex(0, location);
    fixture.detectChanges();
    expect(component.isDetailsModeVisible).toBe(true);
    expect(component.storeDetails).not.toBe(null);
  });

  it('should close store details', () => {
    component.locations = locations;
    fixture.detectChanges();

    component.centerStoreOnMapByIndex(0, location);
    fixture.detectChanges();
    expect(component.isDetailsModeVisible).toBe(true);

    component.hideStoreDetails();
    expect(component.isDetailsModeVisible).toBe(false);
  });
});
