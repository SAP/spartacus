/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { getAddressNumbers } from '@spartacus/storefront';
/**
 * Get card for delivery address
 */
export function deliveryAddressCard(textTitle, textPhone, textMobile, deliveryAddress, countryName) {
    if (!countryName) {
        countryName = deliveryAddress?.country?.name;
    }
    let region = '';
    if (deliveryAddress &&
        deliveryAddress.region &&
        deliveryAddress.region.isocode) {
        region = deliveryAddress.region.isocode + ', ';
    }
    const numbers = getAddressNumbers(deliveryAddress, textPhone, textMobile);
    let fullName;
    if (deliveryAddress.firstName && deliveryAddress.lastName) {
        fullName = deliveryAddress.firstName + ' ' + deliveryAddress.lastName;
    }
    else if (deliveryAddress.firstName) {
        fullName = deliveryAddress.firstName;
    }
    else if (deliveryAddress.lastName) {
        fullName = deliveryAddress.lastName;
    }
    return {
        title: textTitle,
        textBold: fullName,
        text: [
            deliveryAddress.line1,
            deliveryAddress.line2,
            deliveryAddress.town + ', ' + region + countryName,
            deliveryAddress.postalCode,
            numbers,
        ],
    };
}
/**
 * Get card for delivery mode
 */
export function deliveryModeCard(textTitle, deliveryMode) {
    return {
        title: textTitle,
        textBold: deliveryMode.name,
        text: [
            deliveryMode.description,
            deliveryMode.deliveryCost?.formattedValue
                ? deliveryMode.deliveryCost?.formattedValue
                : '',
        ],
    };
}
/**
 * Get card for payment method
 */
export function paymentMethodCard(textTitle, textExpires, paymentDetails) {
    return {
        title: textTitle,
        text: [
            paymentDetails.cardType?.name,
            paymentDetails.accountHolderName,
            paymentDetails.cardNumber,
            textExpires,
        ],
    };
}
/**
 * Get card for billing address
 */
