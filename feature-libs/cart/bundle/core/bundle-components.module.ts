import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OutletModule } from '@spartacus/storefront';
import { BundleMainModule } from '../components/bundle-main';

@NgModule({
  imports: [BundleMainModule, CommonModule, NgbModule, OutletModule.forChild()],
})
export class BundleComponentsModule {}
