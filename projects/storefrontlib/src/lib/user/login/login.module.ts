import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserModule, UrlTranslationModule } from '@spartacus/core';
import { CmsModule } from '../../cms/cms.module';
import { BootstrapModule } from '../../bootstrap.module';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CmsModule,
    BootstrapModule,
    UserModule,
    UrlTranslationModule,
    PageSlotModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
