import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AnonymousConsentsConfig,
  AuthService,
  CmsNavigationComponent,
} from '@spartacus/core';
import { Observable } from 'rxjs';
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
    protected componentData: CmsComponentData<CmsNavigationComponent>,
    protected service: NavigationService,
    protected config: AnonymousConsentsConfig,
    protected authService: AuthService,
    protected modalService: ModalService
  ) {}

  get showConsentPreferences(): Observable<boolean> {
    return this.authService
      .isUserLoggedIn()
      .pipe(
        map(
          isUserLoggedIn =>
            !isUserLoggedIn && this.config.anonymousConsents.footerLink
        )
      );
  }

  openDialog(): void {
    this.modalService.open(AnonymousConsentsDialogComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }
}
