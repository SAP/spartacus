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
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isNotNullable, Product, ProductReviewService, Review, FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CurrentProductService } from '../../current-product.service';
import { FormErrorsComponent } from '../../../../shared/components/form/form-errors/form-errors.component';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { NgIf, NgFor, NgTemplateOutlet, AsyncPipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'cx-product-reviews',
    templateUrl: './product-reviews.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        StarRatingComponent,
        NgFor,
        FeaturesConfigModule,
        FormsModule,
        ReactiveFormsModule,
        NgTemplateOutlet,
        FormErrorsComponent,
        AsyncPipe,
        SlicePipe,
        I18nModule,
    ],
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
      rating: [null, Validators.required],
      reviewerName: '',
    });
  }
}
