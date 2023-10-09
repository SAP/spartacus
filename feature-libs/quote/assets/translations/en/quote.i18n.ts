/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const quote = {
  quote: {
    actions: {
      byRole: {
        VIEW: 'View Quote',
        SUBMIT: 'Submit Quote',
        SAVE: 'Save Quote',
        EDIT: 'Edit Quote',
        CANCEL: 'Cancel Quote',
        CHECKOUT: 'Accept and Checkout',
        APPROVE: 'Approve Quote',
        REJECT: 'Reject Quote',
        REQUOTE: 'Request new Quote',
      },
      link: {
        newCart: 'New Cart',
        quotes: 'Quotes',
      },
      confirmDialog: {
        name: 'Name:',
        description: 'Description:',
        validity: 'This quote is valid until {{ expirationTime }}',
        option: { yes: 'Yes', no: 'No' },
        buyer: {
          submit: {
            title: 'Submit Quote Request {{ code }}?',
            confirmNote: 'Are you sure you want to submit this quote request?',
            successMessage: 'Quote request submitted successfully',
          },
          cancel: {
            title: 'Cancel Quote Request {{ code }}?',
            confirmNote: 'Are you sure you want to cancel this quote request',
            successMessage: 'Quote request cancelled',
          },
        },
        buyer_offer: {
          edit: {
            title: 'Confirm Edit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to edit this approved quote?',
            warningNote:
              'This Quote has been Approved. Editing this Quote will prevent Checkout until new edits are approved.',
          },
          cancel: {
            title: 'Cancel Quote {{ code }}?',
            confirmNote: 'Are you sure you want to cancel this quote?',
            successMessage: 'Quote cancelled',
          },
          checkout: {
            title: 'Checkout Quote {{ code }}?',
            confirmNote:
              'Are you sure you want to accept and checkout this quote?',
          },
        },
        expired: {
          edit: {
            title: 'Confirm Edit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to edit this expired quote?',
            warningNote:
              'This Quote is expired. Editing this quote will prevent checkout until new edits are approved.',
          },
          requote: {
            title: 'Recreate Quote Request {{ code }}?',
            confirmNote:
              'Are you sure you want to recreate this quote request?',
            warningNote:
              'This Quote is expired. Re-quoting it will create a new quote request with same contents, which can be edited and submitted for approval afterwards.',
          },
        },
        seller: {
          submit: {
            title: 'Submit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to submit this quote?',
            warningNote:
              'Depending on the total value of the quote, an additional approval might be required before the buyer can check out this quote.',
            successMessage: 'Quote submitted successfully',
          },
        },
        approver: {
          approve: {
            title: 'Approve Quote {{ code }}?',
            confirmNote: 'Are you sure you want to approve this quote?',
            successMessage: 'Quote approved successfully',
          },
          reject: {
            title: 'Reject Quote {{ code }}?',
            confirmNote: 'Are you sure you want to reject this quote?',
            successMessage: 'Quote rejected',
          },
        },
      },
    },
    comments: {
      title: 'Contact',
      invalidComment: 'Invalid Input - Please type again...',
      allProducts: 'All Products',
    },
    commons: {
      requestQuote: 'Request Quote',
      cart: 'Cart',
      minRequestInitiationNote:
        'Minimum ${{minValue}} subtotal is required to submit a quote ',
    },
    header: {
      overview: {
        id: 'Quote ID',
        status: 'Status',
        information: 'Quote Information',
        name: 'Name',
        created: 'Created',
        lastUpdated: 'Last Updated',
        estimatedTotal: 'Estimated Total',
        total: 'Total',
        description: 'Description',
        estimateAndDate: 'Estimated & Date',
        update: 'Update',
        expirationTime: 'Expiry Date',
        charactersLeft: 'characters left: {{count}}',
      },
      sellerEdit: {
        apply: 'Apply',
        discount: 'Discount',
        expiryDate: 'Expiry Date',
        discountValidationText: 'Enter a valid absolute discount',
      },
    },
    httpHandlers: {
      cartValidationIssue:
        'Quote request not possible because we found problems with your entries. Please review your cart.',
      quoteCartIssue:
        'Not possible to do changes to cart entries. Proceed to checkout',
      absoluteDiscountIssue:
        'Choose a discount that does not exceed the total value',
      expirationDateIssue: 'Choose an expiration date in the future',
      threshold: {
        underThresholdError:
          'Total price of requested quote does not meet the minimum threshold',
      },
      expired:
        'This quote has expired. You must resubmit your quote request to receive another vendor quote.',
    },
    list: {
      name: 'Name',
      updated: 'Updated',
      sortBy: 'Sort by',
      sortOrders: 'Sort orders',
      empty: 'We have no quote records for this account.',
      quoteId: 'Quote ID',
      status: 'Status',
    },
    states: {
      BUYER_DRAFT: 'Draft',
      BUYER_SUBMITTED: 'Submitted',
      BUYER_ACCEPTED: 'Accepted',
      BUYER_APPROVED: 'Approved',
      BUYER_REJECTED: 'Rejected',
      BUYER_OFFER: 'Vendor Quote',
      BUYER_ORDERED: 'Ordered',
      SELLER_DRAFT: 'Draft',
      SELLER_REQUEST: 'Requested',
      SELLER_SUBMITTED: 'Submitted',
      SELLERAPPROVER_DRAFT: 'Draft',
      SELLERAPPROVER_PENDING: 'Pending Approval',
      SELLERAPPROVER_APPROVED: 'Approved',
      SELLERAPPROVER_REJECTED: 'Rejected',
      CREATED: 'Created',
      CANCELLED: 'Cancelled',
      EXPIRED: 'Expired',
    },
  },
};
