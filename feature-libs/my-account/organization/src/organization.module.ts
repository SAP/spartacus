import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterModule } from './cost-center/cost-center.module';

@NgModule({
  imports: [CommonModule, CostCenterModule],
})
export class OrganizationModule {}
