import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlPipe } from './url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [UrlPipe],
  exports: [UrlPipe],
})
export class UrlModule {}
