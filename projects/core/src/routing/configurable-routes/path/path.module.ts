import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PathPipe } from './path.pipe';
import { DynamicUrlPipe } from './dynamic-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PathPipe, DynamicUrlPipe],
  exports: [PathPipe, DynamicUrlPipe]
})
export class PathModule {}
