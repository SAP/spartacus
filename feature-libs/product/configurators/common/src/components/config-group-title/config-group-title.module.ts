import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigGroupTitleComponent } from './config-group-title.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ConfigGroupTitleComponent],
  exports: [ConfigGroupTitleComponent],
  entryComponents: [ConfigGroupTitleComponent],
})
export class ConfigGroupTitleModule {}
