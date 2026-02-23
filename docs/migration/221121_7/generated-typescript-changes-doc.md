<!-- Generated file.  Don't update directly -->

# 221121_7 Typescript Breaking Changes

This document contains a list of breaking changes or potentially breaking changes for Spartacus 221121_7.



# Variable asmTranslations
## @spartacus/asm/assets


Variable asmTranslations has been removed and is no longer part of the public API.




# Class AsmBindCartComponent
## @spartacus/asm/components


### Property featureConfig is removed.





# Class CustomerEmulationComponent
## @spartacus/asm/components


### Property featureConfig is removed.





# Class CustomerSelectionComponent
## @spartacus/asm/components


### Property featureConfig is removed.





# Function property
## @spartacus/asm/core


Function property changed.

Previous version:

```

property(
  prop1: P1,
  prop2: P2,
  comparator: Comparator<T[P1][P2]>
): Comparator<T>

```


Current version:

```

property(
  prop: P,
  comparator: Comparator<T[P]>
): Comparator<T>

```




# Variable asmCustomer360Translations
## @spartacus/asm/customer-360/assets


Variable asmCustomer360Translations has been removed and is no longer part of the public API.




# Class AsmConfig
## @spartacus/asm/root


### Property asm changed.


Previous version:

```
asm: {
        agentSessionTimer?: {
            startingDelayInSeconds?: number;
        };
        customerSearch?: {
            maxResults?: number;
        };
        customerList?: {
            pageSize?: number;
            showAvatar?: boolean;
            columns?: {
                headerLocalizationKey: string;
                icon?: {
                    symbol?: ICON_TYPE;
                    captionLocalizationKey?: string;
                };
                renderer?: (customer: User) => string;
                actionType?: CustomerListColumnActionType;
            }[];
        };
        userIdHttpHeader?: {
            enable?: boolean;
        };
    }
```


Current version:

```
asm: {
        agentSessionTimer?: {
            startingDelayInSeconds?: number;
        };
        customerSearch?: {
            maxResults?: number;
        };
        customerList?: {
            pageSize?: number;
            showAvatar?: boolean;
            columns?: {
                headerLocalizationKey: string;
                icon?: {
                    symbol?: ICON_TYPE;
                    captionLocalizationKey?: string;
                };
                renderer?: (customer: User) => string;
                actionType?: CustomerListColumnActionType;
            }[];
        };
        asmSessionSupport?: {
            enabled?: boolean;
        };
        userIdHttpHeader?: {
            enable?: boolean;
        };
        createCustomer?: {
            enable?: boolean;
        };
    }
```




# Variable translations
## @spartacus/assets


Variable translations has been removed and is no longer part of the public API.




# Variable translationsEn
## @spartacus/assets


Variable translationsEn changed.

Previous version:

