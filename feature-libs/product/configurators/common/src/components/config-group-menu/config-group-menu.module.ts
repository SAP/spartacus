import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfigGroupMenuComponent } from './config-group-menu.component';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [ConfigGroupMenuComponent],
  exports: [ConfigGroupMenuComponent],
  entryComponents: [ConfigGroupMenuComponent],
})
export class ConfigGroupMenuModule {}
