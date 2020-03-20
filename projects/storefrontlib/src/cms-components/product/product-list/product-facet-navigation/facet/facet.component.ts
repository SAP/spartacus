import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { ICON_TYPE } from 'projects/storefrontlib/src/cms-components/misc';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacetCollapseState, FacetService } from '../facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FacetComponent {
  facet: Facet;

  state$: Observable<FacetCollapseState>;

  expandedIcon = ICON_TYPE.EXPAND;

  @Input() expandIcon: ICON_TYPE = ICON_TYPE.EXPAND;
  @Input() collapseIcon: ICON_TYPE = ICON_TYPE.COLLAPSE;

  @HostBinding('class.expanded') isExpanded: boolean;
  @HostBinding('class.multi-select') isMultiSelect: boolean;

  @Input('facet') protected set handleFacet(value: Facet) {
    this.isMultiSelect = value.multiSelect;
    this.facet = value;

    const state$ = this.facetService.getState(value, true);
    // should not be needed, but somehow tabbing into the observable below doesn't work first time...
    this.isExpanded = state$.value.expanded;

    this.state$ = state$.pipe(
      tap(state => {
        this.isExpanded = state.expanded;
      })
    );
  }

  @Input() @HostBinding('attr.class') class: string;

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef<HTMLElement>
  ) {}

  /**
   * Handles clicking the heading of the facet group, which means toggling the visibility
   * of the group (collapse / expand) and optionally focusing the group.
   */
  toggleGroup(event: UIEvent) {
    const host: HTMLElement = this.elementRef.nativeElement;
    const isLocked = host.classList.contains('is-locked');

    if (!isLocked || this.isExpanded) {
      this.facetService.toggleGroup(this.facet, false);
      host.focus();
      event.stopPropagation();
    } else {
      this.facetService.toggleGroup(this.facet, true);
    }
  }

  increaseCount(facetValues: HTMLElement[]): void {
    this.facetService.increaseVisible(this.facet);

    facetValues[0].focus();
  }

  decreaseCount(): void {
    this.facetService.decreaseVisible(this.facet);
  }

  getLinkParams(value: FacetValue) {
    return this.facetService.getLinkParams(value.query.query.value);
  }

  // clickValueHandler(_value: FacetValue, event?: MouseEvent): void {
  //   if (event) {
  //     event.stopPropagation();
  //   }
  //   this.facetService.storeFocus(this.facet);
  // }

  // getIndex(state: FacetCollapseState): number {
  //   return state.focussed ? 0 : -1;
  // }

  // private handleFocus() {
  //   // if (this.facetService.focussed && this.facetService.focussed.value) {
  //   //   console.log('focus now', this.facet.name, this.facetService.focussed);
  //   //   const values = this.values.toArray();
  //   //   const value = this.facetService.focussed.value;
  //   //   const index = values.findIndex(el => {
  //   //     return (el.nativeElement as HTMLElement).innerText.includes(value);
  //   //   });
  //   //   console.log('add focus for', index, value);
  //   //   if (index > -1 && values.length > 0) {
  //   //     values[index].nativeElement.focus();
  //   //   }
  //   // }
  // }
}

// @ViewChildren('facetValue') values: QueryList<ElementRef<HTMLElement>>;

// @ViewChildren('facetValue') set content(
//   content: QueryList<ElementRef<HTMLElement>>
// ) {
//   this.handleFocus();
// }

// @ViewChildren('tabindex')
// protected tabindex: QueryList<ElementRef<HTMLElement>>;

// @ViewChildren('tabindex') set a11y(
//   content: QueryList<ElementRef<HTMLElement>>
// ) {
//   console.log(content);
// }

// @HostListener('click', ['$event'])
// @HostListener('keydown.enter', ['$event'])
// protected onEvent = () => {
//   // force the first value to be opened
//   // this.facetService.storeFocus(this.facet);
//   this.facetService.toggleGroup(this.facet, true);

//   // this.values.toArray()[0].nativeElement.focus();
// };

// @HostListener('keydown.arrowdown', ['$event'])
// protected onKeydown = (event: MouseEvent) => {
//   this.facetService.storeFocus(this.facet, 1);
//   event.preventDefault();
//   event.stopPropagation();
// };

// @HostListener('keydown.arrowup', ['$event'])
// protected onKeyup = (event: MouseEvent) => {
//   this.facetService.storeFocus(this.facet, -1);
//   event.preventDefault();
//   event.stopPropagation();
// };

// @HostListener('focus')
// protected onFocus = () => this.facetService.clearFocus();

// @HostListener('keydown.escape', ['$event'])
// protected onEscape = (ev: MouseEvent) =>
//   (ev.target as HTMLElement).parentElement.focus();
