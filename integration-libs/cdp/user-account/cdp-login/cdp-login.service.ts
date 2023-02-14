import { Injectable } from '@angular/core';
import { LoginComponentService } from '@spartacus/user/account/components';

@Injectable({
  providedIn: 'root'
})
export class CdpLoginService extends LoginComponentService {

  constructor() {super();}

}
