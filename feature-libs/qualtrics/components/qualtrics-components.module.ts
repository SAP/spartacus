import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { QualtricsEmbeddedFeedbackComponent } from './qualtrics-embedded-feedback/qualtrics-embedded-feedback.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QualtricsEmbeddedFeedbackComponent: {
          component: QualtricsEmbeddedFeedbackComponent,
        },
      },
    }),
  ],
  declarations: [QualtricsEmbeddedFeedbackComponent],
  exports: [QualtricsEmbeddedFeedbackComponent],
  entryComponents: [QualtricsEmbeddedFeedbackComponent],
})
export class QualtricsComponentsModule {
  constructor() {
    console.log('qualtrics components module');
  }
}
