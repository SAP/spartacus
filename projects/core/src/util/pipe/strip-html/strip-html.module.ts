import { NgModule } from '@angular/core';

import { StripHtmlPipe } from './strip-html.pipe';

@NgModule({
  declarations: [StripHtmlPipe],
  exports: [StripHtmlPipe]
})
export class StripHtmlModule {}
