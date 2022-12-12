/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const address = {
  addressForm: {
    title: 'Title',
    defaultTitle: 'Title',
    firstName: {
      label: 'First name',
      placeholder: 'First Name',
      required: 'First name is required',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Last Name',
      required: 'Last name is required',
    },
    address1: {
      label: 'Address 1',
      required: 'Address is required',
      placeholder: 'Street Address',
    },
    address2: {
      label: 'Address 2 (optional)',
      placeholder: 'Apt, Suite',
    },
    country: {
      label: 'Country/Region',
      required: 'Country/Region is required',
    },
    city: {
      label: 'City',
      placeholder: 'City',
      required: 'City is required',
    },
    state: 'State',
    zipCode: {
      label: 'Zip code',
      placeholder: 'Postal Code/Zip',
      required: 'Zip code is required',
    },
    phoneNumber: {
      label: 'Phone number (optional)',
      placeholder: '(555) 555 - 0123',
    },
    saveAsDefault: 'Save as default',
    chooseAddress: 'Choose address',
    selectOne: 'Select One...',
    setAsDefault: 'Set as default delivery address',
    titleRequired: 'Title is required.',
    userAddressAddSuccess: 'New address was added successfully!',
    userAddressUpdateSuccess: 'Address updated successfully!',
    userAddressDeleteSuccess: 'Address deleted successfully!',
    invalidAddress: 'Invalid Address',
  },
  addressBook: {
    addNewDeliveryAddress: 'Add a new delivery address',
    editDeliveryAddress: 'Edit delivery address',
    areYouSureToDeleteAddress: 'Are you sure you want to delete this address?',
    addNewAddress: 'Add new address',
    addAddress: 'Add address',
    updateAddress: 'Update address',
    backToAddressList: 'Back to address list',
    defaultDeliveryAddress: 'Default Delivery Address',
    additionalDeliveryAddress: 'Additional Delivery Address {{number}}',
  },
  addressCard: {
    default: 'DEFAULT',
    selected: 'Selected',
    setAsDefault: 'Set as default',
    shipTo: 'Ship To',
    billTo: 'Bill To',
  },
  addressSuggestion: {
    verifyYourAddress: 'Verify your address',
    ensureAccuracySuggestChange:
      'To ensure delivery accuracy, we suggest the change selected below.',
    chooseAddressToUse: 'Please choose which address you would like to use:',
    suggestedAddress: 'Suggested address',
    enteredAddress: 'Entered address',
    editAddress: 'Edit address',
    saveAddress: 'Save address',
  },
  addressMessages: {
    setAsDefaultSuccessfully:
      'Address {{ streetAddress }} was successfully set as default',
  },
};
