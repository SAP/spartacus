import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginStatusComponent } from './login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  declarations: [LoginStatusComponent, LoginDialogComponent],
  exports: [LoginStatusComponent],
  entryComponents: [LoginDialogComponent]
})
export class LoginStatusModule { }
