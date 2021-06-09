import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cx-truncate-text-popover',
  templateUrl: './truncate-text-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TruncateTextPopoverComponent {
  /**
   * String to be rendered inside popover wrapper component.
   */
  @Input() content: string;

  /**
   * The maximum length of the characters after which the text will be truncated
   */
  @Input() charactersLimit: number = 100;

  get isTruncated(): boolean {
    return this.content.length > +this.charactersLimit;
  }
}
