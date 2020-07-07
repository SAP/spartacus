import { NgModule } from '@angular/core';
import { CpqComponentsModule } from './components/cpq-components.module';
import { CpqCoreModule } from './core/cpq-core.module';

@NgModule({
  imports: [CpqCoreModule, CpqComponentsModule],
})
export class CpqConfiguratorModule {}
