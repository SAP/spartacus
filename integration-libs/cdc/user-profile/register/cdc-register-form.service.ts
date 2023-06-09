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

@Injectable({ providedIn: 'root' })
export class CdcRegisterFormService extends RegisterFormService {
  constructor(
    protected cdcConsentManagementService: CdcConsentManagementService,
    protected fb: UntypedFormBuilder,
    protected anonymousConsentsService: AnonymousConsentsService
  ) {
    super(fb);
  }

  fetchCdcConsentsForRegistration(): ConsentTemplate[] {
    const consentList: ConsentTemplate[] = [];
    const cdcActiveConsents: string[] =
      this.cdcConsentManagementService.getCdcConsentIDs();
    this.anonymousConsentsService.getTemplates().subscribe((templates) => {
      if (templates && templates.length > 0) {
        for (const template of templates) {
          if (template.id && cdcActiveConsents.includes(template.id)) {
            //fetch consents that exist in commerce and is active in cdc
            consentList.push(template);
          }
        }
      }
    });
    return consentList;
  }

  generateConsentsFormControl(): UntypedFormArray {
    const consentArray = this.fb.array([]);
    const templates: ConsentTemplate[] = this.fetchCdcConsentsForRegistration();
    for (const _template of templates) {
      consentArray.push(new FormControl(false, [Validators.requiredTrue]));
    }
    return consentArray;
  }

  loadExtraRegistrationConsents(): {
    template: ConsentTemplate;
    required: boolean;
  }[] {
    const templates: ConsentTemplate[] = this.fetchCdcConsentsForRegistration();
    const returnConsents: {
      template: ConsentTemplate;
      required: boolean;
    }[] = [];
    for (const template of templates) {
      const returnConsent: any = {};
      returnConsent['template'] = template;
      returnConsent['required'] = true;
      returnConsents.push(returnConsent);
    }
    return returnConsents;
  }
}
