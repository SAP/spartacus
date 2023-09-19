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
import {
  ErrorDialogOptions,
  defaultErrorDialogOptions,
} from '@spartacus/opf/base/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

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

  errorDialogOptions$: Observable<ErrorDialogOptions>;

  protected loading$ = new BehaviorSubject(false);

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.dismissModal('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected cd: ChangeDetectorRef
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

  get isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  ngOnChanges() {
    console.log('onChanges');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ngOnInit() {
    console.log('onInit');

    this.errorDialogOptions$ = this.launchDialogService.data$.pipe(
      map((data: ErrorDialogOptions) => {
        return data ?? defaultErrorDialogOptions;
      })
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  // {
  //   launch: {
  //     CLOSE_ACCOUNT: {
  //       inline: true,
  //       component: CloseAccountModalComponent,
  //       dialogType: DIALOG_TYPE.DIALOG,
  //     },
  //   },
  // };

  // closeAccount() {
  //   this.loading$.next(true);

  //   this.userProfile.close().subscribe({
  //     next: () => {
  //       this.onSuccess();
  //       this.loading$.next(false);
  //     },
  //     error: () => {
  //       this.onError();
  //       this.loading$.next(false);
  //     },
  //   });
  // }
}
