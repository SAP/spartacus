# These are the default configs
# DON'T EDIT THIS FILE
# If you want to use different values, create a file named 'config.sh'
# If present, 'config.sh' will be used as well in addition to 'config.default.sh' (to override variables).

# Url of the hybris backend
# Will replace default host (https://localhost:9002) as a backend endpoint
# Make sure you specify the full url for the backend (https://[host]:[port]
BACKEND_URL="https://api.c432wmya2v-teamspart3-s4-public.model-t.myhybris.cloud"

# A comma separated list of base sites.
# When empty, the base sites will not be explicitly specified in spartacus-configuration.module.ts
BASE_SITE=

OCC_PREFIX="/occ/v2/"

URL_PARAMETERS="baseSite,language,currency"
CURRENCY="USD,EUR"

SPARTACUS_PROJECTS=(
        "dist/core:projects/core"
        "dist/storefrontlib:projects/storefrontlib"
        "dist/assets:projects/assets"
        "dist/checkout:feature-libs/checkout"
        "dist/product:feature-libs/product"
        "dist/setup:core-libs/setup"
        "dist/cart:feature-libs/cart"
        "dist/order:feature-libs/order"
        "dist/asm:feature-libs/asm"
        "dist/user:feature-libs/user"
        "dist/organization:feature-libs/organization"
        "dist/storefinder:feature-libs/storefinder"
        "dist/tracking:feature-libs/tracking"
        "dist/qualtrics:feature-libs/qualtrics"
        "dist/quote:feature-libs/quote"
        "dist/smartedit:feature-libs/smartedit"
        "dist/customer-ticketing:feature-libs/customer-ticketing"
        "dist/subscription-billing:feature-libs/subscription-billing"
        "dist/cds:integration-libs/cds"
        "dist/cdc:integration-libs/cdc"
        "dist/cdp:integration-libs/cdp"
        "dist/opps:integration-libs/opps"
        "dist/epd-visualization:integration-libs/epd-visualization"
        "dist/opf:integration-libs/opf"
        "dist/punchout:integration-libs/punchout"
        "dist/product-configurator:feature-libs/product-configurator"
        "dist/product-multi-dimensional:feature-libs/product-multi-dimensional"
        "dist/pickup-in-store:feature-libs/pickup-in-store"
        "dist/pdf-invoices:feature-libs/pdf-invoices"
        "dist/estimated-delivery-date:feature-libs/estimated-delivery-date"
        "projects/storefrontstyles:projects/storefrontstyles"
        "projects/schematics:projects/schematics"
        )

SPARTACUS_REPO_URL="https://github.com/SAP/spartacus.git"
BRANCH='develop'

# custom location for the installation output
# BASE_DIR='/tmp/'

# other locations
CLONE_DIR="clone"
INSTALLATION_DIR="apps"
E2E_TEST_DIR=${CLONE_DIR}/projects/storefrontapp-e2e-cypress

ANGULAR_CLI_VERSION='^21.1.0'
SPARTACUS_VERSION='latest'

CSR_PORT="4200"
SSR_PORT="4100"
SSR_PWA_PORT=

SSL_CERT_PATH=
SSL_KEY_PATH=

CSR_APP_NAME="csr"
SSR_APP_NAME="ssr"
SSR_PWA_APP_NAME="ssr-pwa"

ADD_B2B_LIBS=false

ADD_CPQ=false
ADD_QUOTE=false
ADD_CDC=false
ADD_OPPS=false
# config.epd-visualization.sh contains default values to use in your config.sh when ADD_EPD_VISUALIZATION is true.
ADD_EPD_VISUALIZATION=false
ADD_S4OM=false
# config.opf.sh contains default values to use in your config.sh when ADD_OPF is true.
ADD_OPF=false
ADD_CPQ_QUOTE=false
ADD_S4_SERVICE=false
ADD_PRODUCT_MULTI_DIMENSIONAL=false
ADD_PUNCHOUT=false

# The base URL (origin) of the SAP EPD Visualization Fiori launchpad
EPD_VISUALIZATION_BASE_URL=

# The base URL and public key values are required for connection to Cloud Commerce Adapter (OPF)
OPF_BASE_URL=
OPF_CLIENT_PUBLIC_KEY=

#NPM connection info
#NPM_URL must start by 'https://' and end with '/' char
NPM_TOKEN=
NPM_URL=
NPM_ALWAYS_AUTH=true

SKIP_SANITY=false
CHECK_AFTER_START=false
CHECK_B2B_AFTER_START=false
# Forces E2E even if XVFB is not installed
FORCE_E2E=false
SKIP_E2E=false

#JDK toggle: JDK21 or JDK17
JDK_VERSION="JDK21"

# Set to true to include AUTH_CONFIG in spartacus-features.module.ts
ADD_AUTH_CONFIG=true

# Concerning below AuthConfig objects,
# If needed, specify a redirect URL using the redirectUri property, e.g., redirectUri: "http://localhost:5200/powertools-spa"
# The redirectUri must be included in the OAuthLibConfig object, inside the authentication property.

# This auth Config will be used in the spartacus-features.module.ts for the CSR app
# For a standard B2B setup, use: client_id: "mobile_android_public_b2b",
AUTH_CONFIG_CSR='provideConfig(<AuthConfig>{
  authentication: {
  client_id: "mobile_android_public",
}}),'

# This auth Config will be used in the spartacus-features.module.ts for the SSR app
# For a standard B2B setup, use: client_id: "mobile_android_public_b2b_ssr",
AUTH_CONFIG_SSR='provideConfig(<AuthConfig>{
  authentication: {
  client_id: "mobile_android_public_ssr",
}}),'