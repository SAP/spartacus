import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreDescriptionPageComponent } from './store-description-page.component';
import { CmsPageGuards } from '../../../cms/guards';
import { StoreDescriptionPageLayoutModule } from '../../layout/store-description-page-layout/store-description-page-layout.module';

const routes: Routes = [
  {
    path: 'store-finder/country/:country/region/:province/:store',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage' },
    component: StoreDescriptionPageComponent
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
