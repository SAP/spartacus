import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { defaultDirectionConfig } from './direction/default-direction.config';
import { HtmlDirProvider } from './direction/direction.provider';
import { LaunchDialogModule } from './launch-dialog/index';

@NgModule({
  imports: [OutletRefModule, LaunchDialogModule.forRoot()],
  exports: [OutletRefModule],
  providers: [HtmlDirProvider, provideDefaultConfig(defaultDirectionConfig)],
})
export class LayoutModule {}
