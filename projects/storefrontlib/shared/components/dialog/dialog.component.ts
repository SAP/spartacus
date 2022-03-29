import { Component, ElementRef, HostListener } from '@angular/core';
import { LaunchDialogService } from '../../../layout/launch-dialog';

@Component({
  template: '',
})
export abstract class DialogComponent {
  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as Element).tagName === this.el.nativeElement.tagName) {
      this.close('Outside click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
