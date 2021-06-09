import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../../../shared/card/card.module';
import { UnitAddressDetailsComponent } from './unit-address-details.component';
import { DeleteItemModule } from '../../../../shared/detail/delete-item-action/delete-item.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    DeleteItemModule,
    KeyboardFocusModule,
  ],
  declarations: [UnitAddressDetailsComponent],
})
export class UnitAddressDetailsModule {}
