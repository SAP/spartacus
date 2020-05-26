import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FakeTabsDesktopComponent } from './fake-tabs-desktop.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, RouterModule],
  declarations: [FakeTabsDesktopComponent],
  entryComponents: [FakeTabsDesktopComponent],
  exports: [FakeTabsDesktopComponent],
})
export class FakeTabsDesktopModule {}
