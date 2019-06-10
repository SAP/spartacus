import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  StoreFinderCoreModule,
  UrlModule,
} from '@spartacus/core';
import { CmsModule } from '../../cms-structure/cms.module';
import { LayoutConfig } from '../../layout/config/layout-config';
import { ListNavigationModule, SpinnerModule } from '../../shared/index';
import {
  ScheduleComponent,
  StoreFinderComponent,
  StoreFinderGridComponent,
  StoreFinderHeaderComponent,
  StoreFinderListComponent,
  StoreFinderListItemComponent,
  StoreFinderMapComponent,
  StoreFinderPaginationDetailsComponent,
  StoreFinderSearchComponent,
  StoreFinderSearchResultComponent,
  StoreFinderStoreDescriptionComponent,
  StoreFinderStoresCountComponent,
} from './components/index';
import { IconModule } from './../misc/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    ListNavigationModule,
    NgbTabsetModule,
    SpinnerModule,
    UrlModule,
    StoreFinderCoreModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig | LayoutConfig>{
      cmsComponents: {
        StoreFinderComponent: {
          component: StoreFinderComponent,
          childRoutes: [
            {
              path: 'find',
              component: StoreFinderSearchResultComponent,
            },
            {
              path: 'view-all',
              component: StoreFinderStoresCountComponent,
            },
            {
              path: 'country/:country',
              component: StoreFinderGridComponent,
            },
            {
              path: 'country/:country/region/:region',
              component: StoreFinderGridComponent,
            },
            {
              path: 'country/:country/region/:region/:store',
              component: StoreFinderStoreDescriptionComponent,
            },
            {
              path: 'country/:country/:store',
              component: StoreFinderStoreDescriptionComponent,
            },
          ],
        },
      },
      layoutSlots: {
        StoreFinderPageTemplate: {
          slots: ['MiddleContent', 'SideContent'],
        },
      },
    }),
  ],
  declarations: [
    StoreFinderSearchComponent,
    StoreFinderListComponent,
    StoreFinderMapComponent,
    StoreFinderListItemComponent,
    StoreFinderStoresCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
    ScheduleComponent,
    StoreFinderHeaderComponent,
    StoreFinderSearchResultComponent,
    StoreFinderComponent,
    StoreFinderPaginationDetailsComponent,
  ],
  entryComponents: [
    StoreFinderComponent,
    StoreFinderSearchResultComponent,
    StoreFinderStoresCountComponent,
    StoreFinderGridComponent,
    StoreFinderStoreDescriptionComponent,
  ],
})
export class StoreFinderModule {}
