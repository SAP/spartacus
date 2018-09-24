import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { MaterialModule } from '../../../material.module';
import { StoreFinderSearchComponent } from './store-finder-search.component';
import { StoreFinderService } from '../../services/store-finder.service';

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

describe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;
  let service: StoreFinderService;
  let windowRef: WindowRef;
  let store: Store<fromStore.StoresState>;
  const keyEvent = {
    key: 'Enter'
  };
  const badKeyEvent = {
    key: 'Enter95'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [StoreFinderSearchComponent],
      providers: [
        StoreFinderService,
        { provide: WindowRef, useClass: WindowRefMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StoreFinderService);
    windowRef = TestBed.get(WindowRef);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
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
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.FindStores({
        queryText: 'query'
      })
    );
  });

  it('should call onKey and dispatch query', () => {
    component.onKey(keyEvent);
    expect(component.onKey).toHaveBeenCalled();
    expect(component.findStores).toHaveBeenCalled();
    expect(service.findStores).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
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
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.FindAllStores());
  });

  it('should view stores near by my location', () => {
    component.viewStoresWithMyLoc();
    expect(service.findStores).toHaveBeenCalledWith('', [latitude, longitude]);
  });
});
