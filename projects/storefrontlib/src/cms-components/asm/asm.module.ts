import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsmComponent } from './asm/asm.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AsmComponent],
  exports: [AsmComponent],
})
export class AsmModule {}
