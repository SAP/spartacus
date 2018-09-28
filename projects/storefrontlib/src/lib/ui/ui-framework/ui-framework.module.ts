import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import 'hammerjs';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MaterialModule],
  declarations: [],
  exports: [MaterialModule]
})
export class UiFrameworkModule {}
