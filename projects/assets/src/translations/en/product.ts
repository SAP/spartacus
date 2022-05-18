export const product = {
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
    activeFilter:
      '{{filter}} filter, clicking on this button will remove the filter',
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
    ariaLabelShowLess:
      'Show Less, button, clicking on this button will reduce options for the active group',
    ariaLabelShowMore:
      'Show more, button, clicking on this button will show all options for the active group',
    ariaLabelItemsAvailable: '{{name}}, {{state}} {{count}} item available',
    ariaLabelItemsAvailable_other:
      '{{name}}, {{state}} {{count}} items available',
    decreaseOptionsVisibility:
      'Options were hidden from the active group, tab backward to read them or forward for the next group',
    increaseOptionsVisibility:
      'More options were added to the active group, tab backward to read them or forward for the next group',
  },
  productSummary: {
    id: 'ID',
    showReviews: 'Show reviews',
    showReviewsDetailed:
      'Show {{count}} reviews, Rated {{rating}} out of 5 stars',
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
    thankYouForReview:
      'Thank you for the review! Note that reviews may require review before appearing here.',
  },
  productCarousel: {
    carouselLabel: 'Carousel, {{title}}',
  },
  addToCart: {
    itemsAddedToYourCart: 'Item(s) added to your cart',
    itemsIncrementedInYourCart:
      'This item was already in your cart. The quantity was updated.',
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
    unsubscribeSuccess:
      'You will not receive back-in-stock notification for this product.',
    subscriptionDialog: {
      header: 'Out of stock subscription',
      notifiedPrefix: 'You will be notified on:',
      notifiedSuffix: 'as soon as this product is back in stock.',
      manageChannelsPrefix:
        'Manage your preferred notification channels on the ',
      manageChannelsLink: 'Notification Preference',
      manageChannelsSuffix: ' page.',
      manageSubscriptionsPrefix: 'You can manage your subscriptions on ',
      manageSubscriptionsLink: 'My Interests',
      manageSubscriptionsSuffix: ' page.',
      okBtn: 'OK',
      subscribing:
        'Subscribing you to Out of Stock notifications for this product',
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
