import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultQualtricsConfig } from './config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics.component';

/**
 * @deprecated since 3.1 - moved to feature-lib
 * Please take a look at https://sap.github.io/spartacus-docs/qualtrics-integration/#page-title
 * to see how to migrate into the new feature-lib.
 * Do not import from the storefront. Instead import from the qualtrics feature-lib.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [QualtricsComponent],
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
