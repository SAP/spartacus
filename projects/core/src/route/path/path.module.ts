import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PathPipe } from './path.pipe';
import { DynamicPathPipe } from './dynamic-path.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PathPipe, DynamicPathPipe],
  exports: [PathPipe, DynamicPathPipe]
})
export class PathModule {}
