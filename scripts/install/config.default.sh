# These are the default configs
# DON'T EDIT THIS FILE
# If you want to use different values, create a file named 'config.sh'
# If present, 'config.sh' will be used as well in addition to 'config.default.sh' (to override variables).

# Url of the hybris backend
# Will replace default host (https://localhost:9002) as a backend endpoint
# Make sure you specify the full url for the backend (https://[host]:[port]
BACKEND_URL="https://40.76.109.9:9002"
OCC_PREFIX="/occ/v2/"

SPARTACUS_PROJECTS=(
        "projects/core"
        "projects/assets"
        "projects/storefrontlib"
        "projects/storefrontstyles"
        "projects/schematics"
        "integration-libs/cds"
        "integration-libs/cdc"
        "core-libs/setup"
        "feature-libs/asm"
        "feature-libs/organization"
        "feature-libs/storefinder"
        "feature-libs/checkout"
        "feature-libs/smartedit"
        "feature-libs/product"
        "feature-libs/product-configurator"
        "feature-libs/qualtrics"
        "feature-libs/cart"
        "feature-libs/order"
        "feature-libs/user"
        "feature-libs/tracking"
        )

SPARTACUS_REPO_URL="https://github.com/SAP/spartacus.git"
BRANCH='develop'

# custom location for the installation output
# BASE_DIR='/tmp/'

# other locations
CLONE_DIR="clone"
INSTALLATION_DIR="apps"
E2E_TEST_DIR=${CLONE_DIR}/projects/storefrontapp-e2e-cypress

ANGULAR_CLI_VERSION='~12.0.5'
SPARTACUS_VERSION='latest'

CSR_PORT="4200"
SSR_PORT="4100"
SSR_PWA_PORT=

CSR_APP_NAME="csr"
SSR_APP_NAME="ssr"
SSR_PWA_APP_NAME="ssr-pwa"

ADD_B2B_LIBS=false

ADD_CPQ=false
ADD_CDC=false
