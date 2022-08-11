import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { SubListModule } from '../../../../shared/sub-list/sub-list.module';
import { LinkCellComponent } from './link-cell.component';
import { UnitAddressListComponent } from './unit-address-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, UrlModule, SubListModule],
  declarations: [UnitAddressListComponent, LinkCellComponent],
})
export class UnitAddressListModule {}
