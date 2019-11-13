import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmRootComponent } from './asm-root/asm-root.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, AsmLoaderModule],
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
    AsmRootComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
  ],
  entryComponents: [AsmRootComponent],
})
export class AsmModule {}
