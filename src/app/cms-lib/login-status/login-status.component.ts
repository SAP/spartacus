import { Component, ChangeDetectorRef } from '@angular/core';
import { ConfigService } from '../../cms/config.service';
import { MdDialog } from '@angular/material';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';
import { CmsModelService } from '../../data/cms-model.service';

import { UserLoaderService } from '../../data/user-loader.service';
import { UserModelService } from '../../data/user-model.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
    selector: 'y-login-status',
    templateUrl: './login-status.component.html',
    styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent extends AbstractCmsComponent {

    user;

    constructor(
        protected cd: ChangeDetectorRef,
        protected configService: ConfigService,
        protected cmsModelService: CmsModelService,
        protected userModel: UserModelService,
        protected userLoader: UserLoaderService,
        protected dialog: MdDialog
    ) {
        super(cd, configService, cmsModelService);

        this.userModel.getUser().subscribe((userData) => {
            this.user = userData;
        });
    }

    openLogin() {
        const dialogRef = this.dialog.open(LoginDialogComponent);
    }

    logout() {
        this.userLoader.logout();
    }

}
