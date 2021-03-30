import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CloseAccountComponent: {
          component: CloseAccountComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [CloseAccountComponent, CloseAccountModalComponent],
  exports: [CloseAccountComponent, CloseAccountModalComponent],
  entryComponents: [CloseAccountComponent, CloseAccountModalComponent],
})
export class CloseAccountModule {}
