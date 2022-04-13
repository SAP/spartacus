import { NgModule, Type } from '@angular/core';
import { CdcModule } from '@spartacus/cdc';
import { UserProfileModule } from '@spartacus/user/profile';
import { environment } from '../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdc) {
  extensions.push(CdcModule);
}

@NgModule({
  declarations: [],
  imports: [UserProfileModule, ...extensions],
})
export class UserWrapperModule {}
