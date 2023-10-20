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
        a11y: {
          newCart: 'Create new empty cart and navigate to it.',
          quotes: 'Navigate to quote search result list.',
        },
      },
      confirmDialog: {
        name: 'Name:',
        description: 'Description:',
        validity: 'This quote is valid until {{ expirationTime }}',
        option: { yes: 'Yes', no: 'No' },
        buyer: {
          submit: {
            a11y: {
              close: 'Close submit quote modal',
            },
            title: 'Submit Quote Request {{ code }}?',
            confirmNote: 'Are you sure you want to submit this quote request?',
            successMessage: 'Quote request submitted successfully',
          },
          cancel: {
            a11y: {
              close: 'Close cancel quote modal',
            },
            title: 'Cancel Quote Request {{ code }}?',
            confirmNote: 'Are you sure you want to cancel this quote request?',
            successMessage: 'Quote request cancelled',
          },
        },
        buyer_offer: {
          edit: {
            a11y: {
              close: 'Close edit quote modal',
            },
            title: 'Confirm Edit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to edit this approved quote?',
            warningNote:
              'This Quote has been Approved. Editing this Quote will prevent Checkout until new edits are approved.',
          },
          cancel: {
            a11y: {
              close: 'Close cancel quote modal',
            },
            title: 'Cancel Quote {{ code }}?',
            confirmNote: 'Are you sure you want to cancel this quote?',
            successMessage: 'Quote cancelled',
          },
          checkout: {
            a11y: {
              close: 'Close checkout quote modal',
            },
            title: 'Checkout Quote {{ code }}?',
            confirmNote:
              'Are you sure you want to accept and checkout this quote?',
          },
        },
        expired: {
          edit: {
            a11y: {
              close: 'Close edit quote modal',
            },
            title: 'Confirm Edit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to edit this expired quote?',
            warningNote:
              'This Quote is expired. Editing this quote will prevent checkout until new edits are approved.',
          },
          requote: {
            a11y: {
              close: 'Close requote modal',
            },
            title: 'Recreate Quote Request {{ code }}?',
            confirmNote:
              'Are you sure you want to recreate this quote request?',
            warningNote:
              'This Quote is expired. Re-quoting it will create a new quote request with same contents, which can be edited and submitted for approval afterwards.',
          },
        },
        seller: {
          submit: {
            a11y: {
              close: 'Close submit quote modal',
            },
            title: 'Submit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to submit this quote?',
            warningNote:
              'Depending on the total value of the quote, an additional approval might be required before the buyer can check out this quote.',
            successMessage: 'Quote submitted successfully',
          },
        },
        sellerapprover: {
          approve: {
            a11y: {
              close: 'Close approve quote modal',
            },
            title: 'Approve Quote {{ code }}?',
            confirmNote: 'Are you sure you want to approve this quote?',
            successMessage: 'Quote approved successfully',
          },
          reject: {
            a11y: {
              close: 'Close reject quote modal',
            },
            title: 'Reject Quote {{ code }}?',
            confirmNote: 'Are you sure you want to reject this quote?',
            successMessage: 'Quote rejected',
          },
        },
        all: {
          edit: {
            a11y: {
              close: 'Close edit quote modal',
            },
            title: 'Edit Quote {{ code }}?',
            confirmNote: 'Are you sure you want to edit this quote?',
            warningNote:
              'Your current cart will be discarded. In case you still need it, please safe it beforehand.',
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
      buyerEdit: {
        a11y: {
          cancel: 'Cancel editing quote header information',
          save: 'Save quote header information',
        },
      },
      overview: {
        id: 'Quote ID',
        status: 'Status',
        information: 'Quote Information',
        name: 'Name',
        description: 'Description',
        charactersLeft: 'characters left: {{count}}',
        priceAndExpiry: 'Price & Expiry',
        estimatedTotal: 'Estimated Total',
        total: 'Total',
        expirationTime: 'Expiry Date',
        a11y: {
          edit: 'Edit quote header information',
        },
        createdAndUpdated: 'Created & Updated',
        createdDate: 'Created',
        lastUpdatedDate: 'Last Updated',
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
    a11y: {},
  },
};
