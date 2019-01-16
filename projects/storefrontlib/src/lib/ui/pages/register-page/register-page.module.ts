import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page.component';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { NotAuthGuard } from '@spartacus/core';
import { PageTemplateModule } from '../../layout/page-template/page-template.module';
import { UserComponentModule } from '../../../user';

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
    PageTemplateModule,
    UserComponentModule
  ],
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule {}
