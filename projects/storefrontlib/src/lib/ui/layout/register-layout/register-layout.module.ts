import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterLayoutComponent } from './register-layout.component';
import { UserComponentModule } from '../../../user/user.module';

@NgModule({
  imports: [CommonModule, UserComponentModule],
  declarations: [RegisterLayoutComponent],
  exports: [RegisterLayoutComponent]
})
export class RegisterLayoutModule {}
