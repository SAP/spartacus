import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, FlexLayoutModule],
  declarations: [],
  exports: [FlexLayoutModule]
})
export class UiFrameworkModule {}
