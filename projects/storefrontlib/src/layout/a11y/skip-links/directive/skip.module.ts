import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipDirective } from './skip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SkipDirective],
  exports: [SkipDirective],
})
export class SkipModule {}
