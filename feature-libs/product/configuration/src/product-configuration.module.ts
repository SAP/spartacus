import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XxxComponent } from './xxx/xxx.component';
@NgModule({
  imports: [CommonModule],
  declarations: [XxxComponent],
  exports: [XxxComponent],
})
export class ProductConfigurationModule {}
