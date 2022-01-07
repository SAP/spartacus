import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [ClearCartDialogComponent],
  exports: [ClearCartDialogComponent],
})
export class ClearCartDialogModule {}
