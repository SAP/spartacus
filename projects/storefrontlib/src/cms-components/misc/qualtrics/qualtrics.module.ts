import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsConfig, Config, ConfigModule } from '@spartacus/core';
import { defaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsComponent } from './qualtrics.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        QualtricsComponent: {
          component: QualtricsComponent,
        },
      },
    }),
    ConfigModule.withConfig(defaultQualtricsConfig),
  ],
  declarations: [QualtricsComponent],
  entryComponents: [QualtricsComponent],
  providers: [
    {
      provide: QualtricsConfig,
      useExisting: Config,
    },
  ],
})
export class QualtricsModule {}
