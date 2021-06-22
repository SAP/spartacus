import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from './components/quick-order-components.module';
import { QuickOrderCoreModule } from './core/quick-order-core.module';
import { QuickOrderOccModule } from './occ/quick-order-occ.module';

@NgModule({
  imports: [
    QuickOrderCoreModule.forRoot(),
    QuickOrderOccModule,
    QuickOrderComponentsModule,
  ],
})
export class QuickOrderModule {}
