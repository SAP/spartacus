import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { I18nModule } from '@spartacus/core';
=======
import { AsmModule as AsmCoreModule, I18nModule } from '@spartacus/core';
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
import { AsmLoaderModule } from './asm-loader.module';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
<<<<<<< HEAD
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, AsmLoaderModule],
=======

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    AsmCoreModule.forRoot(),
    AsmLoaderModule,
  ],
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
  ],
  entryComponents: [AsmMainUiComponent],
})
export class AsmModule {}