```
translationsEn: {
    common: {
        common: {
            cancel: string;
            delete: string;
            remove: string;
            edit: string;
            restore: string;
            back: string;
            submit: string;
            continue: string;
            save: string;
            done: string;
            home: string;
            noData: string;
            confirm: string;
            more: string;
            close: string;
            loading: string;
            menu: string;
            reset: string;
            search: string;
            add: string;
            breadcrumbs: string;
            breadcrumbsCurrentPage: string;
            selectFile: string;
            clear: string;
            loaded: string;
            results: string;
            of: string;
            ngSelectDropdownOptionsList: string;
            required: string;
            zoomIn: string;
            zoomOut: string;
            selected: string;
            expand: string;
            collapse: string;
            readMore: string;
            readLess: string;
        };
        pageMetaResolver: {
            category: {
                title: string;
                title_other: string;
            };
            checkout: {
                title: string;
            };
            search: {
                title: string;
                title_other: string;
                findProductTitle: string;
                findProductTitle_other: string;
                default_title: string;
            };
            product: {
                description: string;
                heading: string;
                title: string;
            };
        };
        spinner: {
            loading: string;
        };
        navigation: {
            categoryNavLabel: string;
            footerNavLabel: string;
            goTo: string;
            navigateTo: string;
            scrollToTop: string;
            linkItemInList: string;
            menuButonTitle: string;
        };
        searchBox: {
            placeholder: string;
            productSearch: string;
            ariaLabelInput: string;
            ariaLabelSuggestions: string;
            ariaLabelProducts: string;
            initialDescription: string;
            suggestions: string;
            recentSearches: string;
            trendingSearches: string;
            suggestionsResult: string;
            suggestionsResult_other: string;
            products: string;
            productsResult: string;
            productsResult_other: string;
            resetLabel: string;
            help: {
                insufficientChars: string;
                noMatch: string;
                exactMatch: string;
                empty: string;
            };
            closeSearchPanel: string;
            queryError: string;
        };
        sorting: {
            date: string;
            orderNumber: string;
            rma: string;
            replenishmentNumber: string;
            nextOrderDate: string;
            pageViewUpdated: string;
        };
        customLoginPage: {
            badRequest: {
                bad_credentials: string;
                account_disabled: string;
                unknown_error: string;
            };
        };
        httpHandlers: {
            badRequest: {
                bad_credentials: string;
                password_expired: string;
                user_is_disabled: string;
            };
            badGateway: string;
            badRequestPleaseLoginAgain: string;
            badRequestOldPasswordIncorrect: string;
            badRequestGuestDuplicateEmail: string;
            conflict: string;
            forbidden: string;
            gatewayTimeout: string;
            internalServerError: string;
            sessionExpired: string;
            unknownError: string;
            unauthorized: {
                common: string;
                invalid_client: string;
            };
            validationErrors: {
                missing: {
                    card_cardType: string;
                    card_accountNumber: string;
                    card_cvNumber: string;
                    card_expirationMonth: string;
                    card_expirationYear: string;
                    billTo_firstName: string;
                    billTo_lastName: string;
                    billTo_street1: string;
                    billTo_street2: string;
                    billTo_city: string;
                    billTo_state: string;
                    billTo_country: string;
                    billTo_postalCode: string;
                    country: {
                        isocode: string;
                    };
                };
                invalid: {
                    card_expirationMonth: string;
                    firstName: string;
                    lastName: string;
                    password: string;
                    uid: string;
                    code: string;
                    email: string;
                    loginId: string;
                };
            };
            cartNotFound: string;
            invalidCodeProvided: string;
            voucherExceeded: string;
            unknownIdentifier: string;
            otherCartErrors: string;
        };
        miniCart: {
            item: string;
            item_other: string;
            total: string;
            count: string;
        };
        skipLink: {
            skipTo: string;
            labels: {
                header: string;
                main: string;
                footer: string;
                productFacets: string;
                productList: string;
            };
        };
        carousel: {
            previousSlide: string;
            nextSlide: string;
            scrollForward: string;
            scrollBackward: string;
            slideNumber: string;
            carouselForProduct: string;
        };
        formErrors: {
            labeled: {
                required: string;
                cxInvalidEmail: string;
                cxInvalidPassword: string;
                cxMinOneUpperCaseCharacter: string;
                cxMinOneDigit: string;
                cxMinOneSpecialCharacter: string;
                cxMinSixCharactersLength: string;
                cxMinEightCharactersLength: string;
                cxMaxCharactersLength: string;
                cxContainsSpecialCharacters: string;
                cxNoConsecutiveCharacters: string;
                invalidTokenCodeError: string;
                date: {
                    required: string;
                    min: string;
                    max: string;
                    pattern: string;
                    invalid: string;
                };
            };
            globalMessage: string;
            required: string;
            cxInvalidEmail: string;
            cxInvalidPassword: string;
            cxPasswordsMustMatch: string;
            cxPasswordsCannotMatch: string;
            cxEmailsMustMatch: string;
            cxStarRatingEmpty: string;
            cxNoSelectedItemToCancel: string;
            cxNegativeAmount: string;
            cxContainsSpecialCharacters: string;
            date: {
                required: string;
                min: string;
                max: string;
                pattern: string;
                invalid: string;
            };
            file: {
                required: string;
                empty: string;
                invalidExtension: string;
                tooLarge: string;
                tooManyEntries: string;
                notParsable: string;
                fileNotAllowed: string;
            };
        };
        errorHandlers: {
            scriptFailedToLoad: string;
            refreshThePage: string;
        };
        assistiveMessage: {
            actionCancelled: string;
        };
        passwordVisibility: {
            showPassword: string;
            hidePassword: string;
        };
        generalErrors: {
            pageFailure: string;
        };
        formLegend: {
            required: string;
        };
        chatMessaging: {
            charactersLeft: string;
            addNewMessage: string;
            send: string;
            uploadFile: string;
            informationLabel: string;
            messages: string;
            addMessagePlaceHolder: string;
            characterLimitAlert: string;
            a11y: {
                itemListBoxLabel: string;
            };
        };
    };
    deliveryMode: {
        setDeliveryMode: {
            unknownError: string;
        };
    };
    myAccountV2Consent: {
        myAccountV2Consent: {
            header: string;
            dateDescription: string;
            clearAll: string;
            selectAll: string;
            message: {
                success: {
                    given: string;
                    withdrawn: string;
                };
            };
        };
    };
    myAccountV2NotificationPreference: {
        myAccountV2NotificationPreference: {
            header: string;
            message: string;
            note: string;
            noteMessage: string;
            EMAIL: string;
        };
    };
    myAccount: {
        closeAccount: {
            confirmAccountClosure: string;
            confirmAccountClosureMessage: string;
            closeMyAccount: string;
            accountClosedSuccessfully: string;
            accountClosedFailure: string;
        };
        updatePasswordForm: {
            oldPassword: {
                label: string;
                placeholder: string;
            };
            oldPasswordIsRequired: string;
            newPassword: {
                label: string;
                placeholder: string;
            };
            passwordMinRequirements: string;
            passwordStrengthRequirements: string;
            confirmPassword: {
                label: string;
                placeholder: string;
            };
            bothPasswordMustMatch: string;
            passwordUpdateSuccess: string;
            accessDeniedError: string;
        };
        updateProfileForm: {
            title: string;
            none: string;
            firstName: {
                label: string;
                placeholder: string;
            };
            firstNameIsRequired: string;
            lastName: {
                label: string;
                placeholder: string;
            };
            lastNameIsRequired: string;
            profileUpdateSuccess: string;
            customerId: string;
        };
        consentManagementForm: {
            clearAll: string;
            selectAll: string;
            message: {
                success: {
                    given: string;
                    withdrawn: string;
                };
            };
        };
        myCoupons: {
            noCouponsMessage: string;
            effectiveTitle: string;
            Effective: string;
            PreSession: string;
            ExpireSoon: string;
            readMore: string;
            notification: string;
            findProducts: string;
            status: string;
            dialogTitle: string;
            claimCoupondialogTitle: string;
            claimCouponCode: {
                label: string;
                placeholder: string;
            };
            reset: string;
            claim: string;
            claimCustomerCoupon: string;
            myCoupons: string;
            startDateAsc: string;
            startDateDesc: string;
            endDateAsc: string;
            endDateDesc: string;
            sortBy: string;
            sortCoupons: string;
            notesPreffix: string;
            notesLink: string;
            notesSuffix: string;
        };
        notificationPreference: {
            message: string;
            note: string;
            noteMessage: string;
            EMAIL: string;
            SMS: string;
            SITE_MESSAGE: string;
        };
        myInterests: {
            header: string;
            item: string;
            price: string;
            notifications: string;
            noInterests: string;
            inStock: string;
            lowStock: string;
            outOfStock: string;
            BACK_IN_STOCK: string;
            sortBy: string;
            sortInterests: string;
            expirationDate: string;
            productId: string;
            remove: string;
            sorting: {
                byNameAsc: string;
                byNameDesc: string;
            };
            actions: string;
            caption: string;
            itemRemoved: string;
        };
    };
    payment: {
        paymentForm: {
            payment: string;
            choosePaymentMethod: string;
            paymentType: string;
            accountHolderName: {
                label: string;
                placeholder: string;
            };
            cardNumber: string;
            expirationDate: string;
            securityCode: string;
            securityCodeTitle: string;
            saveAsDefault: string;
            setAsDefault: string;
            billingAddress: string;
            editBillingAddress: string;
            sameAsDeliveryAddress: string;
            billingAddressSameAsShipping: string;
            selectOne: string;
            monthMask: string;
            yearMask: string;
            expirationYear: string;
            expirationMonth: string;
            useThisPayment: string;
            addNewPayment: string;
            paymentAddedSuccessfully: string;
            changePayment: string;
        };
        paymentMethods: {
            paymentMethods: string;
            paymentMethodSelected: string;
            newPaymentMethodsAreAddedDuringCheckout: string;
            invalidField: string;
        };
        paymentCard: {
            deleteConfirmation: string;
            setAsDefault: string;
            expires: string;
            defaultPaymentMethod: string;
            defaultPaymentLabel: string;
            additionalPaymentLabel: string;
            selected: string;
            selectedPayment: string;
            deletePaymentSuccess: string;
            visa: string;
            master: string;
            masterEuro: string;
            dinersClub: string;
            switch: string;
            maestro: string;
            amex: string;
            credit: string;
        };
        paymentTypes: {
            title: string;
            paymentType_CARD: string;
            paymentType_ACCOUNT: string;
        };
        paymentMessages: {
            setAsDefaultSuccessfully: string;
        };
    };
    pdf: {
        pdf: {
            defaultTitle: string;
        };
    };
    product: {
        productDetails: {
            id: string;
            quantity: string;
            quantityFull: string;
            productDetails: string;
            specification: string;
            reviews: string;
            shipping: string;
            share: string;
            showReviews: string;
            noReviews: string;
            productPrice: string;
            noProductImage: string;
        };
        productList: {
            filterBy: {
                label: string;
                action: string;
            };
            activeFilter: string;
            appliedFilter: string;
            showLess: string;
            showMore: string;
            sortBy: string;
            sortResults: string;
            backToTopBtn: string;
            showMoreBtn: string;
            productSearchPagination: string;
            productListResults: string;
        };
        productFacetNavigation: {
            filterBy: {
                label: string;
                action: string;
                facet: string;
                name: string;
            };
            appliedFilter: string;
            showLess: string;
            showMore: string;
            sortBy: string;
            ariaLabelShowLess: string;
            ariaLabelShowMore: string;
            ariaLabelItemsAvailable: string;
            ariaLabelItemsAvailable_other: string;
            decreaseOptionsVisibility: string;
            increaseOptionsVisibility: string;
            backToResults: string;
            productFacets: string;
        };
        productSummary: {
            id: string;
            showReviews: string;
            showReviewsDetailed: string;
            share: string;
            newItemPrice: string;
        };
        productReview: {
            overallRating: string;
            reviewTitle: string;
            writeYourComments: string;
            commentPlaceholder: string;
            rating: string;
            ratingRequired: string;
            addRate: string;
            addRate_other: string;
            reviewerName: string;
            writeReview: string;
            more: string;
            less: string;
            thankYouForReview: string;
            postReviewFail: string;
            ratedOutOf: string;
            charactersLeft: string;
        };
        productCarousel: {
            carouselLabel: string;
        };
        addToCart: {
            itemAddedToYourCart: string;
            itemsAddedToYourCart: string;
            itemsIncrementedInYourCart: string;
            items: string;
            updatingCart: string;
            addToCart: string;
            viewCart: string;
            proceedToCheckout: string;
            quantity: string;
            quantityFull: string;
            outOfStock: string;
            inStock: string;
            selectStyleAndSize: string;
            removeFromCart: string;
            closeModal: string;
            buyItAgain: string;
            addToActiveCart: string;
            unavailable: string;
        };
        TabPanelContainer: {
            tabs: {
                ProductDetailsTabComponent: string;
                ProductSpecsTabComponent: string;
                ProductReviewsTabComponent: string;
                deliveryTab: string;
                SparePartsTabComponent: string;
            };
            tabPanelContainerRegion: string;
            tabPanelContainerRegionGroup: string;
        };
        addToWishList: {
            add: string;
            remove: string;
            anonymous: string;
            addedToWishList: string;
            removedFromWishList: string;
        };
        stockNotification: {
            notifyMe: string;
            stopNotify: string;
            getNotify: string;
            getNotifySuffix: string;
            activateChannelsPrefix: string;
            channelsLink: string;
            activateChannelsSuffix: string;
            notified: string;
            getNotified: string;
            unsubscribeSuccess: string;
            subscriptionDialog: {
                header: string;
                notifiedPrefix: string;
                notifiedSuffix: string;
                manageChannelsPrefix: string;
                manageChannelsLink: string;
                manageChannelsSuffix: string;
                manageSubscriptionsPrefix: string;
                manageSubscriptionsLink: string;
                manageSubscriptionsSuffix: string;
                okBtn: string;
                subscribing: string;
            };
        };
        itemCounter: {
            removeOne: string;
            addOneMore: string;
            quantity: string;
        };
        productView: {
            gridView: string;
            listView: string;
        };
    };
    pwa: {
        pwa: {
            addToHomeScreenDescription: string;
            noInstallationNeeded: string;
            fastAccessToApplication: string;
            addToHomeScreen: string;
            addedToHomeScreen: string;
        };
    };
    siteThemeSwitcher: {
        siteThemeSwitcher: {
            theme: string;
            themes: {
                default: string;
                highContrastDark: string;
                highContrastLight: string;
            };
        };
    };
    user: {
        anonymousConsents: {
            dialog: {
                title: string;
                legalDescription: string;
                selectAll: string;
                clearAll: string;
            };
            banner: {
                title: string;
                description: string;
                allowAll: string;
                viewDetails: string;
                consentManagement: string;
            };
        };
        checkoutLogin: {
            emailAddress: {
                label: string;
                placeholder: string;
            };
            confirmEmail: {
                label: string;
                placeholder: string;
            };
            continue: string;
            emailIsRequired: string;
            emailsMustMatch: string;
        };
        authMessages: {
            signedOutSuccessfully: string;
            unrecoverableError: string;
        };
    };
    video: {
        player: {
            label: string;
        };
    };
}
```


