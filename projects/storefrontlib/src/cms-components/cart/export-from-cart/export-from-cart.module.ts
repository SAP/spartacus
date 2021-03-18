import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ExportFromCartComponent } from './export-from-cart.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ExportFromCartComponent: {
          component: ExportFromCartComponent,
        },
      },
    }),
  ],
  declarations: [ExportFromCartComponent],
  exports: [ExportFromCartComponent],
  entryComponents: [ExportFromCartComponent],
})
export class ExportFromCartModule {}
