import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class AddressForm {
  static readonly COUNTRY = 'United States';
  static readonly FIELD = 'Mr.';
  static readonly FIRST_NAME = 'Winstoon';
  static readonly LAST_NAME = 'Rumfoord';
  static readonly ADDRESS_LINE_1 = 'Chrono-Synclastic Infundibulum';
  static readonly ADDRESS_LINE_2 = 'Betelgeuse';
  static readonly CITY = 'Tralfamadore';
  static readonly PROVINCE = 'Connecticut';
  static readonly POSTAL_CODE = '06247';
  static readonly PHONE_NUMBER = '555 555 555';

  constructor(
    private parentElement: ElementFinder = element(by.tagName('body'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('cx-address-form')
  );
  readonly countrySelect: ElementFinder = this.form.element(
    by.css('[bindValue="isocode"].country-select')
  );
  readonly titleSelect: ElementFinder = this.form.element(
    by.css('[bindValue="code"]')
  );
  readonly firstName: ElementFinder = this.form.element(
    by.css('[formcontrolname="firstName"]')
  );
  readonly lastName: ElementFinder = this.form.element(
    by.css('[formcontrolname="lastName"]')
  );
  readonly addressLine1: ElementFinder = this.form.element(
    by.css('[formcontrolname="line1"]')
  );
  readonly addressLine2: ElementFinder = this.form.element(
    by.css('[formcontrolname="line2"]')
  );
  readonly city: ElementFinder = this.form.element(
    by.css('[formcontrolname="town"]')
  );
  readonly province: ElementFinder = this.form.element(
    by.css('[bindValue="isocode"].region-select')
  );
  readonly postalCode: ElementFinder = this.form.element(
    by.css('[formcontrolname="postalCode"]')
  );
  readonly phoneNumber: ElementFinder = this.form.element(
    by.css('[formcontrolname="phone"]')
  );
  readonly setAsDefaultCheckBox: ElementFinder = this.form.element(
    by.css('.saveAddressAsDefault')
  );
  readonly nextButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Continue')
  );

  async setCountry(value: string) {
    await E2EUtil.selectNgSelectOptionByText(this.countrySelect, value);
  }

  async setTitle(value: string) {
    await E2EUtil.selectNgSelectOptionByText(this.titleSelect, value);
  }

  async setProvince(value: string) {
    await E2EUtil.selectNgSelectOptionByText(this.province, value);
  }

  async fillIn() {
    await this.setCountry(AddressForm.COUNTRY);
    await this.setTitle(AddressForm.FIELD);
    await this.firstName.sendKeys(AddressForm.FIRST_NAME);
    await this.lastName.sendKeys(AddressForm.LAST_NAME);
    await this.addressLine1.sendKeys(AddressForm.ADDRESS_LINE_1);
    await this.addressLine2.sendKeys(AddressForm.ADDRESS_LINE_2);
    await this.city.sendKeys(AddressForm.CITY);
    await this.setProvince(AddressForm.PROVINCE);
    await this.postalCode.sendKeys(AddressForm.POSTAL_CODE);
    await this.phoneNumber.sendKeys(AddressForm.PHONE_NUMBER);
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }
}
