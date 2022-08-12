import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';

@NgModule({
  imports: [RouterModule, UnitLevelOrderHistoryModule],
})
export class UnitOrderComponentsModule {}
