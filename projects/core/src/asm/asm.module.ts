import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, ConfigModule } from '../config/config.module';
import { AsmConfig } from './config/asm-config';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmStoreModule } from './store/asm-store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AsmStoreModule,
    ConfigModule.withConfig(defaultAsmConfig),
  ],
})
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [{ provide: AsmConfig, useExisting: Config }],
    };
  }
}
