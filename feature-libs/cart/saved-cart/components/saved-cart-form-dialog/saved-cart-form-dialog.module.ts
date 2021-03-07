import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { SavedCartFormDialogComponent } from './saved-cart-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
  ],
  declarations: [SavedCartFormDialogComponent],
  exports: [SavedCartFormDialogComponent],
})
export class SavedCartFormDialogModule {}
