import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { CostCenterDetailsCellComponent } from './cost-center-details-cell.component';

@NgModule({
  imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
  declarations: [CostCenterDetailsCellComponent],
  exports: [CostCenterDetailsCellComponent],
})
export class CostCenterDetailsCellModule {}
