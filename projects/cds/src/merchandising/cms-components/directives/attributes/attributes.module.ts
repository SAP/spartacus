import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributesDirective } from './attributes.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AttributesDirective],
  exports: [AttributesDirective],
})
export class AttributesModule {}
