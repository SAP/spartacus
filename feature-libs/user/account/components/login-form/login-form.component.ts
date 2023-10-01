/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { LoggerService } from '@spartacus/core';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(protected service: LoginFormComponentService) {
    const logger = inject(LoggerService);
    logger.log('Some malicious test log message from LoginFormComponent constructor');
    logger.log('<script>javascript:alert(1)</script>');
    logger.log('<img src=1 href=1 onerror="javascript:alert(1)"></img>');
    logger.log('<IMG SRC=x onload="alert(String.fromCharCode(88,83,83))">');
    logger.log(' <script\x0Ctype="text/javascript">javascript:alert(1);</script>');
    logger.log('<SCRIPT FOR=document EVENT=onreadystatechange>javascript:alert(1)</SCRIPT>');
    logger.log('<script src="javascript:alert(1)">');
    logger.log(' <img src="javascript:alert(1)">');
    logger.log('\'1\' ORDER BY 1--+');
    logger.log('\' 1 AND (SELECT * FROM Users) = 1');	
    logger.log('\'OR 1=1');
    logger.log('\'1\' ORDER BY 3--+\'');
    logger.log('WHERE 1=1 AND 1=0');
    logger.log('or true--');
    logger.log('\'admin\' or 1=1');
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }
}
