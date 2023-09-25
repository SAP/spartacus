/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { ErrorDialogOptions } from '@spartacus/opf/base/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OpfErrorModalService } from './opf-error-modal.service';

@Component({
  selector: 'cx-opf-error-modal',
  templateUrl: './opf-error-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfErrorModalComponent implements OnInit {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  errorDialogOptions$: Observable<{ message: string; confirm: string }>;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.dismissModal('Backdrop click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected cd: ChangeDetectorRef,
    protected opfErrorModalService: OpfErrorModalService
  ) {
    timer(1).subscribe({
      complete: () => {
        this.cd.markForCheck();
        console.log('complete');
      },
    });
  }

  ngOnInit() {
    console.log('onInit');

    // if errorOptions includes messageString and confirmString:
    //      modal will show un-translated strings
    //      for main message and confirm button
    // if errorOptions includes messageKey, confirmKey which match
    // the keys for localized strings within the upscale language-pack:
    //      modal will show translated strings
    //      for main message and confirm button
    // NOTE: merchant can also provide an array of replacements for
    //      language-pack translations via messageReplacements and
    //      confirmReplacements
    // if errorOptions is undefined:
    //      modal will show the default payment error message

    //  messageString = await this.translationService.translate(defaultErrorDialogOptions.messageString as string).toPromise(),
    //  confirmString =  this.translationService.translate(defaultErrorDialogOptions.confirmString as string),

    this.errorDialogOptions$ = this.launchDialogService.data$.pipe(
      switchMap((data: ErrorDialogOptions) => {
        return this.opfErrorModalService.getMessageAndConfirmTranslations(data);
      })
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
