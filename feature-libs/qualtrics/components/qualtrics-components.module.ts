import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { QualtricsEmbeddedFeedbackComponent } from './qualtrics-embedded-feedback/qualtrics-embedded-feedback.component';
import { defaultQualtricsConfig } from './qualtrics-loader/config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics-loader/qualtrics.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QualtricsEmbeddedFeedbackComponent: {
          component: QualtricsEmbeddedFeedbackComponent,
        },
        QualtricsComponent: {
          component: QualtricsComponent,
        },
      },
    }),
    provideDefaultConfig(defaultQualtricsConfig),
  ],
  declarations: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
  exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
})
export class QualtricsComponentsModule {}
