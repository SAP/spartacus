#!/usr/bin/env bash
#
# install-spartacus-features.sh
#
# Feature installation functions mirroring scripts/install/functions.sh.
# Sourced by test-customer-upgrade.sh (and potentially other scripts).
#
# Each function receives the Spartacus version as $1.
# Feature flags (ADD_B2B_LIBS, ADD_CDC, etc.) are read from the environment
# and default to "false" when not set.
#

add_feature_libs() {
  local ver="$1"
  npx ng add "@spartacus/tracking@${ver}" --skip-confirmation --no-interactive
  npx ng add @spartacus/tracking --skip-confirmation --no-interactive --features "TMS-GTM" --features "TMS-AEPL"
  npx ng add "@spartacus/qualtrics@${ver}" --skip-confirmation --no-interactive
  npx ng add "@spartacus/customer-ticketing@${ver}" --skip-confirmation --no-interactive
  npx ng add "@spartacus/pickup-in-store@${ver}" --skip-confirmation --no-interactive
  return 0
}

add_product_configurator() {
  local ver="$1"
  npx ng add "@spartacus/product-configurator@${ver}" --skip-confirmation --no-interactive
  npx ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "Textfield-Configurator" --features "VC-Configurator"
  if [[ "${ADD_CPQ:-false}" == "true" ]]; then
    npx ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "CPQ-Configurator"
  fi
  return 0
}

add_b2b() {
  local ver="$1"
  if [[ "${ADD_B2B_LIBS:-false}" != "true" ]]; then return 0; fi
  npx ng add "@spartacus/organization@${ver}" --skip-confirmation --no-interactive
  npx ng add "@spartacus/checkout@${ver}" --skip-confirmation --no-interactive
  npx ng add @spartacus/checkout --skip-confirmation --no-interactive --features "Checkout-B2B" --features "Checkout-Scheduled-Replenishment"
  npx ng add "@spartacus/product@${ver}" --skip-confirmation --no-interactive
  npx ng add @spartacus/product --skip-confirmation --no-interactive --features "Future-Stock"
  return 0
}

add_cdc() {
  local ver="$1"
  if [[ "${ADD_CDC:-false}" != "true" ]]; then return 0; fi
  npx ng add "@spartacus/cdc@${ver}" --skip-confirmation --no-interactive
  return 0
}

add_epd_visualization() {
  local ver="$1"
  if [[ "${ADD_EPD_VISUALIZATION:-false}" != "true" || -z "${EPD_VISUALIZATION_BASE_URL:-}" ]]; then return 0; fi
  npx ng add "@spartacus/epd-visualization@${ver}" --base-url "${EPD_VISUALIZATION_BASE_URL}" --skip-confirmation --no-interactive
  return 0
}

add_opf() {
  local ver="$1"
  if [[ "${ADD_OPF:-false}" != "true" || -z "${OPF_BASE_URL:-}" ]]; then return 0; fi
  npx ng add "@spartacus/opf@${ver}" --opf-base-url "${OPF_BASE_URL}" --commerce-cloud-public-key "${OPF_CLIENT_PUBLIC_KEY}" --skip-confirmation --no-interactive
  return 0
}

add_product_multi_dimensional() {
  local ver="$1"
  if [[ "${ADD_PRODUCT_MULTI_DIMENSIONAL:-false}" != "true" ]]; then return 0; fi
  npx ng add "@spartacus/product-multi-dimensional@${ver}" --skip-confirmation --no-interactive
  npx ng add @spartacus/product-multi-dimensional --skip-confirmation --no-interactive --features "Product-Multi-Dimensional-Selector" --features "Product-Multi-Dimensional-List"
  return 0
}

add_quote() {
  local ver="$1"
  if [[ "${ADD_QUOTE:-false}" != "true" ]]; then return 0; fi
  npx ng add "@spartacus/quote@${ver}" --skip-confirmation --no-interactive
  return 0
}

add_s4om() {
  local ver="$1"
  if [[ "${ADD_S4OM:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/s4om@${ver}" --interactive false
  return 0
}

add_s4_service() {
  local ver="$1"
  if [[ "${ADD_S4_SERVICE:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/s4-service@${ver}" --interactive false
  return 0
}

add_cpq_quote() {
  local ver="$1"
  if [[ "${ADD_CPQ_QUOTE:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/cpq-quote@${ver}" --interactive false
  return 0
}

add_requested_delivery_date() {
  local ver="$1"
  if [[ "${ADD_REQUESTED_DELIVERY_DATE:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/requested-delivery-date@${ver}" --interactive false
  return 0
}

add_estimated_delivery_date() {
  local ver="$1"
  if [[ "${ADD_ESTIMATED_DELIVERY_DATE:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/estimated-delivery-date@${ver}" --interactive false
  return 0
}

add_pdf_invoices() {
  local ver="$1"
  if [[ "${ADD_PDF_INVOICES:-false}" != "true" ]]; then return 0; fi
  npx ng add --skip-confirmation "@spartacus/pdf-invoices@${ver}" --interactive false
  return 0
}

add_punchout() {
  local ver="$1"
  if [[ "${ADD_PUNCHOUT:-false}" != "true" ]]; then return 0; fi
  npx ng add "@spartacus/punchout@${ver}" --skip-confirmation --no-interactive
  return 0
}

# Install all Spartacus features for the given version.
# Usage: install_spartacus_features <version>
install_spartacus_features() {
  local ver="$1"
  add_feature_libs "$ver"
  add_product_configurator "$ver"
  add_b2b "$ver"
  add_cdc "$ver"
  add_epd_visualization "$ver"
  add_opf "$ver"
  add_product_multi_dimensional "$ver"
  add_quote "$ver"
  add_s4om "$ver"
  add_s4_service "$ver"
  add_cpq_quote "$ver"
  add_requested_delivery_date "$ver"
  add_estimated_delivery_date "$ver"
  add_pdf_invoices "$ver"
  add_punchout "$ver"
  return 0
}

