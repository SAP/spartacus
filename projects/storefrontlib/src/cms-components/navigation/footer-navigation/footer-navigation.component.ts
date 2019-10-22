import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AnonymousConsentsConfig,
  ANONYMOUS_CONSENTS_FEATURE,
  AuthService,
  CmsNavigationComponent,
  isFeatureEnabled,
} from '@spartacus/core';
import { iif, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { AnonymousConsentsDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consents-dialog.component';
import { ModalService } from '../../../shared/components/modal/index';
import { NavigationNode } from '../navigation/navigation-node.model';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'cx-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterNavigationComponent {
  node$: Observable<NavigationNode> = this.service.getNavigationNode(
    this.componentData.data$
  );

  styleClass$: Observable<string> = this.componentData.data$.pipe(
    map(d => d.styleClass)
  );

  data$ = this.componentData.data$;

  constructor(
    componentData: CmsComponentData<CmsNavigationComponent>,
    service: NavigationService,
    anonymousConsentsConfig: AnonymousConsentsConfig,
    authService: AuthService,
    modalService: ModalService
  );

  /**
   * @deprecated since version 1.3
   * Instead, use:
   * 
    ```ts
      constructor(
      componentData: CmsComponentData<CmsNavigationComponent>,
      service: NavigationService,
      anonymousConsentsConfig: AnonymousConsentsConfig,
      authService: AuthService,
      modalService: ModalService
    )
    ```
   */
  constructor(
    componentData: CmsComponentData<CmsNavigationComponent>,
    service: NavigationService
  );
  constructor(
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService,
    protected anonymousConsentsConfig?: AnonymousConsentsConfig,
    protected authService?: AuthService,
    protected modalService?: ModalService
  ) {}

  get showConsentPreferences(): Observable<boolean> {
    return iif(
      () =>
        Boolean(this.anonymousConsentsConfig) &&
        isFeatureEnabled(
          this.anonymousConsentsConfig,
          ANONYMOUS_CONSENTS_FEATURE
        ),
      this.authService
        .isUserLoggedIn()
        .pipe(
          map(
            isUserLoggedIn =>
              !isUserLoggedIn &&
              Boolean(this.anonymousConsentsConfig.anonymousConsents) &&
              this.anonymousConsentsConfig.anonymousConsents.footerLink
          )
        ),
      of(false)
    );
  }

  openDialog(): void {
    if (
      Boolean(this.anonymousConsentsConfig) &&
      isFeatureEnabled(this.anonymousConsentsConfig, ANONYMOUS_CONSENTS_FEATURE)
    ) {
      this.modalService.open(AnonymousConsentsDialogComponent, {
        centered: true,
        size: 'lg',
      });
    }
  }
}
