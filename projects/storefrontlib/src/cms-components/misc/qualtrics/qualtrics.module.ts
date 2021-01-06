import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultQualtricsConfig as deprecatedDefaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsComponent as DeprecatedQualtricsComponent } from './qualtrics.component';

/**
 * @deprecated since 3.1 - moved to feature-lib
 */
@NgModule({
  imports: [CommonModule],
  declarations: [DeprecatedQualtricsComponent],
  entryComponents: [DeprecatedQualtricsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QualtricsComponent: {
          component: DeprecatedQualtricsComponent,
        },
      },
    }),
    provideDefaultConfig(deprecatedDefaultQualtricsConfig),
  ],
})
export class QualtricsModule {}
