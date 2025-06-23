import { NgModule } from '@angular/core';
import { ProvideLcpContextDirective } from './provide-lcp-context.directive';

@NgModule({
  declarations: [ProvideLcpContextDirective],
  exports: [ProvideLcpContextDirective],
})
export class ProvideLcpContextDirectiveModule {}
