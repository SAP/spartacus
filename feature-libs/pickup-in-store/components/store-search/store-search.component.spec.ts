import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';

import { StoreSearchComponent } from './store-search.component';

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [StoreSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('onFindStores emits a location and returns false', () => {
    const location = 'a location';
    spyOn(component, 'onFindStores').and.callThrough();
    spyOn(component.findStores, 'emit').and.callThrough();
    const RESULT = component.onFindStores(location);
    expect(component.onFindStores).toHaveBeenCalledWith(location);
    expect(component.findStores.emit).toHaveBeenCalledWith({ location });
    expect(RESULT).toEqual(false);
  });

  it('onHideOutOfStock emits eventHideOutOfStock', () => {
    spyOn(component.eventHideOutOfStock, 'emit');
    expect(component.hideOutOfStock).toEqual(false);
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(true);
    component.hideOutOfStock = !component.hideOutOfStock;
    fixture.detectChanges();
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(false);
  });

  it('useMyLocation makes findStores emit a location', () => {
    const mockNavigatorGeolocation = () => {
      const clearWatchMock = () => {};
      const getCurrentPositionMock = () =>
        component.findStores.emit({ latitude: 0, longitude: 0 });
      const watchPositionMock = () => {};

      const geolocation = {
        clearWatch: clearWatchMock,
        getCurrentPosition: getCurrentPositionMock,
        watchPosition: watchPositionMock,
      };

      Object.defineProperty(window.navigator, 'geolocation', {
        value: geolocation,
      });

      return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
    };
    mockNavigatorGeolocation();

    spyOn(component.findStores, 'emit').and.callThrough();
    component.useMyLocation();
    expect(component.findStores.emit).toHaveBeenNthCalledWith({ latitude: 0, longitude: 0 });
  });
});
