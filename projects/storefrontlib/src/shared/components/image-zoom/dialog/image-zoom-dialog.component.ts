import { Component, ElementRef, HostListener } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { FocusConfig } from '../../../../layout/a11y/index';
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

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  close(reason = ''): void {
    this.launchDialogService.closeDialog(reason);
  }
}
