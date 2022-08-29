#!/usr/bin/env bash

WARNINGS=()
TIME_MEASUREMENT_TITLES=("Start")
TIME_MEASUREMENT_TIMES=($(date +%s))

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
    add_time_measurement "$input"
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
    npm i -g serve@13.0.4
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
            try_command "[update_projects_versions] Could not update project ${CLONE_DIR}/${i}." "cd \"${CLONE_DIR}/${i}\" && pwd && sed -i -E 's/\"version\": \"[^\"]+/\"version\": \"'\"${SPARTACUS_VERSION}\"'/g' package.json"
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
        patch_app_module_ts ${CSR_APP_NAME}
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Installing ssr app"
        create_shell_app ${SSR_APP_NAME}
        add_spartacus_ssr ${SSR_APP_NAME}
        patch_app_module_ts ${SSR_APP_NAME}
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Installing ssr app (with pwa support)"
        create_shell_app ${SSR_PWA_APP_NAME}
        add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME}
        patch_app_module_ts ${SSR_PWA_APP_NAME}
    fi
}

function publish_dist_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    try_command "[publish_dist_package] Could not publish package ${CLONE_DIR}/dist/${PKG_NAME}." "cd ${CLONE_DIR}/dist/${PKG_NAME} && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version"
}

function publish_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    try_command "[publish_package] Could not publish package ${CLONE_DIR}/projects/${PKG_NAME}." "cd ${CLONE_DIR}/projects/${PKG_NAME} && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version"
}


function try_command {
    local ERRORMSG=${1};
    local TRY_COMMAND=${2};

    local EXIT_CODE=0
    bash -c "$TRY_COMMAND" || EXIT_CODE=$?

    if [ $EXIT_CODE -ne 0 ]; then
        WARNINGS+=("$ERRORMSG")
    fi
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
    run_sanity_check

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

    print_warnings

    print_times

    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"
}

