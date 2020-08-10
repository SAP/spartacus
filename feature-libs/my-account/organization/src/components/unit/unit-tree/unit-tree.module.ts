import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { UnitTreeComponent } from './unit-tree.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule],
  declarations: [UnitTreeComponent],
  exports: [UnitTreeComponent],
})
export class UnitTreeModule {}
