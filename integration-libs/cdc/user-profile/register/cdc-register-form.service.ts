/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { CdcConsentManagementService } from '@spartacus/cdc/root';
import { AnonymousConsentsService, ConsentTemplate } from '@spartacus/core';
import { RegisterFormService } from '@spartacus/user/profile/components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CdcRegisterFormService extends RegisterFormService {
  constructor(
    protected cdcConsentManagementService: CdcConsentManagementService,
    protected fb: UntypedFormBuilder,
    protected anonymousConsentsService: AnonymousConsentsService
  ) {
    super(fb);
  }

  generateConsentsFormControl(): UntypedFormArray {
    const cdcActiveConsents: string[] =
      this.cdcConsentManagementService.getCdcConsentIDs();
    const consentArray = this.fb.array([]);
    for (const consent of cdcActiveConsents) {
      const element: any = {};
      element[consent] = new FormControl(false, [Validators.requiredTrue]);
      consentArray.push(this.fb.group(element));
    }
    return consentArray;
  }

  loadExtraRegistrationConsents(): Observable<
    {
      template: ConsentTemplate;
      required: boolean;
    }[]
  > {
    const cdcActiveConsents: string[] =
      this.cdcConsentManagementService.getCdcConsentIDs();
    return this.anonymousConsentsService.getTemplates().pipe(
      map((templates) => {
        let returnConsents: {
          template: ConsentTemplate;
          required: boolean;
        }[] = [];
        if (templates && templates.length > 0) {
          for (const template of templates) {
            if (template.id && cdcActiveConsents.includes(template.id)) {
              let returnConsent: any = {};
              returnConsent['template'] = template;
              returnConsent['required'] = true;
              returnConsents.push(returnConsent);
            }
          }
        }
        return returnConsents;
      })
    );
  }
}
