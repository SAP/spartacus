import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StoreFinderListComponent } from './store-finder-list.component';
import { MaterialModule } from '../../../material.module';
import { StoreFinderPagingComponent } from '../store-finder-paging/store-finder-paging.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { ConfigService } from '../../../occ/config.service';
import { StoreDataService } from '../../services';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../../store/reducers';

describe('StoreFinderListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [
        StoreFinderListComponent,
        StoreFinderPagingComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent
      ],
      providers: [OccE2eConfigurationService, ConfigService, StoreDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
