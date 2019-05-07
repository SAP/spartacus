import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  StoreFinderCoreModule,
  UrlModule,
} from '@spartacus/core';
import { LayoutConfig } from '../../layout/config/layout-config';
import { BootstrapModule } from '../../lib/bootstrap.module';
import { CmsModule } from '../../lib/cms/index';
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

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    ReactiveFormsModule,
    RouterModule,
    ListNavigationModule,
    BootstrapModule,
    SpinnerModule,
    UrlModule,
    StoreFinderCoreModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig | LayoutConfig>{
      cmsComponents: {
        StoreFinderComponent: {
          selector: 'cx-store-finder',
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
