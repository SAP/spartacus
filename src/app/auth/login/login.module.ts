import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
  declarations: [LoginComponent, LoginDialogComponent],
  exports: [LoginComponent],
  entryComponents: [LoginDialogComponent]
})
export class LoginModule {}
