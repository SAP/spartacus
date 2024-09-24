/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SAPCDCScreenSetService } from '@spartacus/cdc/root';

import { LanguageService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSSAPCDCScreenSetComponent } from 'integration-libs/cdc/core/models/mcs-cms.model';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-gigya-raas',
  templateUrl: './sapcdcscreen-set.component.html',
  styleUrls: ['./sapcdcscreen-set.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SAPCDCScreenSetComponent implements OnInit {
  protected renderScreenSet = true;
  language$: Observable<string>;
  jsError$: Observable<boolean>;
  jsLoaded$:Promise<boolean>;

  public constructor(
    public component: CmsComponentData<CMSSAPCDCScreenSetComponent>,
    private languageService: LanguageService,
    private winRef: WindowRef,
    private cdcJSService: SAPCDCScreenSetService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
   this.jsLoaded$ = this.cdcJSService.loadCdcConfig();
    this.language$ = this.languageService.getActive().pipe(
      distinctUntilChanged(),
      // On language change we want to rerender CDC screen with proper translations
      tap(() => (this.renderScreenSet = true))
    );
  }

  /**
   * Display screen set in embed mode
   *
   * @param data - CMSSAPCDCScreenSetComponent
   * @param lang - language
   */
  displayScreenSet(data: CMSSAPCDCScreenSetComponent, lang: string): void {
    if (this.renderScreenSet) {
      this.showScreenSet(data, lang);
    }
    this.renderScreenSet = false;
  }

  /**
   * Show screen set
   *
   * @param data - CMSSAPCDCScreenSetComponent
   * @param lang - language
   */
  showScreenSet(data: CMSSAPCDCScreenSetComponent, lang: string) {
    let shouldLogout = false; // Initialize a flag outside the event handlers
  
    (this.winRef.nativeWindow as { [key: string]: any })?.['gigya']?.accounts?.showScreenSet({
      screenSet: data.screenSet,
      startScreen: data.startScreen,
      lang: lang,
      containerID: data.containerID,
      onSubmit:(...params: any[])=>{
          const formData = params[0]?.formModel;
          if (formData && 'newPassword' in formData) {
            // Set the flag to true instead of logging out immediately
            shouldLogout = true;
          }
      },
  
      onAfterSubmit: (...params: any[]) => {
        this.zone.run(() => {
          // Handle profile update response
          this.cdcJSService.handleProfileUpdateResponse(...params);
  
          // Check the flag and log out the user if needed
          if (shouldLogout) {
            this.cdcJSService.logoutUser();
          }
        });
      },
    });
  }
  

}