Current version:

```
translationsEn: {
    common: {
        common: {
            cancel: string;
            delete: string;
            remove: string;
            edit: string;
            restore: string;
            back: string;
            submit: string;
            continue: string;
            save: string;
            done: string;
            home: string;
            noData: string;
            confirm: string;
            more: string;
            close: string;
            loading: string;
            menu: string;
            reset: string;
            search: string;
            add: string;
            breadcrumbs: string;
            breadcrumbsCurrentPage: string;
            selectFile: string;
            clear: string;
            loaded: string;
            results: string;
            of: string;
            ngSelectDropdownOptionsList: string;
            required: string;
            zoomIn: string;
            zoomOut: string;
            selected: string;
            expand: string;
            collapse: string;
            readMore: string;
            readLess: string;
            language: string;
            currency: string;
        };
        pageMetaResolver: {
            category: {
                title: string;
                title_other: string;
            };
            checkout: {
                title: string;
            };
            search: {
                title: string;
                title_other: string;
                findProductTitle: string;
                findProductTitle_other: string;
                default_title: string;
            };
            product: {
                description: string;
                heading: string;
                title: string;
            };
        };
        spinner: {
            loading: string;
        };
        navigation: {
            categoryNavLabel: string;
            footerNavLabel: string;
            goTo: string;
            navigateTo: string;
            scrollToTop: string;
            linkItemInList: string;
            menuButonTitle: string;
        };
        searchBox: {
            placeholder: string;
            productSearch: string;
            ariaLabelInput: string;
            ariaLabelSuggestions: string;
            ariaLabelProducts: string;
            initialDescription: string;
            suggestions: string;
            recentSearches: string;
            trendingSearches: string;
            suggestionsResult: string;
            suggestionsResult_other: string;
            products: string;
            productsResult: string;
            productsResult_other: string;
            resetLabel: string;
            help: {
                insufficientChars: string;
                noMatch: string;
                exactMatch: string;
                empty: string;
            };
            closeSearchPanel: string;
            queryError: string;
        };
        sorting: {
            date: string;
            orderNumber: string;
            rma: string;
            replenishmentNumber: string;
            nextOrderDate: string;
            pageViewUpdated: string;
        };
        customLoginPage: {
            badRequest: {
                bad_credentials: string;
                account_disabled: string;
                unknown_error: string;
            };
        };
        httpHandlers: {
            badRequest: {
                bad_credentials: string;
                password_expired: string;
                user_is_disabled: string;
            };
            badGateway: string;
            badRequestPleaseLoginAgain: string;
            badRequestOldPasswordIncorrect: string;
            badRequestGuestDuplicateEmail: string;
            conflict: string;
            forbidden: string;
            gatewayTimeout: string;
            internalServerError: string;
            sessionExpired: string;
            unknownError: string;
            unauthorized: {
                common: string;
                invalid_client: string;
            };
            validationErrors: {
                missing: {
                    card_cardType: string;
                    card_accountNumber: string;
                    card_cvNumber: string;
                    card_expirationMonth: string;
                    card_expirationYear: string;
                    billTo_firstName: string;
                    billTo_lastName: string;
                    billTo_street1: string;
                    billTo_street2: string;
                    billTo_city: string;
                    billTo_state: string;
                    billTo_country: string;
                    billTo_postalCode: string;
                    country: {
                        isocode: string;
                    };
                };
                invalid: {
                    card_expirationMonth: string;
                    firstName: string;
                    lastName: string;
                    password: string;
                    uid: string;
                    code: string;
                    email: string;
                    loginId: string;
                };
            };
            cartNotFound: string;
            invalidCodeProvided: string;
            voucherExceeded: string;
            unknownIdentifier: string;
            otherCartErrors: string;
        };
        miniCart: {
            item: string;
            item_other: string;
            total: string;
            count: string;
        };
        skipLink: {
            skipTo: string;
            labels: {
                header: string;
                main: string;
                footer: string;
                productFacets: string;
                productList: string;
            };
        };
        carousel: {
            previousSlide: string;
            nextSlide: string;
            scrollForward: string;
            scrollBackward: string;
            slideNumber: string;
            carouselForProduct: string;
        };
        formErrors: {
            labeled: {
                required: string;
                cxInvalidEmail: string;
                cxInvalidPassword: string;
                cxMinOneUpperCaseCharacter: string;
                cxMinOneDigit: string;
                cxMinOneSpecialCharacter: string;
                cxMinSixCharactersLength: string;
                cxMinEightCharactersLength: string;
                cxMaxCharactersLength: string;
                cxContainsSpecialCharacters: string;
                cxNoConsecutiveCharacters: string;
                invalidTokenCodeError: string;
                date: {
                    required: string;
                    min: string;
                    max: string;
                    pattern: string;
                    invalid: string;
                };
            };
            globalMessage: string;
            required: string;
            cxInvalidEmail: string;
            cxInvalidPassword: string;
            cxPasswordsMustMatch: string;
            cxPasswordsCannotMatch: string;
            cxEmailsMustMatch: string;
            cxStarRatingEmpty: string;
            cxNoSelectedItemToCancel: string;
            cxNegativeAmount: string;
            cxContainsSpecialCharacters: string;
            date: {
                required: string;
                min: string;
                max: string;
                pattern: string;
                invalid: string;
            };
            file: {
                required: string;
                empty: string;
                invalidExtension: string;
                tooLarge: string;
                tooManyEntries: string;
                notParsable: string;
                fileNotAllowed: string;
            };
        };
        errorHandlers: {
            scriptFailedToLoad: string;
            refreshThePage: string;
        };
        assistiveMessage: {
            actionCancelled: string;
        };
        passwordVisibility: {
            showPassword: string;
            hidePassword: string;
        };
        generalErrors: {
            pageFailure: string;
        };
        formLegend: {
            required: string;
        };
        chatMessaging: {
            charactersLeft: string;
            addNewMessage: string;
            send: string;
            uploadFile: string;
            informationLabel: string;
            messages: string;
            addMessagePlaceHolder: string;
            characterLimitAlert: string;
            a11y: {
                itemListBoxLabel: string;
            };
        };
    };
    deliveryMode: {
        setDeliveryMode: {
            unknownError: string;
        };
    };
    myAccountV2Consent: {
        myAccountV2Consent: {
            header: string;
            dateDescription: string;
            clearAll: string;
            selectAll: string;
            message: {
                success: {
                    given: string;
                    withdrawn: string;
                };
            };
        };
    };
    myAccountV2NotificationPreference: {
        myAccountV2NotificationPreference: {
            header: string;
            message: string;
            note: string;
            noteMessage: string;
            EMAIL: string;
        };
    };
    myAccount: {
        closeAccount: {
            confirmAccountClosure: string;
            confirmAccountClosureMessage: string;
            closeMyAccount: string;
            accountClosedSuccessfully: string;
            accountClosedFailure: string;
        };
        updatePasswordForm: {
            oldPassword: {
                label: string;
                placeholder: string;
            };
            oldPasswordIsRequired: string;
            newPassword: {
                label: string;
                placeholder: string;
            };
            passwordMinRequirements: string;
            passwordStrengthRequirements: string;
            confirmPassword: {
                label: string;
                placeholder: string;
            };
            bothPasswordMustMatch: string;
            passwordUpdateSuccess: string;
            accessDeniedError: string;
        };
        updateProfileForm: {
            title: string;
            none: string;
            firstName: {
                label: string;
                placeholder: string;
            };
            firstNameIsRequired: string;
            lastName: {
                label: string;
                placeholder: string;
            };
            lastNameIsRequired: string;
            profileUpdateSuccess: string;
            customerId: string;
        };
        consentManagementForm: {
            clearAll: string;
            selectAll: string;
            message: {
                success: {
                    given: string;
                    withdrawn: string;
                };
            };
        };
        myCoupons: {
            noCouponsMessage: string;
            effectiveTitle: string;
            Effective: string;
            PreSession: string;
            ExpireSoon: string;
            readMore: string;
            notification: string;
            findProducts: string;
            status: string;
            dialogTitle: string;
            claimCoupondialogTitle: string;
            claimCouponCode: {
                label: string;
                placeholder: string;
            };
            reset: string;
            claim: string;
            claimCustomerCoupon: string;
            myCoupons: string;
            startDateAsc: string;
            startDateDesc: string;
            endDateAsc: string;
            endDateDesc: string;
            sortBy: string;
            sortCoupons: string;
            notesPreffix: string;
            notesLink: string;
            notesSuffix: string;
        };
        notificationPreference: {
            message: string;
            note: string;
            noteMessage: string;
            EMAIL: string;
            SMS: string;
            SITE_MESSAGE: string;
        };
        myInterests: {
            header: string;
            item: string;
            price: string;
            notifications: string;
            noInterests: string;
            inStock: string;
            lowStock: string;
            outOfStock: string;
            BACK_IN_STOCK: string;
            sortBy: string;
            sortInterests: string;
            expirationDate: string;
            productId: string;
            remove: string;
            sorting: {
                byNameAsc: string;
                byNameDesc: string;
            };
            actions: string;
            caption: string;
            itemRemoved: string;
        };
    };
    payment: {
        paymentForm: {
            payment: string;
            choosePaymentMethod: string;
            paymentType: string;
            accountHolderName: {
                label: string;
                placeholder: string;
            };
            cardNumber: string;
            expirationDate: string;
            securityCode: string;
            securityCodeTitle: string;
            saveAsDefault: string;
            setAsDefault: string;
            billingAddress: string;
            editBillingAddress: string;
            sameAsDeliveryAddress: string;
            billingAddressSameAsShipping: string;
            selectOne: string;
            monthMask: string;
            yearMask: string;
            expirationYear: string;
            expirationMonth: string;
            useThisPayment: string;
            addNewPayment: string;
            paymentAddedSuccessfully: string;
            changePayment: string;
        };
        paymentMethods: {
            paymentMethods: string;
            paymentMethodSelected: string;
            newPaymentMethodsAreAddedDuringCheckout: string;
            invalidField: string;
        };
        paymentCard: {
            deleteConfirmation: string;
            setAsDefault: string;
            expires: string;
            defaultPaymentMethod: string;
            defaultPaymentLabel: string;
            additionalPaymentLabel: string;
            selected: string;
            selectedPayment: string;
            deletePaymentSuccess: string;
            visa: string;
            master: string;
            masterEuro: string;
            dinersClub: string;
            switch: string;
            maestro: string;
            amex: string;
            credit: string;
        };
        paymentTypes: {
            title: string;
            paymentType_CARD: string;
            paymentType_ACCOUNT: string;
        };
        paymentMessages: {
            setAsDefaultSuccessfully: string;
        };
    };
    pdf: {
        pdf: {
            defaultTitle: string;
        };
    };
    product: {
        productDetails: {
            id: string;
            quantity: string;
            quantityFull: string;
            productDetails: string;
            specification: string;
            reviews: string;
            shipping: string;
            share: string;
            showReviews: string;
            noReviews: string;
            productPrice: string;
            noProductImage: string;
        };
        productList: {
            filterBy: {
                label: string;
                action: string;
            };
            activeFilter: string;
            appliedFilter: string;
            showLess: string;
            showMore: string;
            sortBy: string;
            sortResults: string;
            backToTopBtn: string;
            showMoreBtn: string;
            productSearchPagination: string;
            productListResults: string;
        };
        productFacetNavigation: {
            filterBy: {
                label: string;
                action: string;
                facet: string;
                name: string;
            };
            appliedFilter: string;
            showLess: string;
            showMore: string;
            sortBy: string;
            ariaLabelShowLess: string;
            ariaLabelShowMore: string;
            ariaLabelItemsAvailable: string;
            ariaLabelItemsAvailable_other: string;
            decreaseOptionsVisibility: string;
            increaseOptionsVisibility: string;
            backToResults: string;
            productFacets: string;
        };
        productSummary: {
            id: string;
            showReviews: string;
            showReviewsDetailed: string;
            share: string;
            newItemPrice: string;
        };
        productReview: {
            overallRating: string;
            reviewTitle: string;
            writeYourComments: string;
            commentPlaceholder: string;
            rating: string;
            ratingRequired: string;
            addRate: string;
            addRate_other: string;
            reviewerName: string;
            writeReview: string;
            more: string;
            less: string;
            thankYouForReview: string;
            postReviewFail: string;
            ratedOutOf: string;
            charactersLeft: string;
        };
        productCarousel: {
            carouselLabel: string;
        };
        addToCart: {
            itemAddedToYourCart: string;
            itemsAddedToYourCart: string;
            itemsIncrementedInYourCart: string;
            items: string;
            updatingCart: string;
            addToCart: string;
            viewCart: string;
            proceedToCheckout: string;
            quantity: string;
            quantityFull: string;
            outOfStock: string;
            inStock: string;
            selectStyleAndSize: string;
            removeFromCart: string;
            closeModal: string;
            buyItAgain: string;
            addToActiveCart: string;
            unavailable: string;
        };
        TabPanelContainer: {
            tabs: {
                ProductDetailsTabComponent: string;
                ProductSpecsTabComponent: string;
                ProductReviewsTabComponent: string;
                deliveryTab: string;
                SparePartsTabComponent: string;
            };
            tabPanelContainerRegion: string;
            tabPanelContainerRegionGroup: string;
        };
        addToWishList: {
            add: string;
            remove: string;
            anonymous: string;
            addedToWishList: string;
            removedFromWishList: string;
        };
        stockNotification: {
            notifyMe: string;
            stopNotify: string;
            getNotify: string;
            getNotifySuffix: string;
            activateChannelsPrefix: string;
            channelsLink: string;
            activateChannelsSuffix: string;
            notified: string;
            getNotified: string;
            unsubscribeSuccess: string;
            subscriptionDialog: {
                header: string;
                notifiedPrefix: string;
                notifiedSuffix: string;
                manageChannelsPrefix: string;
                manageChannelsLink: string;
                manageChannelsSuffix: string;
                manageSubscriptionsPrefix: string;
                manageSubscriptionsLink: string;
                manageSubscriptionsSuffix: string;
                okBtn: string;
                subscribing: string;
            };
        };
        itemCounter: {
            removeOne: string;
            addOneMore: string;
            quantity: string;
        };
        productView: {
            gridView: string;
            listView: string;
        };
    };
    pwa: {
        pwa: {
            addToHomeScreenDescription: string;
            noInstallationNeeded: string;
            fastAccessToApplication: string;
            addToHomeScreen: string;
            addedToHomeScreen: string;
        };
    };
    siteThemeSwitcher: {
        siteThemeSwitcher: {
            theme: string;
            themes: {
                default: string;
                highContrastDark: string;
                highContrastLight: string;
            };
        };
    };
    user: {
        anonymousConsents: {
            dialog: {
                title: string;
                legalDescription: string;
                selectAll: string;
                clearAll: string;
            };
            banner: {
                title: string;
                description: string;
                allowAll: string;
                viewDetails: string;
                consentManagement: string;
            };
        };
        checkoutLogin: {
            emailAddress: {
                label: string;
                placeholder: string;
            };
            confirmEmail: {
                label: string;
                placeholder: string;
            };
            continue: string;
            emailIsRequired: string;
            emailsMustMatch: string;
        };
        authMessages: {
            signedOutSuccessfully: string;
            unrecoverableError: string;
        };
    };
    video: {
        player: {
            label: string;
        };
    };
}
```