function install_from_npm {
    run_sanity_check

    printh "Installing Spartacus from npm libraries"

    prepare_install

    create_apps

    print_warnings

    print_times
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

function patch_app_module_ts {
    printh "Patch App Module"
    if [ "$PATCH_APP_MODULE" = false ]; then
        echo " - Skipped"
        return
    fi

    local REPLACEMENTS=(
        false "@NgModule({" "import {\n    provideConfig,\n    RoutingConfig,\n} from '@spartacus/core';\n\n@NgModule({"
        false "providers: []," "providers: [\n    provideConfig(<RoutingConfig>{\n      // custom routing configuration for e2e testing\n      routing: {\n        routes: {\n          product: {\n            paths: ['product/:productCode/:name', 'product/:productCode'],\n            paramsMapping: { name: 'slug' },\n          },\n        },\n      },\n    }),\n  ],"
    )

    local FILE="${INSTALLATION_DIR}/${1}/src/app/app.module.ts";
    local RESULT=""

    while IFS="" read -r p || [ -n "$p" ]
    do
        local replaced=false
        
        for (( i=0; i<=$((${#REPLACEMENTS[@]} / 3 - 1)); i++ ))
        do
        local alreadyDone=${REPLACEMENTS[$i * 3]}
        local search=${REPLACEMENTS[$i * 3 + 1]}
        local replacement=${REPLACEMENTS[$i * 3 + 2]}
        if [ "$alreadyDone" = false ]; then
            local subres=${p//"$search"/"$replacement"}
            if [ "$p" != "$subres" ]; then
            replaced=true
            REPLACEMENTS[$i]=true
            RESULT="$RESULT\n$subres"
            fi
        fi
        done

        if [ "$replaced" = false ]; then
        RESULT="$RESULT\n$p"
        fi
    done < $FILE

    printf "$RESULT" > $FILE
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
    echo "Usage: run [command]"
    echo "Available commands are:"
    echo " install [...extensions] [--port <port>] [--branch <branch>] [--basesite <basesite>] [--skipsanity] [--patch] - (from sources), extensions available: b2b, cpq, cdc"
    echo " install_npm (from latest npm packages)"
    echo " start [--check] [--check-b2b] [--force-e2e]"
    echo " stop"
    echo " help"
}

function check_b2b {
    printh "Checking Sparatcus B2B"

    sleep 5

    echo "Running E2E ..."
    local E2E_RESULT=$(run_e2e_b2b)
    
    echo "$E2E_RESULT"
}

function check_apps {
    printh "Checking Sparatcus"

    sleep 5

    spinner check_csr "Checking CSR ..."
    local CSR_RESULT=$?

    spinner check_ssr "Checking SSR ..."
    local SSR_RESULT=$?

    spinner run_e2e "Checking E2E ..."
    local E2E_RESULT=$?
    
    echo "$E2E_RESULT"
    echo "$SSR_RESULT"
    echo "$CSR_RESULT"
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
    local EXIT_CODE_XVFB=0
    command -v xvfb-run &> /dev/null || EXIT_CODE_XVFB=$?
    if [ $EXIT_CODE_XVFB -ne 0 ] && [[ "$FORCE_B2B" = false ]] ; then
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
    local EXIT_CODE_XVFB=0
    command -v xvfb-run &> /dev/null || EXIT_CODE_XVFB=$?
    if [ $EXIT_CODE_XVFB -ne 0 ] && [[ "$FORCE_B2B" = false ]] ; then
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

function print_warnings {
    echo ""
    echo "${#WARNINGS[@]} Warnings"

    for WARNING in "${WARNINGS[@]}"
    do
        echo " ❗️ $WARNING"
    done
}

function add_time_measurement {
    local TITLE=${1};
    local START_TIME=${TIME_MEASUREMENT_TIMES[${#TIME_MEASUREMENT_TIMES[@]}-1]}
    local END_TIME=$(date +%s)
    local ELAPSED=$(($END_TIME - $START_TIME))
    TIME_MEASUREMENT_TIMES+=("$END_TIME")

    if [ $ELAPSED -gt 30 ]; then 
        TIME_MEASUREMENT_TITLES+=("\033[31m${ELAPSED}s\033[m\t$TITLE")
    elif [ $ELAPSED -gt 10 ]; then 
        TIME_MEASUREMENT_TITLES+=("\033[33m${ELAPSED}s\033[m\t$TITLE")
    else
        TIME_MEASUREMENT_TITLES+=("\033[32m${ELAPSED}s\033[m\t$TITLE")
    fi
}

function print_times {
    echo ""
    echo "Elapsed Time"

    for MEASURMENT in "${TIME_MEASUREMENT_TITLES[@]}"
    do
        printf " ┕ $MEASURMENT\n"
    done
}

function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

function run_sanity_check {
    if [ "$SKIP_SANITY" = true ]; then
        printh "Skip config sanity check"
    else
        printh "Run config sanity check"
        ng_sanity_check
        basesite_sanity_check
    fi
}

function basesite_sanity_check {
    if [ $ADD_B2B_LIBS = true ] && [ "$BASE_SITE" != "powertools-spa" ]; then
        echo "❗️ You are trying to install with B2B Libraries. You may want to set the BASE_SITE to 'powertools-spa'"
        echo ""
        read -p "Do you want to [c]ontinue anyways, [o]verwrite BASE_SITE with 'powertools-spa' or [a]bort? (c/o/a) " yn
        case $yn in 
            c ) echo "continue";;
            o ) echo "Overwrite BASE_SITE with 'powertools-spa'"
                BASE_SITE='powertools-spa';;
            a ) echo "abort";
                exit;;
            * ) echo "invalid response";
                exit 1;;
        esac
    fi
}

function ng_sanity_check {
    if [[ "$BRANCH" == release/4.0.* ]] || [[ "$BRANCH" == release/4.3.* ]]; then
        local CLEAN_VERSION=$(echo "$ANGULAR_CLI_VERSION" | sed 's/[^0-9\.]//g')
        if [ $(version $CLEAN_VERSION) -ge $(version "13.0.0") ]; then
            echo "❗️ You are trying to install a release which seems to be uncompatible with AngularCLI 13.0.0 or higher."
            echo "   Try to use AngularCLI higher than 12.0.0 and lower than 13.0.0."
            echo "   Example: ANGULAR_CLI_VERSION='^12.0.5'"
            echo ""
            read -p "Do you want to [c]ontinue anyways, [o]verwrite ANGULAR_CLI_VERSION with '^12.0.5' or [a]bort? (c/o/a) " yn
            case $yn in 
                c ) echo "continue";;
                o ) echo "Overwrite ANGULAR_CLI_VERSION with '^12.0.5'"
                    ANGULAR_CLI_VERSION='^12.0.5';;
                a ) echo "abort";
                    exit;;
                * ) echo "invalid response";
                    exit 1;;
            esac
        fi
    fi

    if [[ "$BRANCH" == release/5.0.* ]]; then
        local CLEAN_VERSION=$(echo "$ANGULAR_CLI_VERSION" | sed 's/[^0-9\.]//g')
        if [ $(version $CLEAN_VERSION) -lt $(version "13.0.0") ]; then
            echo "❗️ You are trying to install a release which seems to be uncompatible with AngularCLI lower than 13.0.0. "
            echo "   Try to use AngularCLI 13.0.0 or higher."
            echo "   Example: ANGULAR_CLI_VERSION='^13.3.0'"
            echo ""
            read -p "Do you want to [c]ontinue anyways, [o]verwrite ANGULAR_CLI_VERSION with '^13.3.0' or [a]bort? (c/o/a) " yn
            case $yn in 
                c ) echo "continue";;
                o ) echo "Overwrite ANGULAR_CLI_VERSION with '^13.3.0'"
                    ANGULAR_CLI_VERSION='^13.3.0';;
                a ) echo "abort";
                    exit;;
                * ) echo "invalid response";
                    exit 1;;
            esac
        fi
    fi
}

function parseInstallArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skipsanity)
                SKIP_SANITY=true
                echo "➖ Skip Sanity Check"
                shift
                ;;
            --patch)
                PATCH_APP_MODULE=true
                echo "➖ Patch App Module"
                shift
                ;;
            -s|--basesite)
                BASE_URL="$2"
                echo "➖ BASE_SITE to $BASE_SITE"
                shift
                shift
                ;;
            -b|--branch)
                BRANCH="$2"
                echo "➖ Branch to $BRANCH"
                shift
                shift
                ;;
            -p|--port)
                local PORTS
                IFS=',' read -ra PORTS <<< "$2"
                if [ ${#PORTS[@]} -eq 2 ]; then
                    CSR_PORT="${PORTS[0]}"
                    SSR_PORT="${PORTS[1]}"
                    echo "➖ Set CSR Port to $CSR_PORT and SSR Port to $SSR_PORT"
                else
                    echo "Invalid Format: <CSRPort>,<SSRPort>"
                    exit 1
                fi
                shift
                shift
                ;;
            b2b)
                ADD_B2B_LIBS=true
                echo "➖ Added B2B Libs"         
                shift
                ;;
            cpq)
                ADD_CPQ=true
                echo "➖ Added CPQ"   
                shift
                ;;
            cdc)
                ADD_CDC=true
                echo "➖ Added CDC"   
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
            --force-e2e)
                FORCE_E2E=true
                echo "➖ Force E2E Tests"
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

function spinner {
  local frameRef
  local action="${1}"
  local label="${2} "
  local frames=("⠋" "⠙" "⠹" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")
  local result
  result=${action} & pid=$!
  tput civis -- invisible

  while ps -p $pid &>/dev/null; do
    for frame in ${!frames[@]}; do
      currFrame="${frames[frame]}"
      echo -ne "\\r[ \033[36m${currFrame}\033[m ] ${label}"
      sleep 0.1
    done
  done

  echo -ne "\\r[ \033[32m✔\033[m ] ${STEPS[$step]}\\n"
  tput cnorm -- normal
  return result
}
