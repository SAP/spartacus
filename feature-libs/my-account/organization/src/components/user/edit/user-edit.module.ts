import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { UserFormModule } from '../form/user-form.module';
import { UserEditComponent } from './user-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    UserFormModule,
    ReactiveFormsModule,
  ],
  declarations: [UserEditComponent],
  exports: [UserEditComponent],
})
export class UserEditModule {}
