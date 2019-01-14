import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StoreFinderListComponent } from './store-finder-list.component';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { SpinnerModule } from '../../../../ui/components/spinner/spinner.module';

import { StoreDataService, GoogleMapRendererService } from '@spartacus/core';

const location = {};
const stores = [location];
const locations = { stores: stores };

class StoreDataServiceMock {
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
  let storeDataService: StoreDataService;
  let googleMapRendererService: GoogleMapRendererService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SpinnerModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreFinderListComponent, StoreFinderMapComponent],
      providers: [
        {
          provide: GoogleMapRendererService,
          useClass: GoogleMapRendererServiceMock
        },
        { provide: StoreDataService, useClass: StoreDataServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    storeDataService = TestBed.get(StoreDataService);
    googleMapRendererService = TestBed.get(GoogleMapRendererService);

    spyOn(storeDataService, 'getStoreLatitude');
    spyOn(storeDataService, 'getStoreLongitude');
    spyOn(googleMapRendererService, 'centerMap');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should center store on map', () => {
    // given
    component.locations = locations;
    fixture.detectChanges();
    storeMapComponent = fixture.debugElement.query(
      By.css('cx-store-finder-map')
    ).componentInstance;
    spyOn(storeMapComponent, 'centerMap').and.callThrough();

    // when
    component.centerStoreOnMapByIndex(0);

    // then
    expect(storeMapComponent.centerMap).toHaveBeenCalled();
    expect(storeDataService.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataService.getStoreLongitude).toHaveBeenCalled();
  });

  it('should select store from list', () => {
    // given
    const itemNumber = 4;
    const storeListItemMock = { scrollIntoView: function() {} };
    spyOn(document, 'getElementById').and.returnValue(storeListItemMock);
    spyOn(storeListItemMock, 'scrollIntoView');

    // when
    component.selectStoreItemList(itemNumber);

    // then
    expect(document.getElementById).toHaveBeenCalledWith('item-' + itemNumber);
    expect(storeListItemMock.scrollIntoView).toHaveBeenCalled();
  });
});
