import './ngSelect.commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Registers user
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.register(user)
        ```
       */
      register: (a: RegisterUser) => void;
      /**
       * Login user
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.login(username, password)
        ```
       */
      login: (username: string, password: string) => void;
      /**
       * Fill shipping address
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.fillShippingAddress(shippingAddressData)
        ```
       */
      fillShippingAddress: (shippingAddressData: ShippingAddressData) => void;
      /**
       * Fill payment details
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.fillPaymentDetails(paymentDetails)
        ```
       */
      fillPaymentDetails: (paymentDetails: PaymentDetails) => void;
    }
  }
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

Cypress.Commands.add(
  'register',
  ({ firstName, lastName, email, password }: RegisterUser) => {
    cy.get('cx-register form').within(() => {
      cy.get('[formcontrolname="titleCode"]').select('mr');
      cy.get('[formcontrolname="firstName"]').type(firstName);
      cy.get('[formcontrolname="lastName"]').type(lastName);
      cy.get('[formcontrolname="email"]').type(email);
      cy.get('[formcontrolname="password"]').type(password);
      cy.get('[formcontrolname="passwordconf"]').type(password);
      cy.get('[formcontrolname="termsandconditions"]').check();
      cy.get('button[type="submit"]').click();
    });
  }
);

Cypress.Commands.add('login', (login: string, password: string) => {
  cy.get('cx-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').type(login);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('button[type=submit]').click();
  });
});

Cypress.Commands.add(
  'fillShippingAddress',
  (shippingAddressData: ShippingAddressData) => {
    cy.get('cx-address-form').within(() => {
      cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
      cy.get('[formcontrolname="firstName"]').type(
        shippingAddressData.firstName
      );
      cy.get('[formcontrolname="lastName"]').type(shippingAddressData.lastName);
      cy.get('[formcontrolname="line1"]').type(
        shippingAddressData.address.line1
      );
      cy.get('[formcontrolname="line2"]').type(
        shippingAddressData.address.line2
      );
      cy.get('.country-select[formcontrolname="isocode"]').ngSelect(
        shippingAddressData.address.country
      );
      cy.get('[formcontrolname="town"]').type(shippingAddressData.address.city);
      cy.get('.region-select[formcontrolname="isocode"]').ngSelect(
        shippingAddressData.address.state
      );
      cy.get('[formcontrolname="postalCode"]').type(
        shippingAddressData.address.postal
      );
      cy.get('[formcontrolname="phone"]').type(shippingAddressData.phone);
      cy.get('button.btn-primary').click();
    });
  }
);

Cypress.Commands.add('fillPaymentDetails', (paymentDetails: PaymentDetails) => {
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
});