# Variable cartBaseTranslations
## @spartacus/cart/base/assets


Variable cartBaseTranslations has been removed and is no longer part of the public API.




# Class CartCouponComponent
## @spartacus/cart/base/components


### Property featureConfigService is removed.





# Class CartProceedToCheckoutComponent
## @spartacus/cart/base/components


### Constructor changed.


Previous version:

```

constructor(
  router: Router,
  cd?: ChangeDetectorRef
)

```


Current version:

```

constructor(
  router: Router,
  cd?: ChangeDetectorRef | undefined
)

```




# Variable importExportTranslations
## @spartacus/cart/import-export/assets


Variable importExportTranslations has been removed and is no longer part of the public API.




# Variable quickOrderTranslations
## @spartacus/cart/quick-order/assets


Variable quickOrderTranslations has been removed and is no longer part of the public API.




# Variable savedCartTranslations
## @spartacus/cart/saved-cart/assets


Variable savedCartTranslations has been removed and is no longer part of the public API.




# Variable wishListTranslations
## @spartacus/cart/wish-list/assets


Variable wishListTranslations has been removed and is no longer part of the public API.




# Variable cdcTranslations
## @spartacus/cdc/assets


Variable cdcTranslations has been removed and is no longer part of the public API.




# Variable CDC_USER_PREFERENCE_SERIALIZER
## @spartacus/cdc/root


