import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

const message = 'cookie messages, bla, bla, bla...';

@Component({
    selector: 'y-cookie-message',
    templateUrl: './cookie-message.component.html',
    styleUrls: ['./cookie-message.component.scss']
})
export class CookieMessageComponent {

    snackBarRef: MatSnackBarRef<CookieMessageComponent>;

    dismiss(): void {
        this.snackBarRef.dismiss();
    }

}
