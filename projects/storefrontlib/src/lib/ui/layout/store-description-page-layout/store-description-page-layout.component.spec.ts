import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, combineReducers } from '@ngrx/store';

import { StoreDescriptionPageLayoutComponent } from './store-description-page-layout.component';

import { ScheduleComponent } from '../../../store-finder/components/schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';

import * as fromReducers from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';
import * as fromServices from '../../../store-finder/services';

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

describe('StoreDescriptionPageLayoutComponent', () => {
  let component: StoreDescriptionPageLayoutComponent;
  let fixture: ComponentFixture<StoreDescriptionPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreDescriptionPageLayoutComponent,
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderMapComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        }),
        RouterTestingModule
      ],
      providers: [
        ...fromServices.services,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDescriptionPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
