import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalMessageComponentModule } from './cms-components';
import {
  OutletModule,
  OutletRefModule,
  PageLayoutModule,
  PageSlotModule,
  PwaModule,
  RoutingModule,
  SeoModule,
} from './cms-structure';
import { KeyboardFocusModule, LayoutModule, SkipLinkModule } from './layout';
import { MediaModule } from './shared';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    OutletModule,
    OutletRefModule,
    PwaModule,
    PageLayoutModule,
    SeoModule,
    PageSlotModule,
    SkipLinkModule,
    KeyboardFocusModule,
    LayoutModule,
    RoutingModule.forRoot(),
    MediaModule.forRoot(),
    OutletModule.forRoot(),
  ],
})
export class BaseUiModule {}
