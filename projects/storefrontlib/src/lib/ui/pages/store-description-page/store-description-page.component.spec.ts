import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { StoreDescriptionPageComponent } from './store-description-page.component';
import { StoreDescriptionPageLayoutComponent } from '../../layout/store-description-page-layout/store-description-page-layout.component';
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

describe('StoreDescriptionPageComponent', () => {
  let component: StoreDescriptionPageComponent;
  let fixture: ComponentFixture<StoreDescriptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreDescriptionPageComponent,
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
    fixture = TestBed.createComponent(StoreDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
