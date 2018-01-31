import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OccUserService } from '../occ/occ-core/user.service';
import { UserModelService } from './user-model.service';
import { TokenService } from './token.service';
import { SiteContextService } from './site-context.service';

@Injectable()
export class UserLoaderService {

    constructor(
        protected tokenService: TokenService,
        protected occUserService: OccUserService,
        protected userModelService: UserModelService,
        protected siteLoader: SiteContextService
    ) {
        this.initUser();
    }

    initUser() {
        // loads the user datails whenever we have a token
        this.tokenService.getUserToken().subscribe(tokenData => {
            if (tokenData) {
                this.loadUser(tokenData);
            } else {
                this.userModelService.storeUser(null);
            }
        });
    }

    private setUser(tokenData) {
        this.tokenService.storeUserToken(tokenData);
        this.userModelService.storeToken(tokenData);
    }

    login(username: string, password: string): Observable<any> {
        const token = this.occUserService.loadToken(username, password);
        token.subscribe((tokenData) => {
            if (tokenData) {
                // extend token data with user name
                tokenData.username = username;
                this.setUser(tokenData);
                this.refreshCmsDataAfterUserChange();
            }
        },
        error => console.log(error),
        () => {
                // this.rememberUser(username);
                // TODO: refresh CMS data as it can change based on user restrictions
        });

        return token;
    }

    logout() {
        this.tokenService.clearTokens();
        this.refreshCmsDataAfterUserChange();
    }

    loadUser(tokenData) {
        this.occUserService.loadUser(tokenData.username)
            .subscribe(userData => {
                this.userModelService.storeUser(userData);
            }
        );
    }

    // refresh CMS data as it can change based on user restrictions
    protected refreshCmsDataAfterUserChange() {
        this.siteLoader.updateSiteContext();
    }

    // /**
    //  * @desc Checks if there's a Authentication token is available and if the token is still valid
    //  *
    //  * @returns boolean true if there is a valid token available
    //  *
    //  * @memberOf AuthService
    //  */
    // private hasValidToken() {
    //     let isValid = false;
    //     let storedAuthData = localStorage.getItem(this.LAST_AUTH_KEY);

    //     if (storedAuthData) {
    //         let authData = JSON.parse(storedAuthData);
    //         let c = new Date(authData.created);
    //         c.setSeconds(c.getSeconds() + authData.token.expires_in );
    //         isValid = (c >= new Date());
    //         if (!isValid) {
    //             console.debug('Token expired');
    //         }
    //     }
    //     if (!isValid) {
    //         localStorage.removeItem(this.LAST_AUTH_KEY);
    //     }
    //     return isValid;
    // }

}
