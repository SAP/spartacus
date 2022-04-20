import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OutletModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, NgbModule, OutletModule.forChild()],
})
export class BundleComponentsModule {}
