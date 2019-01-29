import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleRefDirective } from './style-ref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [StyleRefDirective],
  exports: [StyleRefDirective]
})
export class StyleRefModule {}
