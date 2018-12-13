import { HomePage } from '../page-objects/home.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddressBookPage } from '../page-objects/account/address-management.po';
import { Header } from '../page-objects/cmslib/header.po';
import { AddressForm } from '../page-objects/checkout/address-form.po';

describe('Address management page', () => {
  const home = new HomePage();
  const header = new Header();
  const addressBookPage = new AddressBookPage();
  const addressForm = new AddressForm();

  beforeAll(async () => {
    await home.navigateTo();
  });

  it('should be able to open address book page using menu', async () => {
    await home.waitForReady();
    await LoginHelper.registerNewUser();

    // Use navigation and go to address book page
    await header.navigationMenu.click();
    await addressBookPage.menuItem.click();

    expect(addressBookPage.page).toBeTruthy();
  });

  it('should be able to add new address', async () => {
    await addressBookPage.addNewAddress(addressForm);
    expect(addressBookPage.addressCards.count()).toEqual(1);
    await addressBookPage.openNewAddressFormBtn.click();
    await addressBookPage.addNewAddress(addressForm);
    expect(addressBookPage.addressCards.count()).toEqual(2);
  });

  it('should be able to edit address', async () => {
    await addressBookPage.waitForReady();
    await addressBookPage.updateAddress(addressForm);
    expect(addressBookPage.addressCards.get(1).getText()).toContain('Updated');
  });

  it('should be able to set address as default', async () => {
    await addressBookPage.waitForReady();
    await addressBookPage.setAsDefaultBtn.click();
    await addressBookPage.waitForReady();
    expect(addressBookPage.addressCards.get(0).getText()).toContain('Updated');
    expect(addressBookPage.addressCards.get(0).getText()).toContain('Default');
  });

  it('should be able to delete address', async () => {
    await addressBookPage.waitForReady();
    expect(addressBookPage.addressCards.count()).toEqual(2);
    await addressBookPage.deleteAddress();
    expect(addressBookPage.addressCards.count()).toEqual(1);
  });

  it('should logout user', async () => {
    await LoginHelper.logOutViaHeader();
  });
});
