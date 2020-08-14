import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { OutletRefModule } from '@spartacus/storefront';
import { TableDataLinkComponent } from './td-link.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, OutletRefModule],
  declarations: [TableDataLinkComponent],
  exports: [TableDataLinkComponent],
})
export class TableDataLinkModule {}
