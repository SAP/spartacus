import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfigAttributeFooterComponent } from './config-attribute-footer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
  ],
  declarations: [ConfigAttributeFooterComponent],
  exports: [ConfigAttributeFooterComponent],
  entryComponents: [ConfigAttributeFooterComponent],
})
export class ConfigAttributeFooterModule {}
