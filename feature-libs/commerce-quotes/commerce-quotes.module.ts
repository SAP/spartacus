import { NgModule } from '@angular/core';
import { CommerceQuotesComponentsModule } from './components/commerce-quotes-components.module';
import { CommerceQuotesCoreModule } from './core/commerce-quotes-core.module';

@NgModule({
  imports: [CommerceQuotesCoreModule, CommerceQuotesComponentsModule],
})
export class CommerceQuotesModule {}
