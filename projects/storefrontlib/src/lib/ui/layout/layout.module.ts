import { NgModule } from '@angular/core';

import { OutletRefModule } from '../../outlet/index';

import { MainModule } from './main/main.module';

const layoutModules = [OutletRefModule];

@NgModule({
  imports: [MainModule, ...layoutModules],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
