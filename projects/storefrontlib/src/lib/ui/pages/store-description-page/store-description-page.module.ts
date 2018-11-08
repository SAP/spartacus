import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreDescriptionPageComponent } from './store-description-page.component';
import { CmsPageGuards } from '../../../cms/guards';
import { StoreDescriptionPageLayoutModule } from '../../layout/store-description-page-layout/store-description-page-layout.module';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: StoreDescriptionPageComponent,
    data: { pageLabel: 'storefinderPage', cxPath: 'storeDescription' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreDescriptionPageLayoutModule
  ],
  declarations: [StoreDescriptionPageComponent],
  exports: [StoreDescriptionPageComponent]
})
export class StoreDescriptionPageModule {}
