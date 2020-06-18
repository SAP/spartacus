import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitComponent } from './split/split.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [SplitComponent, ViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [SplitComponent, ViewComponent],
})
export class SplitViewModule {}
