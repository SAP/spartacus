import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmComponent } from './asm/asm.component';

@NgModule({
  declarations: [AsmComponent],
  imports: [CommonModule],
  exports: [AsmComponent],
})
export class AsmModule {}
