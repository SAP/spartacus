import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../util.po';

export class AddressForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-address-form')
  );
  readonly header: ElementFinder = this.form.element(by.css('h3.heading'));
  readonly countrySelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="isocode"]')
  );
  readonly titleSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="titleCode"]')
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
    by.css('[formgroupname="region"] [formcontrolname="isocode"]')
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
    by.cssContainingText('button', 'Next')
  );

  async setCountry(value: string) {
    await this.countrySelect
      .all(by.cssContainingText('option', value)).get(0)
      .click();
  }

  async setTitle(value: string) {
    await this.titleSelect
      .element(by.cssContainingText('option', value))
      .click();
  }

  async setProvince(value: string) {
    await this.province.element(by.cssContainingText('option', value)).click();
  }

  async fillIn() {
    await this.setCountry('United States');
    await this.setTitle('Mr.');
    await this.firstName.sendKeys('Winstoon');
    await this.lastName.sendKeys('Rumfoord');
    await this.addressLine1.sendKeys('Chrono-Synclastic Infundibulum');
    await this.addressLine2.sendKeys('Betelgeuse');
    await this.city.sendKeys('Tralfamadore');
    await this.setProvince('Connecticut');
    await this.postalCode.sendKeys('06247');
    await this.phoneNumber.sendKeys('555 555 555');
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.form);
  }
}
