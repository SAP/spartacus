import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics.component';

@NgModule({
  imports: [CommonModule],
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
  ],
})
export class QualtricsModule {}
