import { NgModule } from '@angular/core';
import { EscGroupDirective } from './esc-group.directive';
import { TabindexDirective } from './tab-index.directive';

@NgModule({
  declarations: [EscGroupDirective, TabindexDirective],
  exports: [EscGroupDirective, TabindexDirective],
})
export class TabIndexModule {}
