import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AsmModule as AsmCoreModule,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import { LaunchConfig } from '../../layout/launch-dialog/index';
import { AsmLoaderModule } from './asm-loader.module';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';

export const defaultAsmLaunchConfig: LaunchConfig = {
  launch: {
    ASM: {
      default: {
        outlet: 'cx-storefront',
        component: AsmMainUiComponent,
      },
    },
  },
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    AsmCoreModule.forRoot(),
    AsmLoaderModule,
  ],
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
  ],
  providers: [provideConfig(defaultAsmLaunchConfig)],
  entryComponents: [AsmMainUiComponent],
})
export class AsmModule {}
