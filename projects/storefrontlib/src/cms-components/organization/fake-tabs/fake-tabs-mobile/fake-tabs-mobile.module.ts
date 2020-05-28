import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FakeTabsMobileComponent } from './fake-tabs-mobile.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [FakeTabsMobileComponent],
  entryComponents: [FakeTabsMobileComponent],
  exports: [FakeTabsMobileComponent],
})
export class FakeTabsMobileModule {}
