import { HomePage } from '../page-objects/home.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { AddressBookPage } from '../page-objects/account/address-management.po';
import { Header } from '../page-objects/cmslib/header.po';
import { AddressForm } from '../page-objects/checkout/address-form.po';

fdescribe('Address management page', () => {
  const home = new HomePage();
  const header = new Header();
  const addressBookPage = new AddressBookPage();
  const addressForm = new AddressForm();

  beforeAll(async () => {
    // Go to Home
    await home.navigateTo();
    //await home.waitForReady();
  });

  it('should be able to open address book page using menu', async () => {
    // Register new user
    await LoginHelper.registerNewUser();

    // Use navigation and go to address book page
    await header.navigationMenu.click();
    await addressBookPage.menuItem.click();

    await addressBookPage.waitForReady();

    expect(addressBookPage.page).toBeTruthy();
  });

  it('should be able to add new address', async () => {
    await addressBookPage.addNewAddress(addressForm);
    expect(addressBookPage.addressCards.count()).toEqual(1);
  });

  it('should be able to edit address', async () => {
    await addressBookPage.openEditAddressFormBtn.click();
    await addressBookPage.updateAddress(addressForm);
    expect(addressBookPage.addressCards.get(1)).toContain('Updated');
  });

  //   it('should be able to delete address', async () => {
  //     await addressBookPage.openEditAddressFormBtn.click();
  //     await addressBookPage.addNewAddress(addressForm);
  //     expect(addressBookPage.addressCards.count()).toEqual(2);
  //   });
});
