/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.mutation({
	input: z.object({
		id: z.string(),
		name: z.string(),
		bio: z.string(),
	}),
	handler: async ({ input }) => {
		return {
			...input,
		};
	},
});
