import { Component } from '@angular/core';
import { MdSnackBarRef } from '@angular/material';

const message = 'cookie messages, bla, bla, bla...';

@Component({
    selector: 'y-cookie-message',
    templateUrl: './cookie-message.component.html',
    styleUrls: ['./cookie-message.component.scss']
})
export class CookieMessageComponent {

    snackBarRef: MdSnackBarRef<CookieMessageComponent>;

    dismiss(): void {
        this.snackBarRef.dismiss();
    }

}
