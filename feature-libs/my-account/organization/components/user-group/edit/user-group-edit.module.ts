import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { UserGroupFormModule } from '../form/user-group-form.module';
import { UserGroupEditComponent } from './user-group-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,

    UserGroupFormModule,
    ReactiveFormsModule,
  ],
  declarations: [UserGroupEditComponent],
  exports: [UserGroupEditComponent],
})
export class UserGroupEditModule {}
