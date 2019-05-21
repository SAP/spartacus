import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveForLaterComponent } from './save-for-later.component';
import { CartSharedModule } from '../cart-shared';

@NgModule({
  declarations: [SaveForLaterComponent],
  imports: [CommonModule, CartSharedModule],
  exports: [SaveForLaterComponent],
  entryComponents: [SaveForLaterComponent],
})
export class SaveForLaterModule {}
