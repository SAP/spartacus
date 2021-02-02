import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cx-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  @Input()
  text: string;

  @Input()
  template: TemplateRef<any>;
}
