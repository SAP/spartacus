import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  entry$: Observable<any>;
  cart$: Observable<any>;
  loaded$: Observable<boolean>;

  quantity = 0;
  previousLoaded: boolean;
  finishedLoading: boolean;

  subscription: Subscription;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.subscription = this.loaded$.subscribe(loaded => {
      if (this.previousLoaded !== loaded) {
        this.finishedLoading = this.previousLoaded === false;
        this.previousLoaded = loaded;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.finishedLoading) {
      this.finishedLoading = false;
      const elementToFocus = this.dialog.nativeElement.querySelector(
        `[ngbAutofocus]`
      ) as HTMLElement;
      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