export function billingAddressCard(textTitle, textBillTo, paymentDetails) {
    const region = paymentDetails.billingAddress?.region?.isocode
        ? paymentDetails.billingAddress?.region?.isocode + ', '
        : '';
    return {
        title: textTitle,
        text: [
            textBillTo,
            paymentDetails.billingAddress?.firstName +
                ' ' +
                paymentDetails.billingAddress?.lastName,
            paymentDetails.billingAddress?.line1,
            paymentDetails.billingAddress?.town +
                ', ' +
                region +
                paymentDetails.billingAddress?.country?.isocode,
            paymentDetails.billingAddress?.postalCode,
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FyZC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9yb290L3V0aWxzL29yZGVyLWNhcmQtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFJSCxPQUFPLEVBQVEsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRTs7R0FFRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsZUFBd0IsRUFDeEIsV0FBb0I7SUFFcEIsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixXQUFXLEdBQUcsZUFBZSxFQUFFLE9BQU8sRUFBRSxJQUFjLENBQUM7S0FDeEQ7SUFFRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFDRSxlQUFlO1FBQ2YsZUFBZSxDQUFDLE1BQU07UUFDdEIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQzlCO1FBQ0EsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoRDtJQUVELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUUsSUFBSSxRQUFRLENBQUM7SUFDYixJQUFJLGVBQWUsQ0FBQyxTQUFTLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRTtRQUN6RCxRQUFRLEdBQUcsZUFBZSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztLQUN2RTtTQUFNLElBQUksZUFBZSxDQUFDLFNBQVMsRUFBRTtRQUNwQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQztLQUN0QztTQUFNLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztLQUNyQztJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsU0FBUztRQUNoQixRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUU7WUFDSixlQUFlLENBQUMsS0FBSztZQUNyQixlQUFlLENBQUMsS0FBSztZQUNyQixlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLEdBQUcsV0FBVztZQUNsRCxlQUFlLENBQUMsVUFBVTtZQUMxQixPQUFPO1NBQ1I7S0FDTSxDQUFDO0FBQ1osQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixTQUFpQixFQUNqQixZQUEwQjtJQUUxQixPQUFPO1FBQ0wsS0FBSyxFQUFFLFNBQVM7UUFDaEIsUUFBUSxFQUFFLFlBQVksQ0FBQyxJQUFJO1FBQzNCLElBQUksRUFBRTtZQUNKLFlBQVksQ0FBQyxXQUFXO1lBQ3hCLFlBQVksQ0FBQyxZQUFZLEVBQUUsY0FBYztnQkFDdkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsY0FBYztnQkFDM0MsQ0FBQyxDQUFDLEVBQUU7U0FDUDtLQUNNLENBQUM7QUFDWixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLFNBQWlCLEVBQ2pCLFdBQW1CLEVBQ25CLGNBQThCO0lBRTlCLE9BQU87UUFDTCxLQUFLLEVBQUUsU0FBUztRQUNoQixJQUFJLEVBQUU7WUFDSixjQUFjLENBQUMsUUFBUSxFQUFFLElBQUk7WUFDN0IsY0FBYyxDQUFDLGlCQUFpQjtZQUNoQyxjQUFjLENBQUMsVUFBVTtZQUN6QixXQUFXO1NBQ1o7S0FDTSxDQUFDO0FBQ1osQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxTQUFpQixFQUNqQixVQUFrQixFQUNsQixjQUE4QjtJQUU5QixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQzNELENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEdBQUcsSUFBSTtRQUN2RCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsT0FBTztRQUNMLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRTtZQUNKLFVBQVU7WUFDVixjQUFjLENBQUMsY0FBYyxFQUFFLFNBQVM7Z0JBQ3RDLEdBQUc7Z0JBQ0gsY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRO1lBQ3pDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsS0FBSztZQUNwQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUk7Z0JBQ2pDLElBQUk7Z0JBQ0osTUFBTTtnQkFDTixjQUFjLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQ2pELGNBQWMsQ0FBQyxjQUFjLEVBQUUsVUFBVTtTQUMxQztLQUNNLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEZWxpdmVyeU1vZGUsIFBheW1lbnREZXRhaWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmQsIGdldEFkZHJlc3NOdW1iZXJzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcblxuLyoqXG4gKiBHZXQgY2FyZCBmb3IgZGVsaXZlcnkgYWRkcmVzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsaXZlcnlBZGRyZXNzQ2FyZChcbiAgdGV4dFRpdGxlOiBzdHJpbmcsXG4gIHRleHRQaG9uZTogc3RyaW5nLFxuICB0ZXh0TW9iaWxlOiBzdHJpbmcsXG4gIGRlbGl2ZXJ5QWRkcmVzczogQWRkcmVzcyxcbiAgY291bnRyeU5hbWU/OiBzdHJpbmdcbik6IENhcmQge1xuICBpZiAoIWNvdW50cnlOYW1lKSB7XG4gICAgY291bnRyeU5hbWUgPSBkZWxpdmVyeUFkZHJlc3M/LmNvdW50cnk/Lm5hbWUgYXMgc3RyaW5nO1xuICB9XG5cbiAgbGV0IHJlZ2lvbiA9ICcnO1xuICBpZiAoXG4gICAgZGVsaXZlcnlBZGRyZXNzICYmXG4gICAgZGVsaXZlcnlBZGRyZXNzLnJlZ2lvbiAmJlxuICAgIGRlbGl2ZXJ5QWRkcmVzcy5yZWdpb24uaXNvY29kZVxuICApIHtcbiAgICByZWdpb24gPSBkZWxpdmVyeUFkZHJlc3MucmVnaW9uLmlzb2NvZGUgKyAnLCAnO1xuICB9XG5cbiAgY29uc3QgbnVtYmVycyA9IGdldEFkZHJlc3NOdW1iZXJzKGRlbGl2ZXJ5QWRkcmVzcywgdGV4dFBob25lLCB0ZXh0TW9iaWxlKTtcbiAgbGV0IGZ1bGxOYW1lO1xuICBpZiAoZGVsaXZlcnlBZGRyZXNzLmZpcnN0TmFtZSAmJiBkZWxpdmVyeUFkZHJlc3MubGFzdE5hbWUpIHtcbiAgICBmdWxsTmFtZSA9IGRlbGl2ZXJ5QWRkcmVzcy5maXJzdE5hbWUgKyAnICcgKyBkZWxpdmVyeUFkZHJlc3MubGFzdE5hbWU7XG4gIH0gZWxzZSBpZiAoZGVsaXZlcnlBZGRyZXNzLmZpcnN0TmFtZSkge1xuICAgIGZ1bGxOYW1lID0gZGVsaXZlcnlBZGRyZXNzLmZpcnN0TmFtZTtcbiAgfSBlbHNlIGlmIChkZWxpdmVyeUFkZHJlc3MubGFzdE5hbWUpIHtcbiAgICBmdWxsTmFtZSA9IGRlbGl2ZXJ5QWRkcmVzcy5sYXN0TmFtZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHRleHRUaXRsZSxcbiAgICB0ZXh0Qm9sZDogZnVsbE5hbWUsXG4gICAgdGV4dDogW1xuICAgICAgZGVsaXZlcnlBZGRyZXNzLmxpbmUxLFxuICAgICAgZGVsaXZlcnlBZGRyZXNzLmxpbmUyLFxuICAgICAgZGVsaXZlcnlBZGRyZXNzLnRvd24gKyAnLCAnICsgcmVnaW9uICsgY291bnRyeU5hbWUsXG4gICAgICBkZWxpdmVyeUFkZHJlc3MucG9zdGFsQ29kZSxcbiAgICAgIG51bWJlcnMsXG4gICAgXSxcbiAgfSBhcyBDYXJkO1xufVxuXG4vKipcbiAqIEdldCBjYXJkIGZvciBkZWxpdmVyeSBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxpdmVyeU1vZGVDYXJkKFxuICB0ZXh0VGl0bGU6IHN0cmluZyxcbiAgZGVsaXZlcnlNb2RlOiBEZWxpdmVyeU1vZGVcbik6IENhcmQge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiB0ZXh0VGl0bGUsXG4gICAgdGV4dEJvbGQ6IGRlbGl2ZXJ5TW9kZS5uYW1lLFxuICAgIHRleHQ6IFtcbiAgICAgIGRlbGl2ZXJ5TW9kZS5kZXNjcmlwdGlvbixcbiAgICAgIGRlbGl2ZXJ5TW9kZS5kZWxpdmVyeUNvc3Q/LmZvcm1hdHRlZFZhbHVlXG4gICAgICAgID8gZGVsaXZlcnlNb2RlLmRlbGl2ZXJ5Q29zdD8uZm9ybWF0dGVkVmFsdWVcbiAgICAgICAgOiAnJyxcbiAgICBdLFxuICB9IGFzIENhcmQ7XG59XG5cbi8qKlxuICogR2V0IGNhcmQgZm9yIHBheW1lbnQgbWV0aG9kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXltZW50TWV0aG9kQ2FyZChcbiAgdGV4dFRpdGxlOiBzdHJpbmcsXG4gIHRleHRFeHBpcmVzOiBzdHJpbmcsXG4gIHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlsc1xuKTogQ2FyZCB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHRleHRUaXRsZSxcbiAgICB0ZXh0OiBbXG4gICAgICBwYXltZW50RGV0YWlscy5jYXJkVHlwZT8ubmFtZSxcbiAgICAgIHBheW1lbnREZXRhaWxzLmFjY291bnRIb2xkZXJOYW1lLFxuICAgICAgcGF5bWVudERldGFpbHMuY2FyZE51bWJlcixcbiAgICAgIHRleHRFeHBpcmVzLFxuICAgIF0sXG4gIH0gYXMgQ2FyZDtcbn1cblxuLyoqXG4gKiBHZXQgY2FyZCBmb3IgYmlsbGluZyBhZGRyZXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaWxsaW5nQWRkcmVzc0NhcmQoXG4gIHRleHRUaXRsZTogc3RyaW5nLFxuICB0ZXh0QmlsbFRvOiBzdHJpbmcsXG4gIHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlsc1xuKTogQ2FyZCB7XG4gIGNvbnN0IHJlZ2lvbiA9IHBheW1lbnREZXRhaWxzLmJpbGxpbmdBZGRyZXNzPy5yZWdpb24/Lmlzb2NvZGVcbiAgICA/IHBheW1lbnREZXRhaWxzLmJpbGxpbmdBZGRyZXNzPy5yZWdpb24/Lmlzb2NvZGUgKyAnLCAnXG4gICAgOiAnJztcbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogdGV4dFRpdGxlLFxuICAgIHRleHQ6IFtcbiAgICAgIHRleHRCaWxsVG8sXG4gICAgICBwYXltZW50RGV0YWlscy5iaWxsaW5nQWRkcmVzcz8uZmlyc3ROYW1lICtcbiAgICAgICAgJyAnICtcbiAgICAgICAgcGF5bWVudERldGFpbHMuYmlsbGluZ0FkZHJlc3M/Lmxhc3ROYW1lLFxuICAgICAgcGF5bWVudERldGFpbHMuYmlsbGluZ0FkZHJlc3M/LmxpbmUxLFxuICAgICAgcGF5bWVudERldGFpbHMuYmlsbGluZ0FkZHJlc3M/LnRvd24gK1xuICAgICAgICAnLCAnICtcbiAgICAgICAgcmVnaW9uICtcbiAgICAgICAgcGF5bWVudERldGFpbHMuYmlsbGluZ0FkZHJlc3M/LmNvdW50cnk/Lmlzb2NvZGUsXG4gICAgICBwYXltZW50RGV0YWlscy5iaWxsaW5nQWRkcmVzcz8ucG9zdGFsQ29kZSxcbiAgICBdLFxuICB9IGFzIENhcmQ7XG59XG4iXX0=