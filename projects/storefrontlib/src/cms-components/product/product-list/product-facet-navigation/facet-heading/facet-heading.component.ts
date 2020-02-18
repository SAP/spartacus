import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';
import { FacetCollapseState, FacetService } from '../facet.service';

@Component({
  selector: 'cx-facet-heading',
  templateUrl: './facet-heading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetHeadingComponent {
  @Input() facet: Facet;

  @HostBinding('tabindex') tabindex = 0;

  icons = ICON_TYPE;

  //   aria-controls=""
  //   [attr.aria-expanded]="state.collapsed"

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onEvent(event: MouseEvent) {
    this.facetService.toggleGroup(this.facet);
    // we'll stop event bubbling to ensure that
    // the space key will not force a scroll down
    event.preventDefault();
  }

  constructor(private facetService: FacetService) {}

  get state(): BehaviorSubject<FacetCollapseState> {
    return this.facetService.getState(this.facet);
  }
}
