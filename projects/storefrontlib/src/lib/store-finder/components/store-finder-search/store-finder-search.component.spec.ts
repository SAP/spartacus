import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, StoreModule } from '@ngrx/store';

import { StoreFinderSearchComponent } from './store-finder-search.component';
import { StoreFinderService } from '../../services/store-finder.service';
import { LongitudeLatitude } from '../../models/longitude-latitude';

import * as fromRoot from '../../../routing/store';
import * as fromStore from '../../store';
import { WindowRef } from '../../services/window-ref';

const latitude = 10.1;
const longitude = 39.2;

const coor: Coordinates = {
  latitude: latitude,
  longitude: longitude,
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null
};
const position = { coords: coor, timestamp: new Date().valueOf() };

class WindowRefMock {
  get nativeWindow(): any {
    return {
      navigator: {
        geolocation: {
          getCurrentPosition: function(callback: Function) {
            callback(position);
          }
        }
      }
    };
  }
}

class StoreFinderServiceMock {
  public findStores(
    _queryText: string,
    _longitudeLatitude: LongitudeLatitude
  ) {}
  public viewAllStores() {}
}

describe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;
  let service: StoreFinderService;
  let windowRef: WindowRef;
  const keyEvent = {
    key: 'Enter'
  };
  const badKeyEvent = {
    key: 'Enter95'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [StoreFinderSearchComponent],
      providers: [
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: WindowRef, useClass: WindowRefMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StoreFinderService);
    windowRef = TestBed.get(WindowRef);
    spyOn(component, 'findStores').and.callThrough();
    spyOn(service, 'findStores').and.callThrough();
    spyOn(component, 'viewAllStores').and.callThrough();
    spyOn(service, 'viewAllStores').and.callThrough();
    spyOn(component, 'onKey').and.callThrough();
    spyOn(windowRef, 'nativeWindow').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.searchBox.setValue('query');
    expect(component.searchBox.value).toEqual('query');
    component.findStores(component.searchBox.value);
    expect(component.findStores).toHaveBeenCalled();
    expect(service.findStores).toHaveBeenCalled();
  });

  it('should call onKey and dispatch query', () => {
    component.onKey(keyEvent);
    expect(component.onKey).toHaveBeenCalled();
    expect(component.findStores).toHaveBeenCalled();
    expect(service.findStores).toHaveBeenCalled();
  });

  it('should only call onKey', () => {
    component.onKey(badKeyEvent);
    expect(component.onKey).toHaveBeenCalled();
    expect(component.findStores).not.toHaveBeenCalled();
  });

  it('should view all stores', () => {
    component.viewAllStores();
    expect(component.viewAllStores).toHaveBeenCalled();
    expect(service.viewAllStores).toHaveBeenCalled();
  });

  it('should view stores near by my location', () => {
    component.viewStoresWithMyLoc();
    expect(service.findStores).toHaveBeenCalledWith('', {
      longitude,
      latitude
    });
  });
});