Variable CDC_USER_PREFERENCE_SERIALIZER has been removed and is no longer part of the public API.




# Class CdcUserConsentService
## @spartacus/cdc/root


### Method updateCdcConsent is removed.





# Class CdcUserPreferenceSerializer
## @spartacus/cdc/root


Class CdcUserPreferenceSerializer has been removed and is no longer part of the public API.




# Class CdcReconsentComponent
## @spartacus/cdc/user-account


### Property totalConsents is removed.





# Class CdcReconsentComponentService
## @spartacus/cdc/user-account


### Method saveConsentAndLogin is removed.





# Class CDCRegisterComponentService
## @spartacus/cdc/user-profile


### Method generatePreferencesObject is removed.





# Variable cdsTranslations
## @spartacus/cds/assets


Variable cdsTranslations has been removed and is no longer part of the public API.




# Variable cdsTranslationChunksConfig
## @spartacus/cds

moved to @spartacus/cds/assets




# Variable cdsTranslations
## @spartacus/cds


Variable cdsTranslations has been removed and is no longer part of the public API.




# Variable checkoutB2BTranslations
## @spartacus/checkout/b2b/assets


Variable checkoutB2BTranslations has been removed and is no longer part of the public API.




# Variable checkoutTranslations
## @spartacus/checkout/base/assets


