import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AnonymousConsentsService, ConsentTemplate } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { CdcJsService } from '../../root/service';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdcReconsentService } from './cdc-reconsent.service';

@Component({
  selector: 'cx-anonymous-consent-dialog',
  templateUrl: './cdc-reconsent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdcReconsentComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  form: UntypedFormGroup = new UntypedFormGroup({});
  iconTypes = ICON_TYPE;
  loaded$: Observable<boolean> = of(false);

  templateList$: Observable<ConsentTemplate[]>;
  reconsentEvent: any = {};

  selectedConsents: string[] = [];
  disableSubmitButton: boolean = true;
  totalConsents: number = 0;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected cdcJsService: CdcJsService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected cdcReconsentService: CdcReconsentService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.reconsentEvent['user'] = data.user;
        this.reconsentEvent['password'] = data.password;
        this.reconsentEvent['regToken'] = data.regToken;
        this.reconsentEvent['errorMessage'] = data.errorMessage;
        this.loadConsents(data.consentIds);
      })
    );
  }

  loadConsents(reconsentIds: string[]): void {
    this.templateList$ = this.anonymousConsentsService.getTemplates(true).pipe(
      map((templateList) => {
        var output: ConsentTemplate[] = [];
        templateList.forEach((template) => {
          if (template.id && reconsentIds.includes(template.id)) {
            output.push(template);
          }
        });
        this.totalConsents = output.length;
        return output;
      })
    );
    this.loaded$ = of(true);
  }

  onConsentChange(event: { given: boolean; template: ConsentTemplate }) {
    if (event.given === false && event.template?.id) {
      let index: number = this.selectedConsents.indexOf(event.template.id);
      if (index !== -1) {
        this.selectedConsents.splice(index, 1);
      }
    } else if (event.given === true && event.template?.id) {
      this.selectedConsents.push(event.template.id);
    }
    if (this.totalConsents === this.selectedConsents.length)
      this.disableSubmitButton = false;
    else this.disableSubmitButton = true;
  }

  dismissDialog(reason?: any, message?: string): void {
    if (reason === 'Proceed To Login') {
      this.loaded$ = of(false);
      this.cdcReconsentService.saveReconsent(
        this.selectedConsents,
        this.reconsentEvent
      );
    } else {
      this.launchDialogService.closeDialog(reason);
      let response = {
        status: 'FAIL',
        errorMessage: message,
      };
      this.cdcJsService.handleLoginError(response);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
