import { NgModule } from '@angular/core';
import { IntersectedDirective } from './intersected.directive';
import { IntersectionDirective } from './intersection.directive';

@NgModule({
  declarations: [IntersectionDirective, IntersectedDirective],
  exports: [IntersectionDirective, IntersectedDirective],
})
export class IntersectionModule {}
