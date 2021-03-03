import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { UnitDetailsComponent } from './unit-details.component';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { IconModule } from '@spartacus/storefront';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
    KeyboardFocusModule,
    IconModule,
    DisableInfoModule,
  ],
  declarations: [UnitDetailsComponent],
  exports: [UnitDetailsComponent],
})
export class UnitDetailsModule {}
