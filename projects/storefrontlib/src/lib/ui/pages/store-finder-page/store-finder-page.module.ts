import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { StoreFinderPageComponent } from './store-finder-page.component';
import { StoreFinderPageLayoutModule } from '../../layout/store-finder-page-layout/store-finder-page-layout.module';
import { StoreFinderListComponent } from '../../../store-finder/components/store-finder-list/store-finder-list.component';
import { StoreFinderNewListComponent } from '../../../store-finder/components/store-finder-new-list/store-finder-new-list.component';

const routes: Routes = [
  {
    path: 'store-finder',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'storefinderPage' },
    component: StoreFinderPageComponent,
    children: [
      {
        path: 'find/:query',
        // canActivate: [CmsPageGuards],
        // data: { pageLabel: 'storefinderPage' },
        component: StoreFinderNewListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreFinderPageLayoutModule
  ],
  declarations: [StoreFinderPageComponent],
  exports: [StoreFinderPageComponent]
})
export class StoreFinderPageModule {}
