/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { createOperationUtils } from '@vivaldi/trpc/universal';
import type { RootRouter } from './types';

export const utils = {
  op: createOperationUtils<RootRouter>(),
};
