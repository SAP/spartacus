import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterModule } from '@spartacus/my-account/cost-center';

@NgModule({
  imports: [CommonModule, CostCenterModule],
})
export class CompanyModule {}
