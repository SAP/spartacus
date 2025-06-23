import { NgModule } from '@angular/core';
import { ProvideLcpContextForCmsDirective } from './provide-lcp-context-for-cms.directive';

@NgModule({
  declarations: [ProvideLcpContextForCmsDirective],
  exports: [ProvideLcpContextForCmsDirective],
})
export class ProvideLcpContextForCmsDirectiveModule {}
