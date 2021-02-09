import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cx-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements OnInit {
  /**
   * Template or string to be rendered inside popover wrapper component.
   */
  @Input() content: string | TemplateRef<any>;

  /**
   * Flag which indicates if passed content is a TemplateRef or string.
   */
  isTemplate: boolean;

  ngOnInit(): void {
    this.isTemplate = this.content instanceof TemplateRef;
  }
}
