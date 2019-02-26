export interface ShippingAddressData {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    country: string;
    state: string;
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

export function fillShippingAddress(shippingAddressData: ShippingAddressData) {
  cy.get('cx-address-form').within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(shippingAddressData.firstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(shippingAddressData.lastName);
    cy.get('[formcontrolname="line1"]')
      .clear()
      .type(shippingAddressData.address.line1);
    cy.get('[formcontrolname="line2"]')
      .clear()
      .type(shippingAddressData.address.line2);
    cy.get('.country-select[formcontrolname="isocode"]').ngSelect(
      shippingAddressData.address.country
    );
    cy.get('[formcontrolname="town"]')
      .clear()
      .type(shippingAddressData.address.city);
    cy.get('.region-select[formcontrolname="isocode"]').ngSelect(
      shippingAddressData.address.state
    );
    cy.get('[formcontrolname="postalCode"]')
      .clear()
      .type(shippingAddressData.address.postal);
    cy.get('[formcontrolname="phone"]')
      .clear()
      .type(shippingAddressData.phone);
    cy.get('button.btn-primary').click();
  });
}

export function fillPaymentDetails(paymentDetails: PaymentDetails) {
  cy.get('cx-payment-form').within(() => {
    cy.getByPlaceholderText('Select One...').ngSelect(
      paymentDetails.payment.card
    );
    cy.get('[formcontrolname="accountHolderName"]').type(
      paymentDetails.fullName
    );
    cy.get('[formcontrolname="cardNumber"]').type(
      paymentDetails.payment.number
    );
    cy.getByPlaceholderText('MM').ngSelect(
      paymentDetails.payment.expires.month
    );
    cy.getByPlaceholderText('YYYY').ngSelect(
      paymentDetails.payment.expires.year
    );
    cy.get('[formcontrolname="cvn"]').type(paymentDetails.payment.cvv);
    cy.get('button.btn-primary').click();
  });
}
