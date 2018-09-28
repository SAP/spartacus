import { UsersGenerator } from './generators/users';
import { CommerceWebservicesV2 } from 'occ-client';
import { LanguagesGenerator } from './generators/languages';
import { ProductsGenerator } from './generators/products';
import { generateToFile } from './helpers/client-generator';
import * as minimist from 'minimist';
import { CurrenciesGenerator } from './generators/currencies';
import { SuggestionsGenerator } from './generators/suggestions';
import { ContentPageGenerator } from './generators/cms/content-pages';
import { ProductReviewsGenerator } from './generators/product-reviews';
import { CartGenerator } from './generators/cart';
import { CategoriesGenerator } from './generators/cms/categories';
import { TitlesGenerator } from './generators/titles';
import { DeliveryTabGenerator } from './generators/delivery-tab';
import { ComponentGenerator } from './generators/cms/components';

const args = minimist(process.argv.slice(2));
const backendUrl =
  args.url ||
  args.u ||
  'https://backoffice.christian-spartacus1-s2-public.model-t.myhybris.cloud/';
const outputFile = args.output || args.o || 'db.json';

const client = new CommerceWebservicesV2(backendUrl);

//TODO: Are we supporting all the sites or just electronics for now?
const sites = ['electronics' /*, 'apparel-uk', 'apparel-de'*/];

const generators = [
  new LanguagesGenerator(client, sites),
  new CurrenciesGenerator(client, sites),
  new SuggestionsGenerator(client, sites),
  new ContentPageGenerator(client, sites),
  new ProductReviewsGenerator(client, sites),
  new ComponentGenerator(client, sites),
  new CategoriesGenerator(client, sites),
  new TitlesGenerator(client, sites),
  new CartGenerator(client, sites),
  new DeliveryTabGenerator(client, sites),
  new UsersGenerator(client, sites),
  new ProductsGenerator(client, sites)
];

generateToFile(generators, outputFile).then(() => {
  console.log('Generation complete!');
});
