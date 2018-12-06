import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StylingDirective } from './styling.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [StylingDirective],
  exports: [StylingDirective]
})
export class StylingModule {}
