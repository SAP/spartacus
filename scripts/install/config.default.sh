# These are the default configs
# DON'T EDIT THIS FILE
# If you want to use different values, create a file named 'config.sh'
# If present, 'config.sh' will be used as well in addition to 'config.default.sh' (to override variables).

# Url of the hybris backend
# Will replace default host (https://localhost:9002) as a backend endpoint
# Make sure you specify the full url for the backend (https://[host]:[port]
BACKEND_URL="https://20.83.184.244:9002"
OCC_PREFIX="/occ/v2/"

SPARTACUS_PROJECTS=(
        "projects/core"
        "projects/assets"
        "projects/storefrontlib"
        "projects/storefrontstyles"
        "projects/schematics"
        "integration-libs/cds"
        "core-libs/setup"
        "feature-libs/organization"
        "feature-libs/storefinder"
        "feature-libs/smartedit"
        "feature-libs/product-configurator"
        "feature-libs/qualtrics"
        )

SPARTACUS_REPO_URL="git://github.com/SAP/spartacus.git"
BRANCH='develop'

# custom location for the installation output
# BASE_DIR='/tmp/'

# other locations
CLONE_DIR="clone"
INSTALLATION_DIR="apps"
E2E_TEST_DIR=${CLONE_DIR}/projects/storefrontapp-e2e-cypress

ANGULAR_CLI_VERSION='~10.1.0'
SPARTACUS_VERSION='latest'

CSR_PORT="4200"
SSR_PORT="4100"
SSR_PWA_PORT=

CSR_APP_NAME="csr"
SSR_APP_NAME="ssr"
SSR_PWA_APP_NAME="ssr-pwa"

ADD_B2B_LIBS=false

ADD_PRODUCT_CONFIGURATOR=true
