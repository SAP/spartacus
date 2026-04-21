/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Address,
  CardType,
  ConverterService,
  LoggerService,
  OccEndpointsService,
  OccUserPaymentAdapter,
  PaymentDetails,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

interface OpfSapPaymentMethod {
  code?: string;
  name?: string;
}

interface OpfSetDefaultPaymentPayload extends PaymentDetails {
  sapPaymentMethod?: OpfSapPaymentMethod;
}

/** Returns undefined for blank/empty strings so they are omitted from the payload. */
function cleanStr(value?: string): string | undefined {
  return value && value.trim() ? value : undefined;
}

@Injectable()
export class OccOpfTokenisationUserPaymentAdapter extends OccUserPaymentAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected override http: HttpClient,
    protected override occEndpoints: OccEndpointsService,
    protected override converter: ConverterService
  ) {
    super(http, occEndpoints, converter);
  }

  override setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('paymentDetail', {
      urlParams: { userId, paymentDetailId: paymentMethodID },
    });
    const headers = new HttpHeaders({ ...CONTENT_TYPE_JSON_HEADER });

    return this.loadAll(userId).pipe(
      map(
        (paymentMethods) =>
          (paymentMethods.find(
            ({ id }) => id === paymentMethodID
          ) as OpfSetDefaultPaymentPayload | undefined) ?? {
            id: paymentMethodID,
          }
      ),
      switchMap((paymentDetails) =>
        this.http.patch(
          url,
          this.buildSetDefaultPayload(paymentDetails, paymentMethodID),
          { headers }
        )
      ),
      catchError((error: any) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  protected buildSetDefaultPayload(
    paymentDetails: OpfSetDefaultPaymentPayload,
    paymentMethodID: string
  ): OpfSetDefaultPaymentPayload {
    const payload: OpfSetDefaultPaymentPayload = {
      id: paymentMethodID,
      defaultPayment: true,
    };

    const accountHolderName = cleanStr(paymentDetails.accountHolderName);
    if (accountHolderName !== undefined) {
      payload.accountHolderName = accountHolderName;
    }

    const cardType = this.mapCardType(paymentDetails.cardType);
    if (cardType !== undefined) {
      payload.cardType = cardType;
    }

    const cardNumber = cleanStr(paymentDetails.cardNumber);
    if (cardNumber !== undefined) {
      payload.cardNumber = cardNumber;
    }

    const expiryMonth = cleanStr(paymentDetails.expiryMonth);
    if (expiryMonth !== undefined) {
      payload.expiryMonth = expiryMonth;
    }

    const expiryYear = cleanStr(paymentDetails.expiryYear);
    if (expiryYear !== undefined) {
      payload.expiryYear = expiryYear;
    }

    const startMonth = cleanStr(paymentDetails.startMonth);
    if (startMonth !== undefined) {
      payload.startMonth = startMonth;
    }

    const startYear = cleanStr(paymentDetails.startYear);
    if (startYear !== undefined) {
      payload.startYear = startYear;
    }

    const issueNumber = cleanStr(paymentDetails.issueNumber);
    if (issueNumber !== undefined) {
      payload.issueNumber = issueNumber;
    }

    const subscriptionId = cleanStr(paymentDetails.subscriptionId);
    if (subscriptionId !== undefined) {
      payload.subscriptionId = subscriptionId;
    }

    if (paymentDetails.saved !== undefined) {
      payload.saved = paymentDetails.saved;
    }

    const billingAddress = this.mapBillingAddress(paymentDetails.billingAddress);
    if (billingAddress !== undefined) {
      payload.billingAddress = billingAddress;
    }

    const sapPaymentMethod = this.mapSapPaymentMethod(
      paymentDetails.sapPaymentMethod
    );
    if (sapPaymentMethod !== undefined) {
      payload.sapPaymentMethod = sapPaymentMethod;
    }

    return payload;
  }

  protected mapCardType(cardType?: CardType): CardType | undefined {
    const code = cleanStr(cardType?.code);
    const name = cleanStr(cardType?.name);
    if (code === undefined && name === undefined) {
      return undefined;
    }
    return { code, name };
  }

  protected mapSapPaymentMethod(
    sapPaymentMethod?: OpfSapPaymentMethod
  ): OpfSapPaymentMethod | undefined {
    const code = cleanStr(sapPaymentMethod?.code);
    const name = cleanStr(sapPaymentMethod?.name);
    if (code === undefined && name === undefined) {
      return undefined;
    }
    return { code, name };
  }

  protected mapBillingAddress(address?: Address): Address | undefined {
    if (!address) {
      return undefined;
    }

    const mapped: Partial<Address> = {};
    let hasAnyField = false;

    const assignStr = (key: keyof Address, value?: string) => {
      const v = cleanStr(value);
      if (v !== undefined) {
        (mapped as Record<string, unknown>)[key as string] = v;
        hasAnyField = true;
      }
    };

    const assignBool = (key: keyof Address, value?: boolean) => {
      if (value !== undefined) {
        (mapped as Record<string, unknown>)[key as string] = value;
        hasAnyField = true;
      }
    };

    assignStr('id', address.id);
    assignStr('title', address.title);
    assignStr('titleCode', address.titleCode);
    assignStr('firstName', address.firstName);
    assignStr('lastName', address.lastName);
    assignStr('companyName', address.companyName);
    assignStr('line1', address.line1);
    assignStr('line2', address.line2);
    assignStr('town', address.town);
    assignStr('district', address.district);
    assignStr('postalCode', address.postalCode);
    assignStr('phone', address.phone);
    assignStr('cellphone', address.cellphone);
    assignStr('email', address.email);
    assignStr('formattedAddress', address.formattedAddress);
    assignBool('shippingAddress', address.shippingAddress);
    assignBool('defaultAddress', address.defaultAddress);
    assignBool('visibleInAddressBook', address.visibleInAddressBook);

    if (address.region) {
      const region: NonNullable<Address['region']> = {};
      let hasRegion = false;
      const rIsocode = cleanStr(address.region.isocode);
      const rIsocodeShort = cleanStr(address.region.isocodeShort);
      const rCountryIso = cleanStr(address.region.countryIso);
      const rName = cleanStr(address.region.name);
      if (rIsocode) { region.isocode = rIsocode; hasRegion = true; }
      if (rIsocodeShort) { region.isocodeShort = rIsocodeShort; hasRegion = true; }
      if (rCountryIso) { region.countryIso = rCountryIso; hasRegion = true; }
      if (rName) { region.name = rName; hasRegion = true; }
      if (hasRegion) { mapped.region = region; hasAnyField = true; }
    }

    if (address.country) {
      const cIsocode = cleanStr(address.country.isocode);
      const cName = cleanStr(address.country.name);
      if (cIsocode || cName) {
        mapped.country = {};
        if (cIsocode) { mapped.country.isocode = cIsocode; }
        if (cName) { mapped.country.name = cName; }
        hasAnyField = true;
      }
    }

    return hasAnyField ? (mapped as Address) : undefined;
  }
}
