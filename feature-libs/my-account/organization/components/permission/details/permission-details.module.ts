import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  ConfirmModalModule,
  IconModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { PermissionListModule } from '../list/permission-list.module';
import { PermissionDetailsComponent } from './permission-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    PermissionListModule,
    ConfirmModalModule,
  ],
  declarations: [PermissionDetailsComponent],
  exports: [PermissionDetailsComponent],
})
export class PermissionDetailsModule {}
