import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabListDirective } from './tab-list.directive';
import { TabDirective } from './tab.directive';

const directives = [TabListDirective, TabDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
})
export class TabModule {}
