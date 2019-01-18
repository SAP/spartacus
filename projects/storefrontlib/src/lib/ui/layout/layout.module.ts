import { NgModule } from '@angular/core';

import { OutletRefModule } from '../../outlet/index';

import { PageTemplateModule } from './page-template/page-template.module';
import { MainModule } from './main/main.module';

const layoutModules = [PageTemplateModule, OutletRefModule];

@NgModule({
  imports: [MainModule, ...layoutModules],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
