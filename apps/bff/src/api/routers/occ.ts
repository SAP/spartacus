/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { HttpRequestBuilder } from '@vivaldi/connectivity';
import { ProcedureParams } from '@vivaldi/trpc';
import { z } from 'zod';
import { Context } from '../context';
import { publicProcedure, router } from '../trpc';

const getBaseSitesHeaders = {
  authorization: z.string().optional(),
};

export type getBaseSitesOptions = ProcedureParams<
  Context,
  z.ZodUndefined,
  typeof getBaseSitesHeaders
>;

export const getBaseSitesFn = async ({ ctx }: getBaseSitesOptions) => {
  return ctx.execute.http(
    HttpRequestBuilder.get<unknown>('/basesites').addCustomHeaders({
      authorization: ctx.forwardHeaders['authorization'],
    }),
    ctx.destinations.occ.v2(),
  );
};

export const occ = router({
  getBaseSites: publicProcedure
    .meta({ headers: getBaseSitesHeaders })
    .query(getBaseSitesFn),
});
