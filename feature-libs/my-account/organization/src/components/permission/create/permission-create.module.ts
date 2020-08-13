import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { PermissionCreateComponent } from './permission-create.component';
import { PermissionFormModule } from '../form/permission-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,
    PermissionFormModule,
    ReactiveFormsModule,
  ],
  declarations: [PermissionCreateComponent],
})
export class PermissionCreateModule {}
