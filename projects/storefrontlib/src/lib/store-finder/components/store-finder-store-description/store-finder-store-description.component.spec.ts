import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { StoreModule, combineReducers } from '@ngrx/store';

import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import * as fromServices from '../../services';

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderMapComponent
      ],
      providers: [
        ...fromServices.services,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
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
