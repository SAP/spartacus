import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';

@NgModule({
  imports: [RouterModule, UnitLevelOrderHistoryModule],
})
export class UnitOrderComponentsModule {}
