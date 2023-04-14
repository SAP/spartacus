/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.query({
	input: z.object({
		id: z.string(),
	}),
	handler: async ({ input }) => {
		return {
			id: input.id,
			name: 'Jens',
			bio: 'Founder of WunderGraph',
		};
	},
});
