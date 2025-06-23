import { NgModule } from '@angular/core';
import { GetLcpContextDirective } from './get-lcp-context.directive';
import { LcpContextDirective } from './lcp-context.directive';

@NgModule({
  declarations: [LcpContextDirective, GetLcpContextDirective],
  exports: [LcpContextDirective, GetLcpContextDirective],
})
export class LcpContextDirectiveModule {}
