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
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {
  ErrorDialogOptions,
  defaultErrorDialogOptions,
} from '@spartacus/opf/base/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, combineLatest, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-error-modal',
  templateUrl: './opf-error-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfErrorModalComponent implements OnInit, OnChanges, OnDestroy {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  // source = timer(1).pipe(map((val) => val));
  errorDialogOptions?: ErrorDialogOptions;

  errorDialogOptions$: Observable<{ message: string; confirm: string }>;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.dismissModal('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected cd: ChangeDetectorRef,
    protected translationService: TranslationService
  ) {
    console.log('in constructor');
    // this.cd.markForCheck();
    timer(1).subscribe({
      complete: () => {
        this.cd.markForCheck();
        console.log('complete');
      },
    });

    // EMPTY.pipe(
    //   tap(() => {
    //     this.cd.markForCheck();
    //   })
    // ).subscribe({
    //   complete: () => {
    //     console.log('complete');
    //   },
    // });
  }

  ngOnChanges() {
    console.log('onChanges');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
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
        return this.getTranslations(data);
      })
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected getTranslations(dialogOptions: ErrorDialogOptions) {
    return combineLatest([
      this.getLabelTranslation(
        defaultErrorDialogOptions.messageKey as string,
        dialogOptions.messageString,
        dialogOptions.messageKey,
        dialogOptions.messageReplacements
      ),
      this.getLabelTranslation(
        defaultErrorDialogOptions.confirmKey as string,
        dialogOptions.confirmString,
        dialogOptions.confirmKey,
        dialogOptions.confirmReplacements
      ),
    ]).pipe(
      map((labelArray) => {
        return { message: labelArray[0], confirm: labelArray[1] };
      })
    );
  }

  protected getLabelTranslation(
    defaultKey: string,
    labelString?: string,
    labelKey?: string,
    labelReplacements?: any
  ) {
    let defaultLabel$ = this.translationService.translate(defaultKey);

    if (labelString) {
      return of(labelString);
    } else if (labelKey) {
      let labelFromKey$ = this.translationService
        .translate(labelKey)
        .pipe(switchMap((val) => (val ? of(val) : defaultLabel$)));

      if (labelReplacements) {
        return this.translationService
          .translate(labelKey, labelReplacements)
          .pipe(switchMap((val) => (val ? of(val) : labelFromKey$)));
      } else {
        return labelFromKey$;
      }
    } else {
      return defaultLabel$;
    }
  }
}
