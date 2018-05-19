import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConfirmationComponent } from './cookie-confirmation.component';
import { MaterialModule} from '../../material.module';
import { CookieMessageComponent } from './cookie-message/cookie-message.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [CookieConfirmationComponent, CookieMessageComponent],
    entryComponents: [CookieConfirmationComponent, CookieMessageComponent],
    exports: [CookieConfirmationComponent]
})
export class CookieConfirmationModule { }
