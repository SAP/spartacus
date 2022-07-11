import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CommerceQuotesActionLinksComponent } from './commerce-quotes-action-links.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, UrlModule],
  declarations: [CommerceQuotesActionLinksComponent],
  exports: [CommerceQuotesActionLinksComponent],
})
export class CommerceQuotesActionLinksModule {}
