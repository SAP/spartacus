/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResellService } from '@spartacus/cart/base/core';
import { ImageGroup, Product } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-resell',
  templateUrl: './resell-details.component.html',
})
export class ResellDetailsComponent implements OnInit {
  @Input() product: Product;
  @Input() orderCode: string;
  @Input() orderEntry: number;

  @Output() nextStep = new EventEmitter<string>();

  form = new FormGroup({
    condition: new FormControl('3000', Validators.required),
    price: new FormControl(0, Validators.required),
    postageOrDeliveryOption: new FormControl('FLAT', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  conditions = [
    { code: '1000', name: 'New' },
    // { code: '2750', name: 'Like New' },
    { code: '3000', name: 'Used' },
    { code: '4000', name: 'Very Good' },
    { code: '5000', name: 'Good' },
    { code: '6000', name: 'Acceptable' },
  ];

  postageOrDeliveryOption = [
    { code: 'COLLECT', name: 'Collection' },
    { code: 'FLAT', name: 'Delivery £5' },
  ];

  constructor(protected resellService: ResellService) {
    // Intentional empty constructor
  }

  ngOnInit(): void {
    this.form.get('title')?.setValue(this.product.name ?? '');
    this.form
      .get('price')
      ?.setValue(+((this.product.price?.value ?? 0) * 0.8).toFixed(2));
    this.form.get('description')?.setValue(this.product.summary ?? '');
  }

  submit() {
    const images: string[] = [];
    if (this.product.images) {
      images.push(
        (this.product.images['PRIMARY'] as ImageGroup)['product'].url ?? ''
      );
    }

    this.resellService
      .loadStockLevels({
        code: this.product.code ?? '',
        orderCode: this.orderCode,
        orderEntry: this.orderEntry,
        title: this.form.get('title')?.value ?? '',
        brand: this.product.manufacturer ?? '',
        model: this.product.name ?? '',
        condition: this.form.get('condition')?.value ?? '3000',
        price: this.form.get('price')?.value ?? 0,
        description: this.form.get('description')?.value ?? '',
        deliveryOption: {
          type: this.form.get('postageOrDeliveryOption')?.value ?? 'FLAT',
          price:
            this.form.get('postageOrDeliveryOption')?.value === 'COLLECT'
              ? 0
              : 5,
        },
        images,
      })
      .pipe(
        catchError((_err) => of({ itemId: 'somecode' })),
        tap((response) => this.nextStep.emit(response.itemId))
      )
      .subscribe();
    return false;
  }
}
