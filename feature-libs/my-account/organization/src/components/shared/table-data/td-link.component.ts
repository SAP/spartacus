import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-td-link',
  templateUrl: './td-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataLinkComponent {
  @Input() prop;

  @Input() cxRoute: string;

  @Input() outlet: string;

  @Input() tabIndex = -1;

  @Input() template: TemplateRef<any>;

  constructor() {}

  getProperty(model) {
    if (!this.prop) {
      return null;
    }

    const props = this.prop.split('.');

    let m = model;
    props.forEach((prop) => {
      m = m[prop];
    });

    return m;
  }
}
