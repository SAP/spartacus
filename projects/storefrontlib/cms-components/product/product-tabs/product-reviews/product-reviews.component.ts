/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  aiSentiments,
  isNotNullable,
  Product,
  ProductReviewService,
  Review,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CustomFormValidators } from '../../../../shared/index';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviewsComponent {
  @ViewChild('titleInput', { static: false }) titleInput: ElementRef;
  @ViewChild('writeReviewButton', { static: false })
  writeReviewButton: ElementRef;

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

  private resetReviewForm(): void {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [null, CustomFormValidators.starRatingEmpty],
      reviewerName: '',
    });
  }
  aiSentiment$ = this.reviews$.pipe(
    filter(isNotNullable),
    map((reviews) => reviews ?? []),
    distinctUntilChanged(),
    switchMap((reviews) => {
      return this.reviewService.getOverallReview(reviews, 'sentiments').pipe(
        map((sentiments) => {
          let sentimentArray =
            sentiments?.choices[0]?.message?.content.split('\n');
          let resp: aiSentiments = { positive: [], negative: [], neutral: [] };
          sentimentArray.forEach((senti: string) => {
            if (senti.includes('Positive:')) {
              let x = this.getString(senti, true);
              if (x) resp.positive?.push(x);
            } else if (senti.includes('Negative:')) {
              let x = this.getString(senti, false);
              if (x) resp.negative?.push(x);
            } else {
              resp.neutral?.push(senti);
            }
          });
          return resp;
        })
      );
    })
  );

  getString(input: string, positive: boolean): string | undefined {
    let x: string | undefined;
    if (positive) x = input.split('Positive: ').pop();
    else x = input.split('Negative: ').pop();
    return x;
  }
  aiSummary$ = this.reviews$.pipe(
    filter(isNotNullable),
    map((reviews) => reviews ?? []),
    distinctUntilChanged(),
    switchMap((reviews) =>
      this.reviewService.getOverallReview(reviews, 'summary')
    )
  );
}
