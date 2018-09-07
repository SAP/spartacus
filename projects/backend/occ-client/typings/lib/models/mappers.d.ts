export declare const Country: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            isocode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Region: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            countryIso: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isocode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isocodeShort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Address: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            companyName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            country: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            defaultAddress: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            email: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            firstName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            formattedAddress: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            line1: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            line2: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            phone: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            postalCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            region: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            shippingAddress: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            title: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            titleCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            town: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            visibleInAddressBook: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const AddressList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            addresses: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ErrorModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            message: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            reason: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subject: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subjectType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            type: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ErrorList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            errors: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const AddressValidation: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            decision: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            errors: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            suggestedAddresses: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const Price: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currencyIso: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            formattedValue: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            maxQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            minQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            priceType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Stock: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            stockLevel: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            stockLevelStatus: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Image: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            altText: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            format: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            galleryIndex: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            imageType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VariantOptionQualifier: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            image: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            qualifier: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VariantOption: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            priceData: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            stock: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            variantOptionQualifiers: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const BaseOption: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            options: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            selected: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            variantType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SearchQuery: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SearchState: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Breadcrumb: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            facetCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            facetName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            facetValueCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            facetValueName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            removeQuery: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            truncateQuery: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const Component: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            modifiedtime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            otherProperties: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ComponentList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            component: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ContentSlot: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            components: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            position: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            slotId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            slotShared: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            slotStatus: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ContentSlotList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            contentSlot: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const CMSPage: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            contentSlots: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            defaultPage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            template: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            title: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            typeCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CardType: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CardTypeList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            cardTypes: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PromotionOrderEntryConsumed: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            adjustedUnitPrice: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            orderEntryNumber: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PromotionRestriction: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            restrictionType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Promotion: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            couldFireMessages: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            enabled: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            endDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            firedMessages: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            priority: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            productBanner: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            promotionGroup: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            promotionType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            restrictions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            startDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            title: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PromotionResult: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            consumedEntries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            promotion: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const Currency: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            active: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isocode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            symbol: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Voucher: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            appliedValue: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currency: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            freeShipping: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            valueFormatted: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            valueString: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            voucherCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const DeliveryMode: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryCost: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const GeoPoint: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            latitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            longitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Time: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            formattedHour: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            hour: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            minute: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SpecialOpeningDay: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            closed: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            closingTime: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            comment: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            date: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            formattedDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            openingTime: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const WeekdayOpeningDay: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            closed: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            closingTime: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            openingTime: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            weekDay: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OpeningSchedule: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            specialDayOpeningList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            weekDayOpeningList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PointOfService: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            address: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            displayName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            distanceKm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            features: {
                serializedName: string;
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            formattedDistance: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            geoPoint: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            mapIcon: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            openingHours: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            storeContent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            storeImages: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Category: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            image: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeatureUnit: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            symbol: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            unitType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FeatureValue: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Feature: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            comparable: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            featureUnit: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            featureValues: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            range: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            type: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Classification: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            features: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const FutureStock: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            date: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            formattedDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            stock: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const PriceRange: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            maxPrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            minPrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const ProductReference: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            preselected: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            referenceType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            target: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const Language: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            active: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            isocode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            nativeName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const User: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currency: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            customerId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deactivationDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            defaultAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            displayUid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            firstName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            language: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            lastName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            title: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            titleCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Review: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            alias: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            comment: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            date: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            headline: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            principal: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            rating: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VariantCategory: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            hasImage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            priority: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VariantValueCategory: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            sequence: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            superCategories: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const VariantMatrixElement: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            elements: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            isLeaf: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            parentVariantCategory: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            variantOption: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            variantValueCategory: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const Product: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            availableForPickup: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            averageRating: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            baseOptions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            baseProduct: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            categories: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            classifications: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            futureStocks: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            images: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            manufacturer: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            multidimensional: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            numberOfReviews: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            potentialPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            price: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            priceRange: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            productReferences: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            purchasable: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            reviews: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            stock: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            summary: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            variantMatrix: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            variantOptions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            variantType: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            volumePrices: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            volumePricesFlag: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OrderEntry: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            basePrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryMode: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryPointOfService: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            entryNumber: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            product: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            updateable: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const DeliveryOrderEntryGroup: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            deliveryAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            entries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPriceWithTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const PaymentDetails: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            accountHolderName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            billingAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            cardNumber: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            cardType: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            defaultPayment: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            expiryMonth: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            expiryYear: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            issueNumber: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            saved: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            startMonth: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            startYear: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subscriptionId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const PickupOrderEntryGroup: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            deliveryPointOfService: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            distance: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPriceWithTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const Principal: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Cart: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            appliedOrderPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            appliedProductPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            appliedVouchers: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            calculated: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryCost: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryItemsQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryMode: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryOrderGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            expirationTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            guid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            net: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            orderDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            paymentInfo: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            pickupItemsQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pickupOrderGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            potentialOrderPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            potentialProductPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            productDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            saveTime: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            savedBy: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            site: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            store: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subTotal: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalItems: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalPriceWithTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalUnitCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            user: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const CartList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            carts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const CartModification: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            deliveryModeChanged: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entry: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            quantityAdded: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            statusCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            statusMessage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CategoryHierarchy: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastModified: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subcategories: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CatalogVersion: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            categories: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastModified: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Catalog: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalogVersions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            id: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastModified: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CatalogList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalogs: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ComponentIDList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            idList: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ConsignmentEntry: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            orderEntry: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            quantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            shippedQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Consignment: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryPointOfService: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            entries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            shippingAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            statusDate: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            trackingID: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CountryList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            countries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const CurrencyList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currencies: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const DeliveryModeList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            deliveryModes: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const FacetValue: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            count: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            query: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            selected: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Facet: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            category: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            multiSelect: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            priority: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            topValues: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            values: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            visible: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const LanguageList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            languages: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const Pagination: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            count: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            page: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPages: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const Sort: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            asc: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ListAdaptedComponents: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            components: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            pagination: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            sorts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const MemberList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            members: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const OrderEntryList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            orderEntries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const OrderHistory: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            guid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            placed: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            statusDisplay: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            total: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const PaginationModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currentPage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPages: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalResults: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SortModel: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            selected: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OrderHistoryList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            orders: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            pagination: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            sorts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const OrderStatusUpdateElement: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            baseSiteId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const OrderStatusUpdateElementList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            orderStatusUpdateElements: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const Order: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            appliedOrderPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            appliedProductPromotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            appliedVouchers: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            calculated: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            consignments: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            created: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryAddress: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryCost: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryItemsQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryMode: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            deliveryOrderGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            deliveryStatus: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            deliveryStatusDisplay: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            entries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            guestCustomer: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            guid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            net: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            orderDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            paymentInfo: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            pickupItemsQuantity: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pickupOrderGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            productDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            site: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            status: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            statusDisplay: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            store: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subTotal: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalDiscounts: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalItems: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalPrice: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalPriceWithTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            totalTax: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            unconsignedEntries: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            user: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const PaymentDetailsList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            payments: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PointOfServiceStock: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            address: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            displayName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            distanceKm: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            features: {
                serializedName: string;
                type: {
                    name: string;
                    value: {
                        serializedName: string;
                        type: {
                            name: string;
                        };
                    };
                };
            };
            formattedDistance: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            geoPoint: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            mapIcon: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            openingHours: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            stockInfo: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            storeContent: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            storeImages: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            url: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ProductExpressUpdateElement: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalogId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            catalogVersion: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ProductExpressUpdateElementList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            productExpressUpdateElements: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ProductList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalog: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            products: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            totalPageCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalProductCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            version: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ProductReferenceList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            references: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const SpellingSuggestion: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            suggestion: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const ProductSearchPage: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            breadcrumbs: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            categoryCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentQuery: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            facets: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            freeTextSearch: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            keywordRedirectUrl: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pagination: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            products: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            sorts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            spellingSuggestion: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const PromotionList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            promotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const PromotionResultList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            promotions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const ReviewList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            reviews: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const SaveCartResult: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            savedCartData: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
        };
    };
};
export declare const StoreFinderSearchPage: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            boundEastLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundNorthLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundSouthLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundWestLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            locationText: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pagination: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            sorts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            sourceLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            sourceLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            stores: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const StoreFinderStockSearchPage: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            boundEastLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundNorthLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundSouthLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            boundWestLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            locationText: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pagination: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            product: {
                serializedName: string;
                type: {
                    name: string;
                    className: string;
                };
            };
            sorts: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            sourceLatitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            sourceLongitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            stores: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const Suggestion: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            value: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const SuggestionList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            suggestions: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const Title: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const TitleList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            titles: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const UserGroup: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            members: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            membersCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            subGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const UserGroupList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currentPage: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            numberOfPages: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            totalNumber: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            userGroups: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const UserSignUp: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            firstName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            lastName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            password: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            titleCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            uid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const VoucherList: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            vouchers: {
                serializedName: string;
                type: {
                    name: string;
                    element: {
                        serializedName: string;
                        type: {
                            name: string;
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCardTypesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCatalogsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCatalogOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCatalogVersionOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCategoriesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetComponentByIdListOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalogCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            productCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            categoryCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetComponentByIdOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalogCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            productCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            categoryCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPageDataOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pageType: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            pageLabelOrId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            code: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCurrenciesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetAllCustomerGroupsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCustomerGroupOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetDeliveryCountriesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2ExportProductsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            catalog: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            version: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            timestamp: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2OrderStatusFeedOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetLanguagesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetOrderOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2ExpressUpdateOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            catalog: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2SearchProductsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            searchQueryContext: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CountSearchProductsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetSuggestionsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetProductByCodeOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2ExportProductReferencesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetProductReviewsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            maxCount: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CreateReviewPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2SearchProductStockByLocationOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            location: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            latitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            longitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            location: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            latitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            longitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetStockDataOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPromotionsPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            promotionGroup: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPromotionByCodeOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2LocationSearchOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            latitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            longitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            radius: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            accuracy: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CountLocationSearchOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            query: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            latitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            longitude: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            radius: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            accuracy: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2LocationDetailsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetTitlesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2RegisterUserPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetUserOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetAddressesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CreateAddressPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2VerifyAddressPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetAddressOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCartsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
            savedCartsOnly: {
                serializedName: string;
                defaultValue: boolean;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CreateCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            oldCartId: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            toMergeCartGuid: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2CloneSaveCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            name: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            description: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCartDeliveryModeOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCartEntriesOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2AddCartEntryPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCartEntryOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2SetCartEntryPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2UpdateCartEntryPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2FlagForDeletionOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPromotionsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPromotionOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2RestoreSavedCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2SaveCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            saveCartName: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            saveCartDescription: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetSavedCartOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetVouchersOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetOrdersForUserOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            statuses: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            currentPage: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            pageSize: {
                serializedName: string;
                defaultValue: number;
                type: {
                    name: string;
                };
            };
            sort: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetCountOrdersForUserOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            statuses: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2PlaceOrderOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            securityCode: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetOrderForUserByCodeOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2ChangePasswordOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            old: {
                serializedName: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPaymentInfosOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetPaymentDetailsOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
export declare const CommerceWebservicesV2GetVoucherByCodeOptionalParams: {
    serializedName: string;
    type: {
        name: string;
        className: string;
        modelProperties: {
            fields: {
                serializedName: string;
                defaultValue: string;
                type: {
                    name: string;
                };
            };
        };
    };
};
