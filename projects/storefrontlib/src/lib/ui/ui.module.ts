import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  imports: [CommonModule, LayoutModule, PagesModule]
})
export class UiModule {}
