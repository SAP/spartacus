import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmConnector } from './connectors/asm.connector';
import { AsmStoreModule } from './store/asm-store.module';

@NgModule({
  imports: [CommonModule, AsmStoreModule],
  providers: [provideDefaultConfig(defaultAsmConfig), AsmConnector],
})
export class AsmCoreModule {}
