import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link.component';
import { UrlTranslatorModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, RouterModule, UrlTranslatorModule],
  declarations: [LinkComponent],
  exports: [LinkComponent],
  entryComponents: [LinkComponent]
})
export class LinkModule {}
