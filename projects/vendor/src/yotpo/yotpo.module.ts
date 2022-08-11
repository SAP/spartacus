import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotpo-review.component';
import { YotpostarratingComponent } from './yotpostarrating/yotpo-star-rating.component';
import { defaultYotpoConfig } from './yotpoconfig/default-yotpo-config';

@NgModule({
  imports: [CommonModule],
  exports: [YotporeviewComponent, YotpostarratingComponent],
  declarations: [YotporeviewComponent, YotpostarratingComponent],
  providers: [provideDefaultConfig(defaultYotpoConfig)],
})
export class YotpoModule {}
