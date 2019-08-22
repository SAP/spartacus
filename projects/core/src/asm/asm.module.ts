import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AsmServices } from './services/index';
import { AsmStoreModule } from './store/asm-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, AsmStoreModule],
})
export class AsmModule {
  static forRoot(): ModuleWithProviders<AsmModule> {
    return {
      ngModule: AsmModule,
      providers: [...AsmServices],
    };
  }
}
