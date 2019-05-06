import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '../../layout/layout.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  imports: [CommonModule, LayoutModule, PagesModule],
  exports: [LayoutModule, PagesModule],
})
export class UiModule {}
