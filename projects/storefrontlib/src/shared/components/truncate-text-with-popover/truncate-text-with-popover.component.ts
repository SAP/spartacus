import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cx-truncate-text-with-popover',
  templateUrl: './truncate-text-with-popover.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TruncateTextWithPopoverComponent {
  /**
   * String to be rendered inside popover wrapper component.
   */
  @Input() content: string;

  /**
   * Maximum length of the string to be rendered as static.
   */
  @Input() maxLength: number = 100;
}
