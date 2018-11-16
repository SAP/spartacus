import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';

import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';

import * as fromReducers from '../../store';
import * as fromServices from '../../services';

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers)
      ],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderMapComponent
      ],
      providers: [...fromServices.services]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
