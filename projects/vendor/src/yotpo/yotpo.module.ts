import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotpo-review.component';
import { YotpostarratingComponent } from './yotpostarrating/yotpo-star-rating.component';
import { YotpoConfig } from './yotpoconfig/yotpo-config';
import { defaultYotpoConfig } from './yotpoconfig/default-yotpo-config';

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultYotpoConfig)],
  exports: [YotporeviewComponent, YotpostarratingComponent],
  declarations: [YotporeviewComponent, YotpostarratingComponent],
  providers: [{ provide: YotpoConfig, useExisting: Config }],
})
export class YotpoModule {}