Variable checkoutTranslations has been removed and is no longer part of the public API.




# Class CheckoutDeliveryAddressComponent
## @spartacus/checkout/base/components


### Property featureConfigService is removed.





# Class CheckoutPaymentMethodComponent
## @spartacus/checkout/base/components


### Property featureConfigService is removed.





# Variable checkoutScheduledReplenishmentTranslations
## @spartacus/checkout/scheduled-replenishment/assets


Variable checkoutScheduledReplenishmentTranslations has been removed and is no longer part of the public API.




# Class CxErrorHandler
## @spartacus/core


### Property errorHandlers changed.


Previous version:

```
errorHandlers: import("./multi-error-handler").MultiErrorHandler[]
```


Current version:

```
errorHandlers: import("@spartacus/core").MultiErrorHandler[]
```




# Variable defaultUserCmsModuleConfig
## @spartacus/core


Variable defaultUserCmsModuleConfig has been removed and is no longer part of the public API.




# Class FeatureStylesService
## @spartacus/core


### Property featureConfig is removed.





# Class I18nextInitializer
## @spartacus/core


### Property loggerPlugin changed.


Previous version:

```
loggerPlugin: import("i18next").LoggerModule
```


Current version:

```
loggerPlugin: import("node_modules/i18next").LoggerModule
```




