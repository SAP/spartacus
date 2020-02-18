import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacetCollapseState, FacetService } from '../facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetComponent {
  facet: Facet;

  @HostBinding('class.expanded') isExpanded: boolean;
  @HostBinding('class.multi-select') isMultiSelect: boolean;

  @Input('facet') set facetFn(value: Facet) {
    this.isMultiSelect = value.multiSelect;
    this.facet = value;

    // should not be needed, but somehow tabbing into the observable below doesn't work first time...
    this.isExpanded = !this.facetService.getState(value, true).value
      .collapseGroup;

    this.state$ = this.facetService.getState(value, true).pipe(
      tap(state => {
        this.isExpanded = !state.collapseGroup;
      })
    );
  }

  state$: Observable<FacetCollapseState>;

  constructor(private facetService: FacetService) {}

  increaseCount(): void {
    this.facetService.increaseVisible(this.facet);
  }

  decreaseCount(): void {
    this.facetService.decreaseVisible(this.facet);
  }

  getLinkParams(value: FacetValue) {
    return this.facetService.getLinkParams(value.query.query.value);
  }
}
