import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmStoreModule } from './store/asm-store.module';
import { interceptors } from './http-interceptors/index';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CommonModule, AsmStoreModule],
})
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [...interceptors, provideDefaultConfig(defaultAsmConfig)],
    };
  }
}
