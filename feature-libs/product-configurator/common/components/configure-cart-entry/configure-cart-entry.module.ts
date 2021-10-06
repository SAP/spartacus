import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, ModalModule } from '@spartacus/storefront';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    RouterModule,
    ModalModule,
  ],
  declarations: [ConfigureCartEntryComponent],
  exports: [ConfigureCartEntryComponent],
})
export class ConfigureCartEntryModule {}
