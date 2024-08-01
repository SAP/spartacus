import { Injectable } from "@angular/core";
import { ResetPasswordComponentService } from "@spartacus/user/profile/components";

@Injectable()
export class CdcResetPasswordComponentService extends ResetPasswordComponentService{
  tokenName = 'pwrt';
}
