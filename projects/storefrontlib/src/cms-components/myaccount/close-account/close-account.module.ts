import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CloseAccountComponent: { selector: 'cx-close-account' },
      },
    }),
  ],
  declarations: [CloseAccountComponent, CloseAccountModalComponent],
  exports: [CloseAccountComponent],
  entryComponents: [CloseAccountComponent, CloseAccountModalComponent],
})
export class CloseAccountModule {}
