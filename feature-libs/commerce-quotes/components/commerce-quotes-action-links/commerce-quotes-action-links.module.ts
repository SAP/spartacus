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

/**
 * TODO: Think about the way how component can be initialised,
 * should does it be separate CMS Component and render it on the page
 * by using CMS mapping?
 *
 * Or render action links directly in any components template by
 * using component's selector name.
 */
export class CommerceQuotesActionLinksModule {}
