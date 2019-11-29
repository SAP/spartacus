import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipDirective } from './skip.directive';
import { SkipLinkService } from '../skip-link.service';

@NgModule({
  imports: [CommonModule],
  declarations: [SkipDirective],
  providers: [SkipLinkService],
  exports: [SkipDirective],
})
export class SkipModule {}
