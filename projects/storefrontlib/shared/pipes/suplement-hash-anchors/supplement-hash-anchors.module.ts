import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplementHashAnchorsPipe } from './supplement-hash-anchors.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SupplementHashAnchorsPipe],
  exports: [SupplementHashAnchorsPipe],
})
export class SupplementHashAnchorsModule {}
