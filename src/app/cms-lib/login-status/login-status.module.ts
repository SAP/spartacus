import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { LoginStatusComponent } from './login-status.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [LoginStatusComponent, LoginDialogComponent],
    exports: [LoginStatusComponent],
    entryComponents: [LoginDialogComponent]
})
export class LoginStatusModule { }
