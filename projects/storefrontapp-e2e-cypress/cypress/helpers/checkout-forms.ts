export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    country: string;
    state?: string;
    postal: string;
    city: string;
  };
}

export interface PaymentDetails {
  fullName: string;
  payment: {
    card: string;
    number: string;
    expires: {
      month: string;
      year: string;
    };
    cvv: string;
  };
}

export function fillShippingAddress(shippingAddressData: ShippingAddress) {
  cy.get('cx-address-form').within(() => {
    cy.get('.country-select[formcontrolname="isocode"]').ngSelect(
      shippingAddressData.address.country
    );
    cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
    cy.get('[formcontrolname="firstName"]').type(shippingAddressData.firstName);
    cy.get('[formcontrolname="lastName"]').type(shippingAddressData.lastName);
    cy.get('[formcontrolname="line1"]').type(shippingAddressData.address.line1);
    if (shippingAddressData.address.line2) {
      cy.get('[formcontrolname="line2"]').type(
        shippingAddressData.address.line2
      );
    }
    cy.get('[formcontrolname="town"]').type(shippingAddressData.address.city);
    if (shippingAddressData.address.state) {
      cy.get('.region-select[formcontrolname="isocode"]').ngSelect(
        shippingAddressData.address.state
      );
    }
    cy.get('[formcontrolname="postalCode"]').type(
      shippingAddressData.address.postal
    );
    cy.get('[formcontrolname="phone"]').type(shippingAddressData.phone);
    cy.get('button.btn-primary').click();
  });
}

export function fillBillingAddress(billingAddressData: ShippingAddress) {
  cy.get('.cx-payment-form-billing').within(() => {
    cy.get('input[type="checkbox"]').click();
    cy.get('[bindvalue="isocode"]').ngSelect(
      billingAddressData.address.country
    );
    cy.get('[formcontrolname="firstName"]').type(billingAddressData.firstName);
    cy.get('[formcontrolname="lastName"]').type(billingAddressData.lastName);
    cy.get('[formcontrolname="line1"]').type(billingAddressData.address.line1);
    if (billingAddressData.address.line2) {
      cy.get('[formcontrolname="line2"]').type(
        billingAddressData.address.line2
      );
    }
    cy.get('[formcontrolname="town"]').type(billingAddressData.address.city);
    if (billingAddressData.address.state) {
      cy.get('[formcontrolname="isocodeShort"]').ngSelect(
        billingAddressData.address.state
      );
    }
    cy.get('[formcontrolname="postalCode"]').type(
      billingAddressData.address.postal
    );
  });
}

export function fillPaymentDetails(
  paymentDetails: PaymentDetails,
  billingAddress?: ShippingAddress
) {
  cy.get('cx-payment-form').within(() => {
    cy.get('[bindValue="code"]').ngSelect(paymentDetails.payment.card);
    cy.get('[formcontrolname="accountHolderName"]').type(
      paymentDetails.fullName
    );
    cy.get('[formcontrolname="cardNumber"]').type(
      paymentDetails.payment.number
    );
    cy.get('[bindValue="expiryMonth"]').ngSelect(
      paymentDetails.payment.expires.month
    );
    cy.get('[bindValue="expiryYear"]').ngSelect(
      paymentDetails.payment.expires.year
    );
    cy.get('[formcontrolname="cvn"]').type(paymentDetails.payment.cvv);
    if (billingAddress) {
      fillBillingAddress(billingAddress);
    }
    cy.get('button.btn-primary').click();
  });
}
