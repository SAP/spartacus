import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsConfig, Config, provideDefaultConfig } from '@spartacus/core';
import { defaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsComponent } from './qualtrics.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [QualtricsComponent],
  entryComponents: [QualtricsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QualtricsComponent: {
          component: QualtricsComponent,
        },
      },
    }),
    provideDefaultConfig(defaultQualtricsConfig),

    {
      provide: QualtricsConfig,
      useExisting: Config,
    },
  ],
})
export class QualtricsModule {}
