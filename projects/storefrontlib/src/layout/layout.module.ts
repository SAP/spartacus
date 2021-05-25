import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { defaultLayoutConfig } from './config/default-layout.config';
import { DirectionModule } from './direction/direction.module';
import { LaunchDialogModule } from './launch-dialog/index';
import { ThemeModule } from './theme/theme.module';

@NgModule({
  imports: [
    OutletRefModule,
    LaunchDialogModule.forRoot(),
    DirectionModule,
    ThemeModule,
  ],
  providers: [provideConfig(defaultLayoutConfig)],
  exports: [OutletRefModule],
})
export class LayoutModule {}
