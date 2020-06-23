import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FakeTabsComponent } from './fake-tabs.component';
import { FakeTabsDesktopModule } from './fake-tabs-desktop/fake-tabs-desktop.module';
import { FakeTabsMobileModule } from './fake-tabs-mobile/fake-tabs-mobile.module';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    FakeTabsDesktopModule,
    FakeTabsMobileModule,
  ],
  declarations: [FakeTabsComponent],
  entryComponents: [FakeTabsComponent],
  exports: [FakeTabsComponent],
})
export class FakeTabsModule {}
