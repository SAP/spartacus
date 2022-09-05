import { NgModule } from '@angular/core';
import { CdsMerchandisingStrategyAdapter } from './adapters';
import { MerchandisingCarouselCmsModule } from './cms-components';
import { MerchandisingStrategyAdapter } from './connectors';

@NgModule({
  imports: [MerchandisingCarouselCmsModule],
  providers: [
    {
      provide: MerchandisingStrategyAdapter,
      useClass: CdsMerchandisingStrategyAdapter,
    },
  ],
})
export class MerchandisingModule {}
