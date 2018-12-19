import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { StoreFinderService, StoreDataService } from '../../services';
import { SpinnerComponent } from '../../../ui';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';

import * as fromReducers from '../../store';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

const storeId = 'shop_new_york_1';

const mockActivatedRoute = {
  snapshot: {
    params: {}
  }
};

class MapRendererServiceMock {
  public renderMap(_mapElement: HTMLElement, _locations: any[]): void {}
  public centerMap(_latitude: number, _longitude: number): void {}
}

class StoreDataServiceMock {
  getStoreLatitude() {}
  getStoreLongitude() {}
}

class StoreFinderServiceMock {
  viewStoreById() {}
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;
  let storeFinderService: StoreFinderService;

  it('should call storeFinderService with store id', () => {
    mockActivatedRoute.snapshot.params = {
      store: storeId
    };
    configureTestBed();
    spyOn(storeFinderService, 'viewStoreById');

    createComponent();

    expect(component).toBeTruthy();
    expect(storeFinderService.viewStoreById).toHaveBeenCalledWith(storeId);
  });

  function configureTestBed() {
    const bed = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers)
      ],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderMapComponent,
        MockTranslateUrlPipe,
        SpinnerComponent
      ],
      providers: [
        StoreDataService,
        { provide: StoreDataService, useClass: StoreDataServiceMock },
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GoogleMapRendererService, useClass: MapRendererServiceMock }
      ]
    });
    bed.compileComponents();
    storeFinderService = bed.get(StoreFinderService);
  }

  function createComponent() {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