# Class OccCmsComponentAdapter
## @spartacus/core


### Property featureConfigService is removed.





# Class OccCmsPageAdapter
## @spartacus/core


### Property featureConfigService is removed.





# Variable SMART_EDIT_DUMMY_COMPONENT_TYPE
## @spartacus/core


Variable SMART_EDIT_DUMMY_COMPONENT_TYPE has been removed and is no longer part of the public API.




# Class StateUtils.EntitySuccessAction
## @spartacus/core


### Constructor changed.


Previous version:

```

constructor(
  entityType: string,
  id: EntityId,
  payload?: any | undefined
)

```


Current version:

```

constructor(
  entityType: string,
  id: EntityId,
  payload?: any
)

```


### Property payload changed.


Previous version:

```
payload: any | undefined
```


Current version:

```
payload: any
```




# Variable USER_CMS_ENDPOINTS
## @spartacus/core


Variable USER_CMS_ENDPOINTS has been removed and is no longer part of the public API.




# Variable cpqquoteTranslations
## @spartacus/cpq-quote/assets


Variable cpqquoteTranslations has been removed and is no longer part of the public API.




# Variable customerTicketingTranslations
## @spartacus/customer-ticketing/assets


Variable customerTicketingTranslations has been removed and is no longer part of the public API.




# Class CustomerTicketingCreateDialogComponent
## @spartacus/customer-ticketing/components


### Property featureService is removed.





# Variable dpTranslations
## @spartacus/digital-payments/assets


Variable dpTranslations has been removed and is no longer part of the public API.




# Variable epdVisualizationTranslations
## @spartacus/epd-visualization/assets


Variable epdVisualizationTranslations has been removed and is no longer part of the public API.




# Variable estimatedDeliveryDateTranslations
## @spartacus/estimated-delivery-date/assets


Variable estimatedDeliveryDateTranslations has been removed and is no longer part of the public API.




# Class OpfConfig
## @spartacus/opf/base/root


### Property opf changed.


Previous version:

```
opf: {
        opfBaseUrl?: string;
        commerceCloudPublicKey?: string;
        paymentOption?: {
            paymentInfoMessagesMap?: Record<number, string>;
            enableInfoMessage?: boolean;
        };
        localPspResources?: Record<number, {
            jsFiles: string[];
            cssFiles: string[];
        }>;
    }
```


Current version:

```
opf: {
        opfBaseUrl?: string;
        commerceCloudPublicKey?: string;
        paymentOption?: {
            paymentInfoMessagesMap?: Record<number, string>;
            enableInfoMessage?: boolean;
            iframeSandboxMap?: Record<number, string>;
        };
        localPspResources?: Record<number, {
            jsFiles: string[];
            cssFiles: string[];
        }>;
    }
```




# Variable opfCheckoutTranslations
## @spartacus/opf/checkout/assets


Variable opfCheckoutTranslations has been removed and is no longer part of the public API.




# Class OpfCheckoutBillingAddressFormService
## @spartacus/opf/checkout/components


### Property pickupOptionFacade is removed.





# Variable opfPaymentTranslations
## @spartacus/opf/payment/assets


Variable opfPaymentTranslations has been removed and is no longer part of the public API.




# Interface OpfPaymentGlobalMethods
## @spartacus/opf/payment/root


### MethodSignature submit changed.


Previous version:

```

submit(
  options: {
        cartId: string;
        additionalData: Array<OpfKeyValueMap>;
        submitSuccess: OpfPaymentMerchantCallback;
        submitPending: OpfPaymentMerchantCallback;
        submitFailure: OpfPaymentMerchantCallback;
        paymentMethod: OpfPaymentMethod;
    }
): Promise<boolean>

```


Current version:

```

submit(
  options: {
        cartId?: string;
        additionalData: Array<OpfKeyValueMap>;
        submitSuccess: OpfPaymentMerchantCallback;
        submitPending: OpfPaymentMerchantCallback;
        submitFailure: OpfPaymentMerchantCallback;
        submitCancel?: OpfPaymentMerchantCallback;
        paymentMethod: OpfPaymentMethod;
        paymentSessionId?: string;
    }
): Promise<boolean>

```


### MethodSignature submitComplete changed.


Previous version:

```

submitComplete(
  options: {
        cartId: string;
        additionalData: Array<OpfKeyValueMap>;
        submitSuccess: OpfPaymentMerchantCallback;
        submitPending: OpfPaymentMerchantCallback;
        submitFailure: OpfPaymentMerchantCallback;
    }
): Promise<boolean>

```


Current version:

```

submitComplete(
  options: {
        cartId?: string;
        additionalData: Array<OpfKeyValueMap>;
        submitSuccess: OpfPaymentMerchantCallback;
        submitPending: OpfPaymentMerchantCallback;
        submitFailure: OpfPaymentMerchantCallback;
        submitCancel?: OpfPaymentMerchantCallback;
        paymentSessionId?: string;
    }
): Promise<boolean>

```




# Variable orderTranslations
## @spartacus/order/assets


Variable orderTranslations has been removed and is no longer part of the public API.




# Class OrderGuestRegisterFormComponent
## @spartacus/order/components


### Constructor changed.


Previous version:

```

constructor(
  userRegisterFacade: UserRegisterFacade,
  routingService: RoutingService,
  authService: AuthService,
  fb: UntypedFormBuilder
)

```


Current version:

```

constructor(
  userRegisterFacade: UserRegisterFacade,
  routingService: RoutingService,
  fb: UntypedFormBuilder
)

```


### Property authService is removed.



### Method ngOnDestroy is removed.



### Property subscription is removed.





# Class ReturnOrderComponent
## @spartacus/order/components


