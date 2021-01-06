import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics.component';

/**
 * @deprecated since 3.1 - moved to feature-lib
 */
@NgModule({
  imports: [CommonModule],
  declarations: [QualtricsComponent],
  entryComponents: [QualtricsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        aa: {
          component: QualtricsComponent,
        },
      },
    }),
    provideDefaultConfig(defaultQualtricsConfig),
  ],
})
export class QualtricsModule {}
