/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * tRPC root server configuration
 */
import { createTRPC } from '@vivaldi/trpc';
import { type Context } from './context';
import { type Meta } from './meta';

export const t = createTRPC<Context, Meta>({ metadata: {} });

/**
 * @link https://trpc.io/docs/router
 */
export const router = t.router;

/**
 * @link https://trpc.io/docs/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * @link https://trpc.io/docs/merging-routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * @link https://trpc.io/docs/v11/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
