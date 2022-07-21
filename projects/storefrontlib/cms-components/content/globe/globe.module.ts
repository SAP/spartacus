import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobeComponent } from './globe.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GlobeComponent],
  exports: [GlobeComponent],
})
export class GlobeModule {}
