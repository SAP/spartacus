import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginStatusComponent } from './login-status.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [LoginStatusComponent, LoginDialogComponent],
    // bootstrap: [LoginDialogComponent],
    exports: [LoginStatusComponent],
    entryComponents: [LoginDialogComponent]
})
export class LoginStatusModule { }
