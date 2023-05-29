import { Injectable } from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {
  CdcConsentManagementService,
} from '@spartacus/cdc/root';
import { AnonymousConsentsService, ConsentTemplate } from '@spartacus/core';
import { RegisterFormService } from '@spartacus/user/profile/components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CdcRegisterFormService extends RegisterFormService {
  constructor(
    protected cdcConsentManagementService: CdcConsentManagementService,
    protected fb: UntypedFormBuilder,
    protected anonymousConsentsService: AnonymousConsentsService,
  ) {
    super(fb);
    this.cdcConsentManagementService.persistCdcSiteConsents();
  }
  generateConsentsFormControl(): UntypedFormArray {
    var cdcRequiredConsents: string[] =  this.cdcConsentManagementService.getCdcRequiredConsents();
    var consentArray = this.fb.array([]);
    for (let consent of cdcRequiredConsents) {
      let element: any = {};
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
    var cdcRequiredConsents: string[] =  this.cdcConsentManagementService.getCdcRequiredConsents();
    return this.anonymousConsentsService.getTemplates().pipe(
      map((templates) => {
        var returnConsents: {
          template: ConsentTemplate;
          required: boolean;
        }[] = [];
        var returnConsent: any = {};
        for (let template of templates) {
          if (template.id && cdcRequiredConsents.includes(template.id)) {
            returnConsent = {};
            returnConsent['template'] = template;
            returnConsent['required'] = true;
            returnConsents.push(returnConsent);
          }
        }
        return returnConsents;
      })
    );
  }
}
