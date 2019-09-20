import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ToConfigurationComponent } from './to-configuration.component';

@NgModule({
  imports: [RouterModule, I18nModule],
  declarations: [ToConfigurationComponent],
  entryComponents: [ToConfigurationComponent],
  exports: [ToConfigurationComponent],
})
export class ToConfigurationModule {}
