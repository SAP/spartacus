import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-confirm-quote-request-dialog.component',
  templateUrl: './confirm-quote-request-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmQuoteRequestDialogComponent {
  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected config: CQConfig
  ) {}

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
