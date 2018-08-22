import { CmsModule } from './../../../cms/cms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    CmsModule,
    // Bootstrap
    NgbModule.forRoot()
  ],
  declarations: [LoginComponent, LoginFormComponent],
  exports: [LoginComponent, LoginFormComponent]
})
export class LoginModule {}
