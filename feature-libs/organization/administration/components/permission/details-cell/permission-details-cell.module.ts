import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { PermissionDetailsCellComponent } from './permission-details-cell.component';

@NgModule({
  imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
  declarations: [PermissionDetailsCellComponent],
  exports: [PermissionDetailsCellComponent],
})
export class PermissionDetailsCellModule {}
