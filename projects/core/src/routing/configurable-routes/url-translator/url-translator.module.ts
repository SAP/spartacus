import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateUrlPipe } from './translate-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TranslateUrlPipe],
  exports: [TranslateUrlPipe]
})
export class UrlTranslatorModule {}
