#!/usr/bin/env bash

# Prints header
function printh {
    local input="$1"
    local len=$((${#1}+2))
    printf "\033[32m" # start green color
    printf "\n+"
    printf -- "-%.0s" $(seq 1 $len)
    printf "+\n| $input |\n+"
    printf -- "-%.0s" $(seq 1 $len)
    printf "+\n\n"
    printf "\033[0m" # end green color
}

function delete_dir {
    local dir="${1}"
    if [ -d ${dir} ]; then
        echo "deleting directory ./${dir}"
        rm -rf ${dir}
    fi
}

function cmd_clean {
    printh "Cleaning old spartacus installation workspace"

    delete_dir ${BASE_DIR}
    delete_dir storage

    yarn cache clean
}

function prepare_install {
    cmd_clean

    printh "Installing installation script prerequisites"

    VERDACCIO_PID=`lsof -nP -i4TCP:4873 | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2`
    if [[ -n ${VERDACCIO_PID} ]]; then
        echo "Verdaccio is already running with PID: ${VERDACCIO_PID}. Killing it."
        kill ${VERDACCIO_PID}
    fi

    npm config set @spartacus:registry https://registry.npmjs.org/

    npm i -g verdaccio@5
    npm i -g npm-cli-login
    npm i -g serve
    npm i -g pm2
    npm i -g concurrently
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    ng config -g cli.packageManager yarn

    mkdir -p ${INSTALLATION_DIR}
    ng analytics off
}

function clone_repo {
    printh "Cloning Spartacus installation repo."

    echo "Cloning from ${SPARTACUS_REPO_URL}. Currently in `pwd`"
    ls -l ${BASE_DIR}

    git clone -b ${BRANCH} ${SPARTACUS_REPO_URL} ${CLONE_DIR} --depth 1
}

function update_projects_versions {

    projects=$@
    if [[ "${SPARTACUS_VERSION}" == "next" ]] || [[ "${SPARTACUS_VERSION}" == "latest" ]]; then
        SPARTACUS_VERSION="999.999.999"
    fi

    printh "Updating all library versions to ${SPARTACUS_VERSION}"
    for i in ${projects}
        do
            (cd "${CLONE_DIR}/${i}" && pwd && sed -i -E 's/"version": "[^"]+/"version": "'"${SPARTACUS_VERSION}"'/g' package.json);
        done
}

function create_shell_app {
    ( cd ${INSTALLATION_DIR} && ng new ${1} --style=scss --routing=false)
}

function add_b2b {
    if [ "${ADD_B2B_LIBS}" = true ] ; then
        ng add --skip-confirmation @spartacus/organization@${SPARTACUS_VERSION} --interactive false
        ng add --skip-confirmation @spartacus/checkout@${SPARTACUS_VERSION} --interactive false --features="Checkout-B2B" --features="Checkout-Scheduled-Replenishment"
    fi
}

function add_cdc {
  if [ "$ADD_CDC" = true ] ; then
        ng add --skip-confirmation @spartacus/cdc@${SPARTACUS_VERSION} --interactive false
    fi
}

function add_epd_visualization {
    if [ "$ADD_EPD_VISUALIZATION" = true ] ; then
        ng add --skip-confirmation @spartacus/epd-visualization@${SPARTACUS_VERSION} --baseUrl ${EPD_VISUALIZATION_BASE_URL} --interactive false
    fi
}

function add_product_configurator {
    ng add --skip-confirmation @spartacus/product-configurator@${SPARTACUS_VERSION} --interactive false --features="Textfield-Configurator" --features="VC-Configurator"

    if [ "$ADD_CPQ" = true ] ; then
        ng add --skip-confirmation @spartacus/product-configurator@${SPARTACUS_VERSION} --interactive false --features="CPQ-Configurator"
    fi
}

# Don't install b2b features here (use add_b2b function for that)
function add_feature_libs {
  ng add --skip-confirmation @spartacus/tracking@${SPARTACUS_VERSION} --interactive false --features="TMS-GTM" --features="TMS-AEPL"
  ng add --skip-confirmation @spartacus/qualtrics@${SPARTACUS_VERSION} --interactive false
}

function add_spartacus_csr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function add_spartacus_ssr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --ssr --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --ssr --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function add_spartacus_ssr_pwa {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --ssr --pwa --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --ssr --pwa --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function create_apps {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app install (no port defined)"
    else
        printh "Installing csr app"
        create_shell_app ${CSR_APP_NAME}
        add_spartacus_csr ${CSR_APP_NAME}
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Installing ssr app"
        create_shell_app ${SSR_APP_NAME}
        add_spartacus_ssr ${SSR_APP_NAME}
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Installing ssr app (with pwa support)"
        create_shell_app ${SSR_PWA_APP_NAME}
        add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME}
    fi
}

function publish_dist_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    ( cd ${CLONE_DIR}/dist/${PKG_NAME} && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )
}

function publish_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    ( cd ${CLONE_DIR}/projects/${PKG_NAME} && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )
}

function restore_clone {
    if [ ${BRANCH} == 'develop' ]; then
        pushd ../.. > /dev/null
        for path in ${SPARTACUS_PROJECTS[@]}
        do
            if [ -f "${path}/package.json-E" ]; then
                rm ${path}/package.json-E
            fi
        done
        git checkout .
        popd > /dev/null
    fi
}

function install_from_sources {
    printh "Installing @spartacus/*@${SPARTACUS_VERSION} from sources"

    prepare_install

    npm set @spartacus:registry http://localhost:4873/

    printh "Cloning Spartacus source code and installing dependencies."
    clone_repo
    ( cd ${CLONE_DIR} && yarn install && yarn build:libs)

    printh "Updating projects versions."
    update_projects_versions ${SPARTACUS_PROJECTS[@]}

    verdaccio --config ./config.yaml &

    VERDACCIO_PID=$!
    echo "verdaccio PID: ${VERDACCIO_PID}"

    sleep 15

    (npm-cli-login -u verdaccio-user -p 1234abcd -e verdaccio-user@spartacus.com -r http://localhost:4873)

    local dist_packages=(
        'core'
        'storefrontlib'
        'assets'
        'checkout'
        'product'
        'setup'
        'cart'
        'order'
        'asm'
        'user'
        'organization'
        'storefinder'
        'tracking'
        'qualtrics'
        'smartedit'
        'cds'
        'cdc'
        'epd-visualization'
        'product-configurator'
    )

    local packages=(
        'storefrontstyles'
        'schematics'
    )

    for package in ${dist_packages[@]}; do
        publish_dist_package ${package}
    done

    for package in ${packages[@]}; do
        publish_package ${package}
    done

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/

    restore_clone

    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"
}

function install_from_npm {
    printh "Installing Spartacus from npm libraries"

    prepare_install

    create_apps
}

function build_csr {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app build (No port defined)"
    else
        printh "Building csr app"
        ( cd ${INSTALLATION_DIR}/${CSR_APP_NAME} && yarn build --configuration production )
    fi
}

function build_ssr {
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app build (No port defined)"
    else
        printh "Building ssr app"
        ( cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && yarn build && yarn build:ssr )
    fi
}

function build_ssr_pwa {
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with PWA app build (No port defined)"
    else
        printh "Building ssr app with PWA"
        ( cd ${INSTALLATION_DIR}/${SSR_PWA_APP_NAME} && yarn build && yarn build:ssr )
    fi
}

function start_csr_unix {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app start (no port defined)"
    else
        build_csr
        printh "Starting csr app"
        pm2 start --name "${CSR_APP_NAME}-${CSR_PORT}" serve -- ${INSTALLATION_DIR}/${CSR_APP_NAME}/dist/${CSR_APP_NAME}/ --single -p ${CSR_PORT}
    fi
}

function start_ssr_unix {
     if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app start (no port defined)"
    else
        build_ssr
        printh "Starting ssr app"
        ( cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && export PORT=${SSR_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "${SSR_APP_NAME}-${SSR_PORT}" dist/${SSR_APP_NAME}/server/main.js )
    fi
}

function start_ssr_pwa_unix {
     if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr (with pwa support) app start (no port defined)"
    else
        build_ssr_pwa
        printh "Starting ssr app (with pwa support)"
        ( cd ${INSTALLATION_DIR}/${SSR_PWA_APP_NAME} && export PORT=${SSR_PWA_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "${SSR_PWA_APP_NAME}-${SSR_PWA_PORT}" dist/${SSR_PWA_APP_NAME}/server/main.js )
    fi
}

function start_windows_apps {
    build_csr
    concurrently "serve ${INSTALLATION_DIR}/${CSR_APP_NAME}/dist/csr --single -p ${CSR_PORT}" --names "${CSR_APP_NAME}-{CSR_PORT}}"
}

function start_apps {
    if [[ "${OSTYPE}" == "cygwin" ]]; then
        start_windows_apps
    elif [[ "${OSTYPE}" == "msys" ]]; then
        start_windows_apps
    elif [[ "${OSTYPE}" == "win32" ]]; then
        start_windows_apps
    else
        start_csr_unix
        start_ssr_unix
        start_ssr_pwa_unix
    fi

    if [[ "$CHECK_AFTER_START" = true ]] ; then
        check_apps
    fi

    if [[ "$CHECK_B2B_AFTER_START" = true ]] ; then
        check_b2b
    fi
}

function stop_apps {
    pm2 stop "${CSR_APP_NAME}-${CSR_PORT}"
    pm2 stop "${SSR_APP_NAME}-${SSR_PORT}"
    pm2 stop "${SSR_PWA_APP_NAME}-${SSR_PORT}"
}

function cmd_help {
    echo "Usage: run [command] [options...]"
    echo "Available commands are:"
    echo " install (from sources)"
    echo " install_npm (from latest npm packages)"
    echo " start [--check] [--check-b2b] [--test-out <outfile>] [--force-e2e] [--skip-e2e]"
    echo " stop"
    echo " help"
}

function parseStartArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
            -c|--check)
                CHECK_AFTER_START=true
                echo "➖ Check SSR and SSR after start"
                shift
                ;;
            --check-b2b)
                CHECK_B2B_AFTER_START=true
                echo "➖ Check B2B after start"
                shift
                ;;
            --test-out)
                TEST_OUT="$2"
                echo "➖ TEST_OUT to $TEST_OUT"
                shift
                shift
                ;;
            --force-e2e)
                FORCE_E2E=true
                echo "➖ Force E2E Tests"
                shift
                ;;
            --skip-e2e)
                SKIP_E2E=true
                echo "➖ Skip E2E Tests"
                shift
                ;;
            -*|--*)
                echo "Unknown option $1"
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}

