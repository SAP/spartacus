import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cx-td-link',
  templateUrl: './td-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataLinkComponent {
  @Input() prop;

  @Input() cxRoute: string;

  @Input() outlet: string;

  /**
   * The tabIndex is used to render a tabindex attribute on the anchor link.
   *
   * Defaults to `-1`.
   */
  @Input() tabIndex = -1;

  @Input() template: TemplateRef<any>;

  getProperty(model) {
    if (!this.prop || !model) {
      return null;
    }

    const props = this.prop.split('.');

    let m = model;
    props.forEach((prop) => {
      m = m?.[prop];
    });

    return m;
  }
}
