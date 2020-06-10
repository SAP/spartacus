import { Component } from '@angular/core';
import { FocusConfig } from 'projects/storefrontlib/src/layout';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/index';

@Component({
  selector: 'cx-image-zoom-dialog',
  templateUrl: 'image-zoom-dialog.component.html',
})
export class ImageZoomDialogComponent {
  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(protected launchDialogService: LaunchDialogService) {}

  close(reason = ''): void {
    this.launchDialogService.closeDialog(reason);
  }
}
