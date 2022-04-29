import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '../../misc/icon/icon.module';
import { PDFComponent } from './pdf.component';

@NgModule({
  imports: [CommonModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PDFDocumentComponent: {
          component: PDFComponent,
        },
      },
    }),
  ],
  declarations: [PDFComponent],
  exports: [PDFComponent],
})
export class PDFModule {}
