import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { ContentPageGuard } from './content-page.guard';
import { PageLayoutComponent } from '../../../cms';

const routes: Routes = [
  {
    path: '**',
    canActivate: [ContentPageGuard],
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PageLayoutModule],
  providers: [ContentPageGuard]
})
export class ContentPageModule {}
