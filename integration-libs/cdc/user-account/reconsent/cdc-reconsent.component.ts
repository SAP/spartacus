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
import {  map } from 'rxjs/operators';
import { CdcReconsentService } from './cdc-reconsent.service';

@Component({
  selector: 'cx-cdc-reconsent-dialog',
  templateUrl: './cdc-reconsent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdcReconsentComponent implements OnInit, OnDestroy {
  onConsentChange(event: { given: boolean; template: ConsentTemplate }) {
    if (event.given === false && event.template?.id) {
      let index: number = this.updateList.indexOf(event.template.id);
      if (index !== -1) {
        this.updateList.splice(index, 1);
      }
    } else if (event.given === true && event.template?.id) {
      this.updateList.push(event.template.id);
    }
    if (this.totalConsents === this.updateList.length) this.submit = false;
    else this.submit = true;
  }
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected cdcJsService: CdcJsService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected cdcReconsentService: CdcReconsentService
  ) {}
  protected subscription = new Subscription();
  iconTypes = ICON_TYPE;
  templateList$: Observable<ConsentTemplate[]>;
  updateList: string[] = []; // will contain consent IDs that needs to be saved
  loaded$: Observable<boolean> = of(false);
  form: UntypedFormGroup = new UntypedFormGroup({});
  errorMessage: string = '';
  submit: boolean = true;
  totalConsents: number = 0;
  user: string;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.user = data.user;
        this.errorMessage = data.errorMessage;
        this.init(data.consentIds);
      })
    );
  }
  init(reconsentIds: string[]): void {
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
  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
    if (reason === 'Proceed To Login') {
      this.save();
    } else {
      let response = {
        status: 'FAIL',
        errorMessage: this.errorMessage,
      };
      this.cdcJsService.handleLoginError(response);
    }
  }
  save(): void {
    this.cdcReconsentService.saveConsent(this.updateList,this.user);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
