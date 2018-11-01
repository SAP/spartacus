import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { combineReducers, StoreModule } from '@ngrx/store';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutComponent } from '../../layout/store-finder-page-layout/store-finder-page-layout.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
import { StoreFinderListCountComponent } from '../../../store-finder/components/store-finder-list-count/store-finder-list-count.component';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { services } from '../../../store-finder/services';
import { StoreFinderMapComponent } from '../../../store-finder/components/store-finder-map/store-finder-map.component';
import { OccModuleConfig } from '../../../occ/occ-module-config';
import { PaginationAndSortingModule } from '../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
// tslint:disable-next-line:max-line-length
import { StoreFinderStoreDescriptionComponent } from '../../../store-finder/components/store-finder-store-description/store-finder-store-description.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-display-list/store-finder-list-item/store-finder-list-item.component';
// tslint:disable-next-line:max-line-length
import { StoreFinderDisplayListComponent } from '../../../store-finder/components/store-finder-display-list/store-finder-display-list.component';

import * as fromStore from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';

describe('StoreFinderPageComponent', () => {
  let component: StoreFinderPageComponent;
  let fixture: ComponentFixture<StoreFinderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        NgbTabsetModule,
        PaginationAndSortingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromStore.reducers)
        }),
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderPageComponent,
        StoreFinderPageLayoutComponent,
        StoreFinderSearchComponent,
        StoreFinderDisplayListComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderStoreDescriptionComponent,
        StoreFinderListCountComponent
      ],
      providers: [...services, OccE2eConfigurationService, OccModuleConfig]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
