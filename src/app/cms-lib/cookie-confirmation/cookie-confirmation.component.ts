import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '../../data/token.service';
import { CookieMessageComponent } from './cookie-message/cookie-message.component';

@Component({
    selector: 'y-cookie-confirmation',
    templateUrl: './cookie-confirmation.component.html',
    styleUrls: ['./cookie-confirmation.component.scss']
})
export class CookieConfirmationComponent {


    constructor(
        protected clientStorage: TokenService,
        protected snackBar: MatSnackBar
    ) {
        if (!this.clientStorage.isEnabled()) {
            const ref = this.snackBar.open('Do you allow us to store cookies?', 'OK');
            ref.afterDismissed().subscribe(() => {
                this.clientStorage.enable();
            });
            // const ref = this.snackBar.openFromComponent(CookieMessageComponent);
            // ref.instance.snackBarRef = ref;
            // ref.afterDismissed().subscribe((message) => {
            //     console.log('message', message);
            //     this.clientStorage.enable();
            // });
        }
    }

}
