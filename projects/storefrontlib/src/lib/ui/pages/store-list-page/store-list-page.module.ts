import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { StoreListPageLayoutModule } from '../../layout/store-list-page-layout/store-list-page-layout.module';

import { StoreListPageComponent } from './store-list-page.component';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: StoreListPageComponent,
    data: { pageLabel: 'storefinderPage', cxPath: 'storeList' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreListPageLayoutModule
  ],
  declarations: [StoreListPageComponent],
  exports: [StoreListPageComponent]
})
export class StoreListPageModule {}
