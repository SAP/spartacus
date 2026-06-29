/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ProcedureParams } from '@vivaldi/trpc';
import { z } from 'zod';
import { Context } from '../context';
import { publicProcedure, router } from '../trpc';

const sayHelloInputValidator = z
  .object({
    name: z.string().default('world'),
  })
  .prefault({});

const sayHelloHeaders = {
  'x-app-custom': z.enum(['foo', 'bar']).default('foo'),
};

export type sayHelloOptions = ProcedureParams<
  Context,
  typeof sayHelloInputValidator,
  typeof sayHelloHeaders
>;

export const sayHelloFn = ({ ctx, input }: sayHelloOptions) => {
  ctx.logger.info('Forwarded Headers: %o', ctx.forwardHeaders);

  return {
    message: `${ctx.custom.greeting} ${input.name}!`,
  };
};

export const sample = router({
  sayHello: publicProcedure
    .meta({ headers: sayHelloHeaders })
    .input(sayHelloInputValidator)
    .query(sayHelloFn),
});

export type sayHelloResponse = ReturnType<typeof sayHelloFn>;
