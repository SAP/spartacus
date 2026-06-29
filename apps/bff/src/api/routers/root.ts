/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { createCallerFactory, router } from '../trpc';
import { occ } from './occ';
import { sample } from './sample';

export const rootRouter = router({
  occ,
  sample,
});

export type RootRouter = typeof rootRouter;

export const createCaller = createCallerFactory(rootRouter);