function check_apps {
    printh "Checking Sparatcus"

    sleep 5

    echo "Checking CSR ..."
    local CSR_RESULT=$(check_csr)

    echo "Checking SSR ..."
    local SSR_RESULT=$(check_ssr)

    echo "Running E2E ..."
    local E2E_RESULT=$(run_e2e)
    
    echo ""
    echo "$E2E_RESULT"
    echo "$SSR_RESULT"
    echo "$CSR_RESULT"

    if [ "$TEST_OUT" != "" ]; then
        local now=$(date)
        echo -e "\n============================================================\n ⛑️\tB2C TEST | $now \n============================================================\n" >> "$TEST_OUT"
        echo "$E2E_RESULT" >> "$TEST_OUT"
        echo "$SSR_RESULT" >> "$TEST_OUT"
        echo "$CSR_RESULT" >> "$TEST_OUT"
        echo -e "\n📝 Append results to $TEST_OUT\n"
    fi
}

function check_b2b {
    printh "Checking Sparatcus B2B"

    sleep 5

    echo "Checking CSR ..."
    local CSR_RESULT=$(check_csr)

    echo "Checking SSR ..."
    local SSR_RESULT=$(check_ssr)

    echo "Running E2E ..."
    local E2E_RESULT=$(run_e2e_b2b)
    
    echo ""
    echo "$E2E_RESULT"
    echo "$SSR_RESULT"
    echo "$CSR_RESULT"

    if [ "$TEST_OUT" != "" ]; then
        local now=$(date)
        echo -e "\n=====================================================================\n ⛑️\tB2B TEST | $now \n=====================================================================\n" >> "$TEST_OUT"
        echo "$E2E_RESULT" >> "$TEST_OUT"
        echo "$SSR_RESULT" >> "$TEST_OUT"
        echo "$CSR_RESULT" >> "$TEST_OUT"
        echo -e "\n📝 Append results to $TEST_OUT\n"
    fi
}

