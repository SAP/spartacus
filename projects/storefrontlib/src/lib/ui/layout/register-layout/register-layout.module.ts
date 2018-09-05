import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterLayoutComponent } from './register-layout.component';
import { UserModule } from '../../../user/user.module';

@NgModule({
  imports: [CommonModule, UserModule],
  declarations: [RegisterLayoutComponent],
  exports: [RegisterLayoutComponent]
})
export class RegisterLayoutModule {}
