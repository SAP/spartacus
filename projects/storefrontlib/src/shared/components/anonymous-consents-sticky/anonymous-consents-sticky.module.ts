import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { AnonymousConsentsStickyComponent } from './anonymous-consents-sticky.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IconModule, I18nModule],
  declarations: [AnonymousConsentsStickyComponent],
  exports: [AnonymousConsentsStickyComponent],
})
export class AnonymousConsentsStickyModule {}