### Property featureConfigService is removed.





# Variable documentFlowTranslations
## @spartacus/order/document-flow/assets


Variable documentFlowTranslations has been removed and is no longer part of the public API.




# Variable accountSummaryTranslations
## @spartacus/organization/account-summary/assets


Variable accountSummaryTranslations has been removed and is no longer part of the public API.




# Variable organizationTranslations
## @spartacus/organization/administration/assets


Variable organizationTranslations has been removed and is no longer part of the public API.




# Class UnitAddressItemService
## @spartacus/organization/administration/components


### Property featureConfigService is removed.





# Variable orderApprovalTranslations
## @spartacus/organization/order-approval/assets


Variable orderApprovalTranslations has been removed and is no longer part of the public API.




# Variable unitOrderTranslations
## @spartacus/organization/unit-order/assets


Variable unitOrderTranslations has been removed and is no longer part of the public API.




# Variable organizationUserRegistrationTranslations
## @spartacus/organization/user-registration/assets


Variable organizationUserRegistrationTranslations has been removed and is no longer part of the public API.




# Variable pdfInvoicesTranslations
## @spartacus/pdf-invoices/assets


Variable pdfInvoicesTranslations has been removed and is no longer part of the public API.




# Variable pickupInStoreTranslations
## @spartacus/pickup-in-store/assets


Variable pickupInStoreTranslations has been removed and is no longer part of the public API.




# Variable bulkPricingTranslations
## @spartacus/product/bulk-pricing/assets


Variable bulkPricingTranslations has been removed and is no longer part of the public API.




# Variable futureStockTranslations
## @spartacus/product/future-stock/assets


Variable futureStockTranslations has been removed and is no longer part of the public API.




# Variable productImageZoomTranslations
## @spartacus/product/image-zoom/assets


Variable productImageZoomTranslations has been removed and is no longer part of the public API.




# Variable productVariantsTranslations
## @spartacus/product/variants/assets


Variable productVariantsTranslations has been removed and is no longer part of the public API.




# Variable configuratorTranslations
## @spartacus/product-configurator/common/assets


Variable configuratorTranslations has been removed and is no longer part of the public API.




# Class ConfiguratorAttributeSingleSelectionImageComponent
## @spartacus/product-configurator/rulebased


### Property featureConfigService is removed.





# Variable multiDimensionalSelectorTranslations
## @spartacus/product-multi-dimensional/selector/assets


Variable multiDimensionalSelectorTranslations has been removed and is no longer part of the public API.




# Variable quoteTranslations
## @spartacus/quote/assets


Variable quoteTranslations has been removed and is no longer part of the public API.




# Variable requestedDeliveryDateTranslations
## @spartacus/requested-delivery-date/assets


Variable requestedDeliveryDateTranslations has been removed and is no longer part of the public API.




# Variable s4ServiceTranslations
## @spartacus/s4-service/assets


Variable s4ServiceTranslations has been removed and is no longer part of the public API.




# Variable s4omTranslations
## @spartacus/s4om/assets


Variable s4omTranslations has been removed and is no longer part of the public API.




# Class ExpressLoggerService
## @spartacus/setup/ssr


### Property serverLogger changed.


Previous version:

```
serverLogger: import("../loggers").ExpressServerLogger
```


Current version:

```
serverLogger: import("@spartacus/setup/ssr").ExpressServerLogger
```




# Class OptimizedSsrEngine
## @spartacus/setup/ssr


### Method log is removed.





# Variable storeFinderTranslations
## @spartacus/storefinder/assets


Variable storeFinderTranslations has been removed and is no longer part of the public API.




# Class CmsGuardsService
## @spartacus/storefront


### Method canActivateGuard is removed.



### Property featureConfigService is removed.





# Class CustomFormValidators
## @spartacus/storefront


### Method strongPasswordValidator is removed.





# Class FacetComponent
## @spartacus/storefront


### Property featureConfigService is removed.





# Class FacetListComponent
## @spartacus/storefront


### Property featureConfigService is removed.





# Class MediaComponent
## @spartacus/storefront


### Property isLegacy is removed.





# Class MediaConfig
## @spartacus/storefront


### Property useLegacyMediaComponent is removed.





# Class MediaSourcesPipe
## @spartacus/storefront


### Method transform changed.


Previous version:

```

transform(
  sizes: string
): Pick<HTMLSourceElement, "srcset" | "media">[]

```


Current version:

```

transform(
  sizes: string
): Pick<HTMLSourceElement, "media" | "srcset">[]

```




# Class NavigationUIComponent
## @spartacus/storefront


### Constructor changed.


Previous version:

```

constructor(
  router: Router,
  renderer: Renderer2,
  elemRef: ElementRef,
  hamburgerMenuService: HamburgerMenuService,
  winRef: WindowRef,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  router: Router,
  renderer: Renderer2,
  elemRef: ElementRef,
  hamburgerMenuService: HamburgerMenuService,
  winRef: WindowRef
)

```


### Property featureConfigService is removed.



### Method getAriaLabelAndControl is removed.



### Method getSanitizedTitle is removed.





# Class NgSelectA11yDirective
## @spartacus/storefront


### Method appendAriaLabelToOptions is removed.



### Method customizeNgSelectAriaLabelDropdown is removed.



### Method onOpen is removed.





# Class PopoverDirective
## @spartacus/storefront


### Property featureConfigService is removed.





# Class SearchBoxComponent
## @spartacus/storefront


### Property breakpointService changed.


Previous version:

```
breakpointService: BreakpointService | null
```


Current version:

```
breakpointService: BreakpointService
```


### Property changeDetecorRef is removed.



### Property featureConfigService is removed.



### Method isEnabledFeature is removed.





# Class ThemeService
## @spartacus/storefront


### Property featureConfigService is removed.





# Variable USE_LEGACY_MEDIA_COMPONENT
## @spartacus/storefront


Variable USE_LEGACY_MEDIA_COMPONENT has been removed and is no longer part of the public API.




# Variable userAccountTranslations
## @spartacus/user/account/assets


Variable userAccountTranslations has been removed and is no longer part of the public API.




# Variable userProfileTranslations
## @spartacus/user/profile/assets


Variable userProfileTranslations has been removed and is no longer part of the public API.


