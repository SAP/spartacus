export interface Address {
  line1: string;
  line2?: string;
  country: string;
  state?: string;
  postal: string;
  city: string;
}

export interface AddressData {
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
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

export function fillShippingAddress(
  shippingAddress: AddressData,
  submitForm: boolean = true
) {
  cy.get('button.btn-primary').should('be.visible');
  cy.get('cx-page-layout').then((body) => {
    // If the address form does not exists, shipping address has been added in previous
    // spec attempt so we can continue
    if (!body.find('cx-address-form').length) {
      cy.get('button.btn-primary').click();
    } else {
      cy.get('cx-address-form').within(() => {
        cy.get('.country-select[formcontrolname="isocode"]').ngSelect(
          shippingAddress.address.country
        );
        cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
        cy.get('[formcontrolname="firstName"]')
          .clear()
          .type(shippingAddress.firstName);
        cy.get('[formcontrolname="lastName"]')
          .clear()
          .type(shippingAddress.lastName);
        cy.get('[formcontrolname="line1"]')
          .clear()
          .type(shippingAddress.address.line1);
        if (shippingAddress.address.line2) {
          cy.get('[formcontrolname="line2"]')
            .clear()
            .type(shippingAddress.address.line2);
        }
        cy.get('[formcontrolname="town"]')
          .clear()
          .type(shippingAddress.address.city);
        if (shippingAddress.address.state) {
          cy.get('.region-select[formcontrolname="isocode"]').ngSelect(
            shippingAddress.address.state
          );
        }
        cy.get('[formcontrolname="postalCode"]')
          .clear()
          .type(shippingAddress.address.postal);
        cy.get('[formcontrolname="phone"]').clear().type(shippingAddress.phone);
        if (submitForm) {
          cy.get('button.btn-primary').click();
        }
      });
    }
  });
}

export function fillBillingAddress(billingAddress: AddressData) {
  cy.get('.cx-payment-form-billing').within(() => {
    cy.get('input[type="checkbox"]').click();
    cy.get('[bindvalue="isocode"]').ngSelect(billingAddress.address.country);
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(billingAddress.firstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(billingAddress.lastName);
    cy.get('[formcontrolname="line1"]')
      .clear()
      .type(billingAddress.address.line1);
    if (billingAddress.address.line2) {
      cy.get('[formcontrolname="line2"]')
        .clear()
        .type(billingAddress.address.line2);
    }
    cy.get('[formcontrolname="town"]')
      .clear()
      .type(billingAddress.address.city);
    if (billingAddress.address.state) {
      cy.get('[formcontrolname="isocodeShort"]').ngSelect(
        billingAddress.address.state
      );
    }
    cy.get('[formcontrolname="postalCode"]')
      .clear()
      .type(billingAddress.address.postal);
  });
}

export function fillPaymentDetails(
  paymentDetails: PaymentDetails,
  billingAddress?: AddressData,
  submitForm: boolean = true
) {
  cy.get('cx-payment-form').within(() => {
    cy.get('[bindValue="code"]').ngSelect(paymentDetails.payment.card);
    cy.get('[formcontrolname="accountHolderName"]')
      .clear()
      .type(paymentDetails.fullName);
    cy.get('[formcontrolname="cardNumber"]')
      .clear()
      .type(paymentDetails.payment.number);
    cy.get('[formcontrolname="expiryMonth"]').ngSelect(
      paymentDetails.payment.expires.month
    );
    cy.get('[formcontrolname="expiryYear"]').ngSelect(
      paymentDetails.payment.expires.year
    );
    cy.get('[formcontrolname="cvn"]').clear().type(paymentDetails.payment.cvv);
    if (billingAddress) {
      fillBillingAddress(billingAddress);
    } else {
      cy.get('input.form-check-input').check();
    }

    if (submitForm) {
      /**
       * TODO: remove when we find out what happened to the delivery address not setting instantly like before.
       * It takes time for the delivery address to set.
       * Was reported in the ec-spartacus-release https://sap-cx.slack.com/archives/GLJ5MR1LL/p1586937731001500
       */
      //cy.wait(3000);
      cy.get('button.btn.btn-block.btn-primary').contains('Continue').click();
    }
  });
}
