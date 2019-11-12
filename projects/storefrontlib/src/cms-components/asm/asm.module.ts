import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmLoaderModule } from './loader/asm-loader.module';
import { AsmUiModule } from './ui/asm-ui.module';
@NgModule({
  imports: [CommonModule, AsmLoaderModule, AsmUiModule],
})
export class AsmModule {}
