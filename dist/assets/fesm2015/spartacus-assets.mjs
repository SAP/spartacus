/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const translationChunksConfig = {
    common: [
        'common',
        'spinner',
        'searchBox',
        'navigation',
        'sorting',
        'httpHandlers',
        'pageMetaResolver',
        'miniCart',
        'skipLink',
        'formErrors',
        'errorHandlers',
        'carousel',
        'assistiveMessage',
        'passwordVisibility',
        'generalErrors',
        'chatMessaging',
    ],
    address: [
        'addressForm',
        'addressBook',
        'addressCard',
        'addressSuggestion',
        'addressMessages',
    ],
    payment: [
        'paymentForm',
        'paymentMethods',
        'paymentCard',
        'paymentTypes',
        'paymentMessages',
    ],
    myAccount: [
        'orderDetails',
        'orderHistory',
        'closeAccount',
        'updatePasswordForm',
        'updateProfileForm',
        'consentManagementForm',
        'myCoupons',
        'notificationPreference',
        'myInterests',
        'AccountOrderHistoryTabContainer',
        'returnRequestList',
        'returnRequest',
    ],
    pwa: ['pwa'],
    product: [
        'productDetails',
        'productList',
        'productFacetNavigation',
        'productCarousel',
        'productSummary',
        'productReview',
        'addToCart',
        'addToWishList',
        'CMSTabParagraphContainer',
        'stockNotification',
        'TabPanelContainer',
        'itemCounter',
        'productView',
    ],
    user: ['anonymousConsents', 'loginRegister', 'checkoutLogin', 'authMessages'],
    video: ['player'],
    deliveryMode: ['setDeliveryMode'],
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const address = {
    addressForm: {
        title: 'Title',
        defaultTitle: 'Title',
        firstName: {
            label: 'First name',
            placeholder: 'First Name',
        },
        lastName: {
            label: 'Last name',
            placeholder: 'Last Name',
        },
        address1: 'Address 1',
        address2: 'Address 2 (optional)',
        country: 'Country/Region',
        city: {
            label: 'City',
            placeholder: 'City',
        },
        state: 'State',
        zipCode: {
            label: 'Zip code',
            placeholder: 'Postal Code/Zip',
        },
        phoneNumber: {
            label: 'Phone number (optional)',
            placeholder: '(555) 555 - 0123',
        },
        cellphone: {
            label: 'Mobile number (optional)',
            placeholder: '(555) 555 - 0123',
        },
        saveAsDefault: 'Save as default',
        chooseAddress: 'Choose address',
        streetAddress: 'Street Address',
        aptSuite: 'Apt, Suite',
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
        phoneNumber: 'P',
        mobileNumber: 'M',
    },
    addressSuggestion: {
        verifyYourAddress: 'Verify your address',
        ensureAccuracySuggestChange: 'To ensure delivery accuracy, we suggest the change selected below.',
        chooseAddressToUse: 'Please choose which address you would like to use:',
        suggestedAddress: 'Suggested address',
        enteredAddress: 'Entered address',
        editAddress: 'Edit address',
        saveAddress: 'Save address',
    },
    addressMessages: {
        setAsDefaultSuccessfully: 'Address {{ streetAddress }} was successfully set as default',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const common = {
    common: {
        cancel: 'Cancel',
        delete: 'Delete',
        remove: 'Remove',
        edit: 'Edit',
        restore: 'Restore',
        back: 'Back',
        submit: 'Submit',
        continue: 'Continue',
        save: 'Save',
        done: 'Done',
        home: 'Home',
        noData: 'No data.',
        confirm: 'Confirm',
        more: 'more',
        close: 'Close',
        loading: 'Loading',
        menu: 'Menu',
        reset: 'Reset',
        search: 'Search',
        add: 'Add',
        breadcrumbs: 'breadcrumbs',
        selectFile: 'Select file',
        clear: 'Clear',
        loaded: 'Loaded',
        results: 'Results',
        of: 'of',
    },
    pageMetaResolver: {
        category: {
            title: '{{count}} result for {{query}}',
            title_other: '{{count}} results for {{query}}',
        },
        checkout: {
            title: 'Checkout',
        },
        search: {
            title: '{{count}} result for "{{query}}"',
            title_other: '{{count}} results for "{{query}}"',
            findProductTitle: '{{count}} result for coupon "{{coupon}}"',
            findProductTitle_other: '{{count}} results for coupon "{{coupon}}"',
            default_title: 'All products',
        },
        product: {
            description: '{{description}}',
            heading: '{{heading}}',
            title: '{{title}}',
        },
    },
    spinner: {
        loading: 'Loading...',
    },
    navigation: {
        categoryNavLabel: 'Category menu',
        footerNavLabel: 'Footer links',
        navigateTo: 'Navigate to {{nav}}',
        scrollToTop: 'Scroll back to the top of the page',
    },
    searchBox: {
        placeholder: 'Enter product name or SKU',
        productSearch: 'Find a product',
        ariaLabelInput: 'Search here...',
        ariaLabelSuggestions: 'typing suggestions',
        ariaLabelProducts: 'product results',
        initialDescription: 'When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.',
        suggestionsResult: '{{ count }} suggestion and ',
        suggestionsResult_other: '{{ count }} suggestions and ',
        productsResult: '{{ count }} product is available.',
        productsResult_other: '{{ count }} products are available.',
        resetLabel: 'Reset Search',
        help: {
            insufficientChars: 'Please type more characters',
            noMatch: 'We could not find any results',
            exactMatch: '{{ term }}',
            empty: 'Ask us anything',
        },
    },
    sorting: {
        date: 'Date',
        orderNumber: 'Order Number',
        rma: 'Return Number',
        replenishmentNumber: 'Replenishment Number',
        nextOrderDate: 'Next Order Date',
        pageViewUpdated: 'Page view updated with your selected options.',
    },
    httpHandlers: {
        badRequest: {
            bad_credentials: '{{ errorMessage }}. Please login again.',
            user_is_disabled: '{{ errorMessage }}. Please contact administration.',
        },
        badGateway: 'A server error occurred. Please try again later.',
        badRequestPleaseLoginAgain: '{{ errorMessage }}. Please login again.',
        badRequestOldPasswordIncorrect: 'Old password incorrect.',
        badRequestGuestDuplicateEmail: '{{ errorMessage }} email already exist. Please checkout with a different email to register using a guest account.',
        conflict: 'Already exists.',
        forbidden: 'You are not authorized to perform this action. Please contact your administrator if you think this is a mistake.',
        gatewayTimeout: 'The server did not respond, please try again later.',
        internalServerError: 'An Internal Server Error occurred. Please try again later.',
        sessionExpired: 'Your session has expired. Please login again.',
        unknownError: 'An unknown error occurred',
        unauthorized: {
            common: 'An unknown authorization error occured',
            invalid_client: 'Bad client credentials',
        },
        validationErrors: {
            missing: {
                card_cardType: 'The selected credit card is not supported. Please select another.',
                card_accountNumber: 'The credit card number entered is not valid.',
                card_cvNumber: 'The security code entered is not valid.',
                card_expirationMonth: 'The credit card expiration date entered is not valid.',
                card_expirationYear: 'The credit card expiration date entered is not valid.',
                billTo_firstName: 'The first name entered is not valid.',
                billTo_lastName: 'The last name entered is not valid.',
                billTo_street1: 'The address entered is not valid.',
                billTo_street2: 'The address entered is not valid.',
                billTo_city: 'The city entered is not valid for this credit card.',
                billTo_state: 'The state/province entered is not valid for this credit card.',
                billTo_country: 'The country/region entered is not valid for this credit card.',
                billTo_postalCode: 'The zip/postal code is not valid for this credit card.',
                country: {
                    isocode: 'Missing country/region',
                },
            },
            invalid: {
                card_expirationMonth: 'The credit card expiration date entered is not valid.',
                firstName: 'First Name entered is not valid.',
                lastName: 'Last Name entered is not valid.',
                password: 'Password entered is not valid.',
                uid: 'UID is not valid.',
                code: 'Code is not valid.',
                email: 'Email is not valid.',
            },
        },
        cartNotFound: 'Cart not found.',
        invalidCodeProvided: 'Invalid code provided.',
        voucherExceeded: 'This coupon has exceeded the number of times it can be used',
        unknownIdentifier: 'Item not found.',
        otherCartErrors: 'Cart errors occurred.',
    },
    miniCart: {
        item: '{{count}} item currently in your cart',
        item_other: '{{count}} items currently in your cart',
        total: '{{total}}',
        count: '{{count}}',
    },
    skipLink: {
        skipTo: 'Skip to',
        labels: {
            header: 'Header',
            main: 'Main Content',
            footer: 'Footer',
            productFacets: 'Product Facets',
            productList: 'Product List',
        },
    },
    carousel: {
        previousSlide: 'Previous slide',
        nextSlide: 'Next slide',
        slideNumber: 'Slide {{currentSlideNumber}}',
        carouselForProduct: 'Carousel, Images for {{product}}',
    },
    formErrors: {
        globalMessage: 'The form you are trying to submit contains errors.',
        required: 'This field is required',
        cxInvalidEmail: 'This is not a valid email format',
        cxInvalidPassword: 'This is not a valid password format',
        cxPasswordsMustMatch: 'Password fields must match',
        cxEmailsMustMatch: 'Email fields must match',
        cxStarRatingEmpty: 'Rating field is required',
        cxNoSelectedItemToCancel: 'Select at least one item',
        cxNegativeAmount: 'Amount must be equal or greater than zero',
        cxContainsSpecialCharacters: 'Field cannot contain special characters',
        date: {
            required: 'This field is required',
            min: 'Date cannot be before {{min}}',
            max: 'Date cannot be after {{max}}',
            pattern: 'Use dateformat yyyy-mm-dd',
            invalid: 'Use a valid date',
        },
        file: {
            required: 'File is required',
            empty: 'File should not be empty',
            invalidExtension: 'File extension is not valid',
            tooLarge: 'File size should not exceed {{ maxSize }} MB',
            tooManyEntries: 'The number of items is greater than {{ maxEntries }}',
            notParsable: 'File is not parsable',
            fileNotAllowed: 'This file type is not allowed',
        },
    },
    errorHandlers: {
        scriptFailedToLoad: 'Failed to load the script.',
        refreshThePage: 'Please refresh the page.',
    },
    assistiveMessage: {
        actionCancelled: 'Action cancelled, nothing changed',
    },
    passwordVisibility: {
        showPassword: 'Show password',
        hidePassword: 'Hide password',
    },
    generalErrors: {
        pageFailure: 'The page could not be loaded. Please try again later.',
    },
    chatMessaging: {
        charactersLeft: 'characters left: {{count}}',
        addNewMessage: 'Add New Message',
        send: 'Send',
        uploadFile: 'Upload File',
        informationLabel: '{{author}}. {{text}} at {{date}}',
        messages: 'Messages',
        addMessagePlaceHolder: 'Start Typing...',
        characterLimitAlert: 'Characters limit reached.',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const deliveryMode = {
    setDeliveryMode: {
        unknownError: 'An unknown error occurred. Please contact support.',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const myAccount = {
    closeAccount: {
        confirmAccountClosure: 'Confirm Account Closure',
        confirmAccountClosureMessage: 'Are you sure you want to close your account?',
        closeMyAccount: 'CLOSE MY ACCOUNT',
        accountClosedSuccessfully: 'Account closed with success',
        accountClosedFailure: 'Failed to close account',
    },
    updatePasswordForm: {
        oldPassword: {
            label: 'Old Password',
            placeholder: 'Old Password',
        },
        oldPasswordIsRequired: 'Old password is required.',
        newPassword: {
            label: 'New Password',
            placeholder: 'New Password',
        },
        passwordMinRequirements: 'Password must be six characters minimum, with one uppercase letter, one number, one symbol',
        confirmPassword: {
            label: 'Confirm New Password',
            placeholder: 'Confirm Password',
        },
        bothPasswordMustMatch: 'Both password must match',
        passwordUpdateSuccess: 'Password updated with success',
        accessDeniedError: 'Access is denied',
    },
    updateProfileForm: {
        title: 'Title',
        none: '',
        firstName: {
            label: 'First name',
            placeholder: 'First name',
        },
        firstNameIsRequired: 'First name is required.',
        lastName: {
            label: 'Last name',
            placeholder: 'Last name',
        },
        lastNameIsRequired: 'Last name is required.',
        profileUpdateSuccess: 'Personal details successfully updated',
        customerId: 'Customer #',
    },
    consentManagementForm: {
        clearAll: 'Clear all',
        selectAll: 'Select all',
        message: {
            success: {
                given: 'Consent successfully given.',
                withdrawn: 'Consent successfully withdrawn.',
            },
        },
    },
    myCoupons: {
        noCouponsMessage: 'You have no coupons available.',
        effectiveTitle: 'Effective:',
        Effective: 'EFFECTIVE',
        PreSession: 'EFFECTIVE SOON',
        ExpireSoon: 'EXPIRING SOON',
        readMore: 'Read more',
        notification: 'Notification',
        findProducts: 'Find Products',
        status: 'Status:',
        dialogTitle: 'Coupon',
        claimCustomerCoupon: 'You have successfully claimed this coupon.',
        myCoupons: 'My coupons',
        startDateAsc: 'Start Date (ascending)',
        startDateDesc: 'Start Date (descending)',
        endDateAsc: 'End Date (ascending)',
        endDateDesc: 'End Date (descending)',
        sortBy: 'Sort by',
        sortCoupons: 'Sort coupons',
        notesPreffix: 'You can set your preferred channels for receiving coupon notifications on the ',
        notesLink: 'Notification Channels',
        notesSuffix: ' page.',
    },
    notificationPreference: {
        message: 'Select your preferred notification channels',
        note: 'Note: ',
        noteMessage: 'If you deactivate all channels you will not be able to receive any further notifications.',
        EMAIL: 'Email:',
        SMS: 'SMS:',
        SITE_MESSAGE: 'SiteMessage',
    },
    myInterests: {
        header: 'My Interests',
        item: 'ITEM',
        price: 'PRICE',
        notifications: 'NOTIFICATIONS',
        noInterests: 'You have no registered interests yet.',
        inStock: 'In Stock',
        lowStock: 'Low Stock',
        outOfStock: 'Out of Stock',
        BACK_IN_STOCK: 'Back In Stock',
        sortBy: 'Sort by',
        sortInterests: 'Sort interests',
        expirationDate: ' - Till {{ expirationDate }}',
        productId: 'ID {{ code }}',
        remove: 'Remove',
        sorting: {
            byNameAsc: 'Name (ascending)',
            byNameDesc: 'Name (descending)',
        },
        actions: 'ACTIONS',
        caption: 'My Interests contents.',
        itemRemoved: 'Selected item has been removed.',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const payment = {
    paymentForm: {
        payment: 'Payment',
        choosePaymentMethod: 'Choose a payment method',
        paymentType: 'Payment Type',
        accountHolderName: {
            label: 'Account Holder Name',
            placeholder: 'Account Holder Name',
        },
        cardNumber: 'Card Number',
        expirationDate: 'Expiration Date',
        securityCode: 'Security code (CVV)',
        securityCodeTitle: 'Card Verification Value',
        saveAsDefault: 'Save as default',
        setAsDefault: 'Set as default payment method',
        billingAddress: 'Billing address',
        sameAsDeliveryAddress: 'Same as delivery address',
        billingAddressSameAsShipping: 'Billing address is the same as delivery address',
        selectOne: 'Select One...',
        monthMask: 'MM',
        yearMask: 'YYYY',
        expirationYear: 'Expiration year {{ selected }}',
        expirationMonth: 'Expiration month {{ selected }}',
        useThisPayment: 'Use this payment',
        addNewPayment: 'Add New Payment',
        paymentAddedSuccessfully: 'New payment was added successfully',
        changePayment: 'Change Payment',
    },
    paymentMethods: {
        paymentMethods: 'Payment methods',
        paymentMethodSelected: 'Payment method selected',
        newPaymentMethodsAreAddedDuringCheckout: 'New payment methods are added during checkout.',
        invalidField: 'InvalidField: {{ field }}',
    },
    paymentCard: {
        deleteConfirmation: 'Are you sure you want to delete this payment method?',
        setAsDefault: 'Set as default',
        expires: 'Expires: {{ month }}/{{ year }}',
        defaultPaymentMethod: '✓ DEFAULT',
        defaultPaymentLabel: 'Default payment method',
        additionalPaymentLabel: 'Additional payment method {{ number }}',
        selected: 'Selected',
        deletePaymentSuccess: 'Payment method deleted successfully',
    },
    paymentTypes: {
        title: 'Payment method',
        paymentType_CARD: 'Credit Card',
        paymentType_ACCOUNT: 'Account',
    },
    paymentMessages: {
        setAsDefaultSuccessfully: 'New payment was successfully set as default',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const pdf = {
    pdf: {
        defaultTitle: 'Document',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const product = {
    productDetails: {
        id: 'ID',
        quantity: 'Qty',
        productDetails: 'Product Details',
        specification: 'Specs',
        reviews: 'Reviews',
        shipping: 'Shipping',
        share: 'Share',
        showReviews: 'Show reviews',
        noReviews: 'No reviews yet',
        productPrice: 'Product price',
        noProductImage: 'No image available, {{ product }}',
    },
    productList: {
        filterBy: {
            label: 'Filter by',
            action: 'Filter by',
        },
        activeFilter: '{{filter}} filter, clicking on this button will remove the filter',
        appliedFilter: 'Applied filter:',
        showLess: 'Show less...',
        showMore: 'Show more...',
        sortBy: 'Sort by',
        sortResults: 'Sort results',
        backToTopBtn: 'BACK TO TOP',
        showMoreBtn: 'SHOW MORE',
        productSearchPagination: 'Product search pagination',
        productListResults: 'Product Results List',
    },
    productFacetNavigation: {
        filterBy: {
            label: 'Filter by',
            action: 'Filter by',
            facet: 'Filter results by Facets',
            name: 'Filter by {{name}}',
        },
        appliedFilter: 'Applied filter:',
        showLess: 'Show less...',
        showMore: 'Show more...',
        sortBy: 'Sort by',
        ariaLabelShowLess: 'Show Less, button, clicking on this button will reduce options for the active group',
        ariaLabelShowMore: 'Show more, button, clicking on this button will show all options for the active group',
        ariaLabelItemsAvailable: '{{name}}, {{state}} {{count}} item available',
        ariaLabelItemsAvailable_other: '{{name}}, {{state}} {{count}} items available',
        decreaseOptionsVisibility: 'Options were hidden from the active group, tab backward to read them or forward for the next group',
        increaseOptionsVisibility: 'More options were added to the active group, tab backward to read them or forward for the next group',
    },
    productSummary: {
        id: 'ID',
        showReviews: 'Show reviews',
        showReviewsDetailed: 'Show {{count}} reviews, Rated {{rating}} out of 5 stars',
        share: 'Share',
        newItemPrice: 'New item price',
    },
    productReview: {
        overallRating: 'Overall Rating',
        reviewTitle: 'Review Title',
        writeYourComments: 'Write your comments',
        rating: 'Rating',
        ratingRequired: 'Product rating, required',
        addRate: 'Add rate: {{count}} star',
        addRate_other: 'Add rate: {{count}} stars',
        reviewerName: 'Reviewer name (optional)',
        writeReview: 'Write a Review',
        more: 'Show More Reviews',
        less: 'Show Less Reviews',
        thankYouForReview: 'Thank you for the review! Note that reviews may require review before appearing here.',
        postReviewFail: 'Something went wrong while posting your review. Please try again later.',
    },
    productCarousel: {
        carouselLabel: 'Carousel, {{title}}',
    },
    addToCart: {
        itemsAddedToYourCart: 'Item(s) added to your cart',
        itemsIncrementedInYourCart: 'This item was already in your cart. The quantity was updated.',
        items: 'items',
        updatingCart: 'Updating cart...',
        addToCart: 'Add to cart',
        viewCart: 'view cart',
        proceedToCheckout: 'proceed to checkout',
        quantity: 'Qty',
        outOfStock: 'Out of stock',
        inStock: 'In stock',
        selectStyleAndSize: 'Select style and size to check stock',
        removeFromCart: 'Remove Product from Cart',
        closeModal: 'Close Modal',
        buyItAgain: 'Buy It Again',
        addToActiveCart: 'Add To Active Cart',
    },
    TabPanelContainer: {
        tabs: {
            ProductDetailsTabComponent: 'Product Details',
            ProductSpecsTabComponent: 'Specs',
            ProductReviewsTabComponent: 'Reviews',
            deliveryTab: 'Shipping',
            SparePartsTabComponent: ' Spare Parts',
        },
        tabPanelContainerRegion: 'Tab group with more product details',
    },
    addToWishList: {
        add: 'Add to Wish List',
        remove: 'Remove from Wish List',
        anonymous: 'Sign in to add to wish list',
        addedToWishList: 'Product added to wish list',
        removedFromWishList: 'Product removed from wish list',
    },
    stockNotification: {
        notifyMe: 'NOTIFY ME',
        stopNotify: 'STOP NOTIFICATION',
        getNotify: 'Get notified when this product is available.',
        getNotifySuffix: 'to get notified when this product is available.',
        activateChannelsPrefix: 'To be notified you need to activate the ',
        channelsLink: 'Notification Channels',
        activateChannelsSuffix: '.',
        notified: 'You will be notified when this product is back in stock.',
        getNotified: 'Get notified when this product is back in stock.',
        unsubscribeSuccess: 'You will not receive back-in-stock notification for this product.',
        subscriptionDialog: {
            header: 'Out of stock subscription',
            notifiedPrefix: 'You will be notified on:',
            notifiedSuffix: 'as soon as this product is back in stock.',
            manageChannelsPrefix: 'Manage your preferred notification channels on the ',
            manageChannelsLink: 'Notification Preference',
            manageChannelsSuffix: ' page.',
            manageSubscriptionsPrefix: 'You can manage your subscriptions on ',
            manageSubscriptionsLink: 'My Interests',
            manageSubscriptionsSuffix: ' page.',
            okBtn: 'OK',
            subscribing: 'Subscribing you to Out of Stock notifications for this product',
        },
    },
    itemCounter: {
        removeOne: 'Remove one',
        addOneMore: 'Add one more',
        quantity: 'Quantity',
    },
    productView: {
        gridView: 'Select to change to Grid View',
        listView: 'Select to change to List View',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const pwa = {
    pwa: {
        addToHomeScreenDescription: 'Add SAP storefront to your device homescreen for a faster return visit',
        noInstallationNeeded: 'No installation needed',
        fastAccessToApplication: 'Fast access to application',
        addToHomeScreen: 'Add to home screen',
        addedToHomeScreen: 'SAP Storefront was added to your home screen',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const user = {
    anonymousConsents: {
        preferences: 'Consent Preferences',
        dialog: {
            title: 'Consent Management',
            legalDescription: "We use cookies/browser's storage to personalize the content and improve user experience. We also might share the data about your site usage with our social media. For more, please review our privacy policy.",
            selectAll: 'Select all',
            clearAll: 'Clear all',
        },
        banner: {
            title: 'This website uses cookies',
            description: "We use cookies/browser's storage to personalize the content and improve user experience.",
            allowAll: 'Allow All',
            viewDetails: 'View Details',
        },
    },
    checkoutLogin: {
        emailAddress: {
            label: 'Email address',
            placeholder: 'Enter email',
        },
        confirmEmail: {
            label: 'Confirm email',
            placeholder: 'Confirm email',
        },
        continue: 'Continue',
        emailIsRequired: 'Invalid email format',
        emailsMustMatch: 'Email does not match',
    },
    authMessages: {
        signedOutSuccessfully: 'You have successfully signed out.',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const video = {
    player: {
        label: 'Video Player',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const en = {
    address,
    common,
    myAccount,
    payment,
    product,
    pwa,
    user,
    video,
    pdf,
    deliveryMode,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const translations = {
    en,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { translationChunksConfig, translations };
//# sourceMappingURL=spartacus-assets.mjs.map
