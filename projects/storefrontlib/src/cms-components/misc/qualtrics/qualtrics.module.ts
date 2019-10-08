import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
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
  ],
  declarations: [QualtricsComponent],
  entryComponents: [QualtricsComponent],
})
export class QualtricsComponentModule {}
