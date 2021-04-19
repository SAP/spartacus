import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-configuration-conflict-and-error-messages',
  templateUrl: './configurator-conflict-and-error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictAndErrorMessagesComponent {
  iconTypes = ICON_TYPE;
  configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  showWarnings = false;

  toggleWarnings(): void {
    this.showWarnings = !this.showWarnings;
  }

  showErrors = false;

  toggleErrors(): void {
    this.showErrors = !this.showErrors;
  }
  /**
   * Prevents page down behaviour when users press space key
   *
   * @param {KeyboardEvent} event - Keyboard event
   */
  preventScrollingOnSpace(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }

  /**
   * Fired on key board events, checks for 'enter' or 'space' and delegates to click for warning messages.
   *
   * @param {KeyboardEvent} event - Keyboard event
   */
  clickOnEnterAndSpaceWarning(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.toggleWarnings();
    }
  }

  /**
   * Fired on key board events, checks for 'enter' or 'space' and delegates to click for error messages.
   *
   * @param {KeyboardEvent} event - Keyboard event
   */
  clickOnEnterAndSpaceError(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.toggleErrors();
    }
  }

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
