import { NgModule, Type } from '@angular/core';
import { CDCUserAccountModule } from '@spartacus/cdc/components/login';
import { UserAccountModule } from '@spartacus/user/account';

import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdc) {
  extensions.push(CDCUserAccountModule);
}

@NgModule({
  imports: [UserAccountModule, ...extensions],
})
export class UserAccountWrapperModule {}
