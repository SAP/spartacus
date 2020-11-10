import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { OutletModule } from '../../outlet/outlet.module';
import { PageLayoutComponent } from './page-layout.component';
import { PageTemplateDirective } from './page-template.directive';

@NgModule({
  imports: [CommonModule, OutletModule, PageSlotModule],
  declarations: [PageLayoutComponent, PageTemplateDirective],
  exports: [PageLayoutComponent, PageTemplateDirective],
})
export class PageLayoutModule {}
