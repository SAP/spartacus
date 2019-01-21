import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page.component';

import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';
import { NotAuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { UserComponentModule } from '../../../../user';

const routes: Routes = [
  {
    path: null,
    canActivate: [NotAuthGuard, CmsPageGuards],
    component: RegisterPageComponent,
    data: { pageLabel: 'login', cxPath: 'register' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    UserComponentModule
  ],
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule {}