function check_csr {
    local EXIT_CODE=0
    curl http://127.0.0.1:4200 &> /dev/null || EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ CSR is working."
    else
        echo "🚫 CSR is NOT working."
    fi
}

function check_ssr {
    local EXIT_CODE=0
    curl http://127.0.0.1:4100 &> /dev/null || EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ SSR is working."
    else
        echo "🚫 SSR is NOT working."
    fi
}

function run_e2e {
    if [[ "$SKIP_E2E" = true ]] ; then
        echo "⏩️ B2B E2E skipped (Option: --skip-e2e)."
        return 0
    fi

    if [ "$HAS_XVFB_INSTALLED" = false ] && [[ "$FORCE_B2B" = false ]] ; then
        echo "⏩️ E2E skipped (xvfb is missing)."
        return 0
    fi

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; yarn &> /dev/null)
    local OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --spec "cypress/integration/regression/checkout/checkout-flow.core-e2e-spec.ts")
    local EXIT_CODE=$?

    echo "$OUTPUT"
    echo ""

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ E2E successful."
    else
        echo "🚫 E2E failed."
    fi
}

function run_e2e_b2b {
    if [[ "$SKIP_E2E" = true ]] ; then
        echo "⏩️ B2B E2E skipped (Option: --skip-e2e)."
        return 0
    fi

    if [ "$HAS_XVFB_INSTALLED" = false ] && [[ "$FORCE_E2E" = false ]] ; then
        echo "⏩️ B2B E2E skipped (xvfb is missing)."
        return 0
    fi

    local OUTPUT
    local EXIT_CODE_1
    local EXIT_CODE_2

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; yarn &> /dev/null)
    OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --env BASE_SITE=powertools-spa,OCC_PREFIX_USER_ENDPOINT=orgUsers --spec "cypress/integration/b2b/regression/checkout/b2b-credit-card-checkout-flow.core-e2e-spec.ts")
    EXIT_CODE_1=$?

    echo "$OUTPUT"
    echo ""

    OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --env BASE_SITE=powertools-spa,OCC_PREFIX_USER_ENDPOINT=orgUsers --spec "cypress/integration/b2b/regression/checkout/b2b-account-checkout-flow.core-e2e-spec.ts")
    EXIT_CODE_2=$?

    echo "$OUTPUT"
    echo ""

    if [ $EXIT_CODE_1 -eq 0 ]; then
        echo "✅ [1|2] B2B E2E successful."
    else
        echo "🚫 [1|2] B2B E2E failed."
    fi

    if [ $EXIT_CODE_2 -eq 0 ]; then
        echo "✅ [2|2] B2B E2E successful."
    else
        echo "🚫 [2|2] B2B E2E failed."
    fi
}