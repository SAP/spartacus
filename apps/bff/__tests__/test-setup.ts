/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import setupVitest from '@vivaldi/vitest';
import { createContext } from '../src/api/context';

const setup = await setupVitest(async () => ({
  context: await createContext(),
  metadata: {},
}));

global.createCaller = setup.createCaller;
global.destinations = setup.destinations;

declare global {
  var createCaller: typeof setup.createCaller;
  var destinations: typeof setup.destinations;
}
