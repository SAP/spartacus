import { NgModule } from '@angular/core';
import { CommonComponentsModule } from './components/common-components.module';
import { CommonCoreModule } from './core/common-core.module';

@NgModule({
  imports: [CommonCoreModule, CommonComponentsModule],
})
export class CommonConfiguratorModule {}
