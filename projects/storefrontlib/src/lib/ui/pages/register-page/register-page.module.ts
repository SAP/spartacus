import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPageComponent } from './register-page.component';
import { RegisterLayoutModule } from '../../layout/register-layout/register-layout.module';
import { NotAuthGuard } from './../../../auth/guards/not-auth.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [NotAuthGuard, CmsPageGuards],
    data: { pageLabel: 'login' },
    component: RegisterPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RegisterLayoutModule, RouterModule.forChild(routes)],
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule {}
