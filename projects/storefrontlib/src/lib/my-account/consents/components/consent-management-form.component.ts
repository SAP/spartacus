import { Component } from '@angular/core';
import { ConsentTemplateList } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
  styleUrls: ['./consent-management-form.component.scss'],
})
export class ConsentManagementFormComponent {
  consents$: Observable<ConsentTemplateList>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor() {}
}
