import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromStore from '../../../store-finder/store';
import * as fromRoot from '../../../routing/store';
import { combineReducers, StoreModule } from '@ngrx/store';
import { StoreFinderPagingComponent } from '../../../store-finder/components/store-finder-paging/store-finder-paging.component';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { StoreFinderSearchComponent } from '../../../store-finder/components/store-finder-search/store-finder-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { StoreFinderService } from '../../../store-finder/services/store-finder.service';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* tslint:disable */
import { StoreFinderListItemComponent } from '../../../store-finder/components/store-finder-list/store-finder-list-item/store-finder-list-item.component';
/* tslint:enable */

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromStore.reducers),
          cms: combineReducers(fromCmsReducer.getReducers())
        })
      ],
      declarations: [
        StoreFinderPageLayoutComponent,
        StoreFinderPagingComponent,
        StoreFinderListItemComponent,
        StoreFinderListComponent,
        StoreFinderSearchComponent
      ],
      providers: [StoreFinderService, OccE2eConfigurationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
