import { NgModule } from '@angular/core';
import { GetLcpContextDirective } from './lcp-context-getter.directive';
import { LcpContextDirective } from './lcp-context.directive';

@NgModule({
  declarations: [LcpContextDirective, GetLcpContextDirective],
  exports: [LcpContextDirective, GetLcpContextDirective],
})
export class LcpContextDirectiveModule {}
