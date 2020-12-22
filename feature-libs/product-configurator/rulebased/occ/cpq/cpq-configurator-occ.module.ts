import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { defaultOccCpqConfiguratorConfigFactory } from './default-occ-cpq-configurator-config';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfigFactory(defaultOccCpqConfiguratorConfigFactory),
  ],
})
export class CpqConfiguratorOccModule {}
