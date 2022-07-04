import { NgModule } from '@angular/core';
import { CommerceQuotesListModule } from './commerce-quotes-list/commerce-quotes-list.module';
import { CommerceQuotesDetailsOverviewModule } from './details/overview/commerce-quotes-details-overview.module';

@NgModule({
  imports: [CommerceQuotesListModule, CommerceQuotesDetailsOverviewModule],
})
export class CommerceQuotesComponentsModule {}
