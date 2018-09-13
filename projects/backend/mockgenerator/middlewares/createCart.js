'use strict';
const url = require('url');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

module.exports = (req, res, next) => {
  createCart(req, res);
  addCartEntry(req, res);
  next();
};

function createCart(req, res) {
  const uri = url.parse(req.url, true);
  const isCartRoute = /(.+)-carts$/.test(uri.pathname);
  if (isCartRoute && req.method === 'POST') {
    const {
      query: { currency }
    } = uri;
    const guid = uuidv4();
    req.body = {
      type: 'cartWsDTO',
      code: '00001005',
      deliveryItemsQuantity: 0,
      guid: guid,
      uid: guid,
      totalItems: 0,
      totalPrice: {
        currencyIso: currency,
        formattedValue: '$0.00',
        value: 0.0
      },
      totalPriceWithTax: {
        currencyIso: currency,
        value: 0.0
      },
      'electronics-entries': []
    };
  }
}

function addCartEntry(req, res) {
  const uri = url.parse(req.url, true);
  const isCartEntryRoute = /(.+)entries$/.test(uri.pathname);
  if (isCartEntryRoute && req.method === 'POST') {
    const {
      query: { quantity, code }
    } = uri;
    req.body = {
      entry: {
        entryNumber: 0,
        product: {
          availableForPickup: true,
          code: code,
          name: faker.commerce.productName(),
          purchasable: true,
          stock: {
            stockLevel: 4
          },
          url: '/product-url'
        },
        quantity: quantity,
        totalPrice: {
          currencyIso: 'USD',
          value: 260.87
        }
      },
      quantity: quantity,
      quantityAdded: quantity,
      statusCode: 'success'
    };
  }
}
