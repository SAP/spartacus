/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  CxDatePipe,
  FeatureDirective,
  isNotNullable,
  Product,
  ProductReviewService,
  Review,
  TranslatePipe,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { FormErrorsComponent } from '../../../../shared/components/form/form-errors/form-errors.component';
import { FormRequiredAsterisksComponent } from '../../../../shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormRequiredLegendComponent } from '../../../../shared/components/form/form-required-legend/form-required-legend.component';
import { ReadMoreComponent } from '../../../../shared/components/read-more/read-more.component';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    StarRatingComponent,
    NgFor,
    FeatureDirective,
    ReadMoreComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    AsyncPipe,
    SlicePipe,
    TranslatePipe,
    CxDatePipe,
  ],
})
export class ProductReviewsComponent {
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  @ViewChild('writeReviewButton', { static: false })
  writeReviewButton: ElementRef;
  @ViewChildren('reviewItem') reviewItems: QueryList<ElementRef<HTMLElement>>;

  @Input() maxLengthReviewTitle = 255;
  @Input() maxLengthReviewComment = 2200;
  @Input() maxLengthReviewerName = 64;
  isWritingReview = false;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems: number;
  reviewForm: UntypedFormGroup;

  product$: Observable<Product | null> =
    this.currentProductService.getProduct();

  reviews$: Observable<Review[]> = this.product$.pipe(
    filter(isNotNullable),
    map((p) => p.code ?? ''),
    distinctUntilChanged(),
    switchMap((productCode) =>
      this.reviewService.getByProductCode(productCode)
    ),
    tap(() => {
      this.resetReviewForm();
      this.maxListItems = this.initialMaxListItems;
    })
  );

  constructor(
    protected reviewService: ProductReviewService,
    protected currentProductService: CurrentProductService,
    private fb: UntypedFormBuilder,
    protected cd: ChangeDetectorRef
  ) {}

  initiateWriteReview(): void {
    this.isWritingReview = true;

    this.cd.detectChanges();

    if (this.titleInput && this.titleInput.nativeElement) {
      this.titleInput.nativeElement.focus();
    }
  }

  cancelWriteReview(): void {
    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  setRating(rating: number): void {
    this.reviewForm.controls.rating.setValue(rating);
  }

  submitReview(product: Product) {
    if (this.reviewForm.valid) {
      this.addReview(product);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  addReview(product: Product): void {
    const reviewFormControls = this.reviewForm.controls;
    const review: Review = {
      headline: reviewFormControls.title.value,
      comment: reviewFormControls.comment.value,
      rating: reviewFormControls.rating.value,
      alias: reviewFormControls.reviewerName.value,
    };

    this.reviewService.add(product.code ?? '', review);

    this.isWritingReview = false;
    this.resetReviewForm();

    this.cd.detectChanges();

    if (this.writeReviewButton && this.writeReviewButton.nativeElement) {
      this.writeReviewButton.nativeElement.focus();
    }
  }

  focusNextReview(event: UIEvent, currentIndex: number): void {
    event.preventDefault();
    const items = this.reviewItems.toArray();
    const nextIndex =
      currentIndex + 1 < items.length ? currentIndex + 1 : currentIndex;
    items[nextIndex]?.nativeElement.focus();
  }

  focusPreviousReview(event: UIEvent, currentIndex: number): void {
    event.preventDefault();
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    this.reviewItems.toArray()[prevIndex]?.nativeElement.focus();
  }

  private resetReviewForm(): void {
    this.reviewForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(this.maxLengthReviewTitle)],
      ],
      comment: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.maxLengthReviewComment),
        ],
      ],
      rating: [null, Validators.required],
      reviewerName: ['', Validators.maxLength(this.maxLengthReviewerName)],
    });
  }
}
