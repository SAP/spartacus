import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfigAttributeHeaderComponent } from './config-attribute-header.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
    NgSelectModule,
  ],
  declarations: [ConfigAttributeHeaderComponent],
  exports: [ConfigAttributeHeaderComponent],
  entryComponents: [ConfigAttributeHeaderComponent],
})
export class ConfigAttributeHeaderModule {}
