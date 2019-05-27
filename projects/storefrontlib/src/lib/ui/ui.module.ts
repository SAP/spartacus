import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';

@NgModule({
  imports: [CommonModule, PagesModule],
  exports: [PagesModule],
})
export class UiModule {}
