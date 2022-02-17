import { NgModule } from '@angular/core';
import { BindAttributesDirective } from './bind-attributes.directive';

@NgModule({
  declarations: [BindAttributesDirective],
  exports: [BindAttributesDirective],
})
export class BindAttributesModule {}
