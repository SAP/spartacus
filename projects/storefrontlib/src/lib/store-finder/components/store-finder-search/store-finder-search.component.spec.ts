import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderSearchComponent } from './store-finder-search.component';
import { WindowRef } from '../../services/window-ref';

import * as fromStore from '../../store';

const latitude = 10.1;
const longitude = 39.2;
const query = 'address';

const keyEvent = {
  key: 'Enter'
};
const badKeyEvent = {
  key: 'Enter95'
};

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
  let windowRef: WindowRef;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromStore.reducers)
      ],
      declarations: [StoreFinderSearchComponent],
      providers: [{ provide: WindowRef, useClass: WindowRefMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    windowRef = TestBed.get(WindowRef);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);

    spyOn(windowRef, 'nativeWindow').and.callThrough();
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.searchBox.setValue(query);
    component.findStores(component.searchBox.value);
    expect(router.navigate).toHaveBeenCalledWith(['find-stores'], {
      relativeTo: activatedRoute,
      queryParams: { query: query }
    });
  });

  it('should call onKey and dispatch query', () => {
    component.searchBox.setValue(query);
    component.onKey(keyEvent);
    expect(router.navigate).toHaveBeenCalledWith(['find-stores'], {
      relativeTo: activatedRoute,
      queryParams: { query: query }
    });
  });

  it('should only call onKey', () => {
    component.onKey(badKeyEvent);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should view stores near by my location', () => {
    component.viewStoresWithMyLoc();
    expect(router.navigate).toHaveBeenCalledWith(['find-stores'], {
      relativeTo: activatedRoute,
      queryParams: { latitude: latitude, longitude: longitude }
    });
  });
});
