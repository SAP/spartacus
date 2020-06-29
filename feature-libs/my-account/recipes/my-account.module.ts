import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyModule } from './company.module';

@NgModule({
  imports: [CommonModule, CompanyModule],
})
export class MyAccountModule {}
