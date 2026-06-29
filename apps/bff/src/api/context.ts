/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { destinations } from '@repo/bff/contracts';

export type Context = Awaited<ReturnType<typeof createContext>>;

export async function createContext() {
  return {
    destinations,
    greeting: 'Hello',
    isDev: vivaldi.env.isDev,
  };
}
