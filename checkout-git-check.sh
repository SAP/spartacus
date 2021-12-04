#!/usr/bin/env bash

# =========================================================
# Running instructions:
# 1. Make sure you're on `develop` branch.
# 2. Run `./checkout-git-check.sh`
# 3. Copy the output file list to a temp file
# 4. switch back to the working branch, and carry over the changes from the listed files
# =========================================================


# feature-libs/checkout/components/components/checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.component.ts
# feature-libs/checkout/components/components/checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.component.ts
# feature-libs/checkout/components/components/checkout-progress/checkout-progress.component.ts
# feature-libs/checkout/components/components/delivery-mode/delivery-mode.component.ts
# feature-libs/checkout/components/components/payment-method/payment-form/payment-form.component.ts
# feature-libs/checkout/components/components/payment-type/payment-type.component.ts
# feature-libs/checkout/components/components/place-order/place-order.component.spec.ts
# feature-libs/checkout/components/components/schedule-replenishment-order/schedule-replenishment-order.component.ts
# feature-libs/checkout/components/guards/checkout.guard.ts
# feature-libs/checkout/components/order-confirmation/components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component.ts
# feature-libs/checkout/components/services/checkout-replenishment-form-service.ts
# feature-libs/checkout/components/services/express-checkout.service.ts
# feature-libs/checkout/components/components/place-order/place-order.component.ts
# feature-libs/checkout/core/store/effects/checkout.effect.spec.ts
# feature-libs/checkout/core/store/effects/checkout.effect.ts
# feature-libs/checkout/core/facade/checkout-delivery.service.spec.ts
# feature-libs/checkout/core/facade/checkout-payment.service.spec.ts
# feature-libs/checkout/core/connectors/checkout/checkout.connector.spec.ts
# feature-libs/checkout/core/connectors/replenishment-order/checkout-replenishment-order.connector.spec.ts
# feature-libs/checkout/core/services/checkout-page-meta.resolver.ts
# feature-libs/checkout/core/store/effects/checkout.effect.spec.ts
# feature-libs/checkout/core/store/effects/checkout.effect.ts
# feature-libs/checkout/core/store/reducers/checkout.reducer.spec.ts
# feature-libs/checkout/core/store/reducers/index.ts
# feature-libs/checkout/core/store/selectors/card-types.selectors.ts
# feature-libs/checkout/core/store/selectors/checkout.selectors.ts
# feature-libs/checkout/occ/adapters/converters/occ-replenishment-order-form-serializer.ts
# feature-libs/checkout/occ/adapters/occ-checkout-payment.adapter.ts
# feature-libs/checkout/occ/adapters/occ-checkout-replenishment-order.adapter.ts
# feature-libs/checkout/root/checkout-root.module.ts
# feature-libs/checkout/root/index.ts
# feature-libs/checkout/root/pages/index.ts
# feature-libs/checkout/root/pages/order-confirmation-order-entries-context.spec.ts
# feature-libs/checkout/root/pages/order-confirmation-order-entries-context.ts
# feature-libs/checkout/styles/components/_promotions.scss
# feature-libs/checkout/styles/components/steps/review/_review-submit.scss


# =========================================================
# Display branch to be sure we're in the right place
# =========================================================
# git branch

# =========================================================
# Get the latest changes
# =========================================================
git pull


# =========================================================
# since_date: Update the date accordingly. How far back to check for changes
# =========================================================
since_date=2021-12-04

git log --since=${since_date} --name-only > git-log.txt


echo "
==============================================
Checkout lib file changes since ${since_date}
==============================================
"

# =================================================================
# paths_to_watch: List of files or folders to "monitor" for changes
# =================================================================
paths_to_watch=(
'feature-libs/checkout/assets'
'feature-libs/checkout/components'
'feature-libs/checkout/core'
'feature-libs/checkout/occ'
'feature-libs/checkout/root'
'feature-libs/checkout/styles'
)

for path in ${paths_to_watch[@]}; do
    # echo "grep [${path}] git-log.txt"
    grep "${path}" git-log.txt 
done

echo "
==============================================
Checkout lib file changes - end
==============================================
"