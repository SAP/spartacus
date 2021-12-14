import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CxRouterLinkDirective } from './cx-router-link.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CxRouterLinkDirective],
  exports: [CxRouterLinkDirective],
})
export class PreFetchModule {}
