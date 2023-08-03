#!/usr/bin/env bash

WARNINGS=()
HAS_XVFB_INSTALLED=false

TIME_MEASUREMENT_CURR_TITLE="Start"
TIME_MEASUREMENT_TITLES=()
TIME_MEASUREMENT_TIMES=($(date +%s))

# Prints header and adds time measurement
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
    local temp_dir="${1}.delete"

    echo "deleting directory ${dir} in background"
    if [ -d ${temp_dir} ]; then
        delete_dir ${temp_dir}
    fi
    if [ -d ${dir} ]; then
        mv ${dir} ${temp_dir}
        rm -rf ${temp_dir} &
    fi
}

function cmd_clean {
    printh "Cleaning old spartacus installation workspace"

    delete_dir ${BASE_DIR}
    delete_dir storage

    npm cache clean --force
}

function prepare_install {
    cmd_clean

    printh "Installing installation script prerequisites"

    VERDACCIO_PID=`lsof -nP -i4TCP:4873 | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2`
    if [[ -n ${VERDACCIO_PID} ]]; then
        echo "Verdaccio is already running with PID: ${VERDACCIO_PID}. Killing it."
        kill ${VERDACCIO_PID}
    fi

    npm i -g verdaccio@5
    npm i -g npm-cli-login
    npm i -g serve@13.0.4
    npm i -g pm2
    npm i -g concurrently
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    ng config -g cli.packageManager npm

    mkdir -p ${INSTALLATION_DIR}
}

function clone_repo {
    printh "Cloning Spartacus installation repo."

    echo "Cloning branch ${BRANCH} from ${SPARTACUS_REPO_URL}. Currently in `pwd`"
    ls -l ${BASE_DIR}

    git clone -b ${BRANCH} ${SPARTACUS_REPO_URL} ${CLONE_DIR} --depth 1
}

function update_projects_versions {
    if [[ "${SPARTACUS_VERSION}" == "next" ]] || [[ "${SPARTACUS_VERSION}" == "latest" ]]; then
        SPARTACUS_VERSION="999.999.999"
    fi

    printh "Updating all library versions to ${SPARTACUS_VERSION}"
    (cd "${CLONE_DIR}/tools/config" && pwd && sed -i -E 's/PUBLISHING_VERSION = '\'\''/PUBLISHING_VERSION = '\'"${SPARTACUS_VERSION}"\''/g' const.ts);
    (cd "${CLONE_DIR}" && pwd && npm run config:update -- --generate-deps);

}

function create_shell_app {
    ( cd ${INSTALLATION_DIR} && ng new ${1} --style scss --no-routing)
}

function add_b2b {
    if [ "${ADD_B2B_LIBS}" = true ] ; then
        ng add @spartacus/organization@${SPARTACUS_VERSION} --skip-confirmation --no-interactive

        ng add @spartacus/checkout@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
        ng add @spartacus/checkout --skip-confirmation --no-interactive --features "Checkout-B2B" --features "Checkout-Scheduled-Replenishment"

        ng add @spartacus/product@${SPARTACUS_VERSION} --skip-confirmation
        ng add @spartacus/product --skip-confirmation --no-interactive --features "Future-Stock"
    fi
}

function add_cdc {
  if [ "$ADD_CDC" = true ] ; then
        ng add @spartacus/cdc@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
    fi
}

function add_epd_visualization {
    if [ "$ADD_EPD_VISUALIZATION" = true ] ; then
        ng add @spartacus/epd-visualization@${SPARTACUS_VERSION} --base-url ${EPD_VISUALIZATION_BASE_URL} --skip-confirmation --no-interactive
    fi
}

function add_product_configurator {
    ng add @spartacus/product-configurator@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
    ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "Textfield-Configurator" --features "VC-Configurator"

    if [ "$ADD_CPQ" = true ] ; then
        ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "CPQ-Configurator"
    fi
}

function add_s4om {
  if [ "$ADD_S4OM" = true ] ; then
        ng add --skip-confirmation @spartacus/s4om@${SPARTACUS_VERSION} --interactive false
    fi
}

# Don't install b2b features here (use add_b2b function for that)
function add_feature_libs {
  ng add @spartacus/tracking@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
  ng add @spartacus/tracking --skip-confirmation --no-interactive --features "TMS-GTM" --features "TMS-AEPL"
  
  ng add @spartacus/qualtrics@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
  ng add @spartacus/customer-ticketing --skip-confirmation --no-interactive
  ng add @spartacus/pickup-in-store --skip-confirmation --no-interactive
}

function add_spartacus_csr {
    local IS_NPM_INSTALL="$2"
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${CSR_APP_NAME}
    fi
    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --skip-confirmation --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --no-interactive
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --skip-confirmation --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --no-interactive
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    add_s4om
    remove_npmrc
    )
}

function add_spartacus_ssr {
    local IS_NPM_INSTALL="$2"
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${SSR_APP_NAME}
    fi

    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --ssr --no-interactive --skip-confirmation
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --ssr --no-interactive --skip-confirmation
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    add_s4om
    remove_npmrc
    )
}

function add_spartacus_ssr_pwa {
    local IS_NPM_INSTALL="$2"
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${SSR_PWA_APP_NAME}
    fi
    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --ssr --pwa --no-interactive --skip-confirmation
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --ssr --pwa --no-interactive --skip-confirmation
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    add_s4om
    remove_npmrc
    )
}

function create_apps {
    local IS_NPM_INSTALL="${1}"
    echo "create_apps is_npm_install: ${IS_NPM_INSTALL}"
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app install (no port defined)"
    else
        printh "Installing csr app"
        create_shell_app ${CSR_APP_NAME}
        add_spartacus_csr ${CSR_APP_NAME} ${IS_NPM_INSTALL}
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Installing ssr app"
        create_shell_app ${SSR_APP_NAME}
        add_spartacus_ssr ${SSR_APP_NAME} ${IS_NPM_INSTALL}
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Installing ssr app (with pwa support)"
        create_shell_app ${SSR_PWA_APP_NAME}
        add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME} ${IS_NPM_INSTALL}
    fi
}

function publish_package {
    local PKG_PATH=${1}
    echo "Creating ${PKG_PATH} npm package"
    (cd ${PKG_PATH} && npm publish --registry=http://localhost:4873/ --no-git-tag-version)
}


function restore_clone {
    projects=$@

    if [ ${BRANCH} == 'develop' ]; then
        pushd ../.. > /dev/null
        for path in ${projects[@]}
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
    run_system_check

    run_sanity_check

    printh "Installing @spartacus/*@${SPARTACUS_VERSION} from sources"

    prepare_install

    npm set @spartacus:registry http://localhost:4873/

    printh "Cloning Spartacus source code."
    clone_repo

    printh "Checking Packages"
    local project_packages=()
    local project_sources=()
    for project in ${SPARTACUS_PROJECTS[@]}; do
        local proj_pck_dir=${project%%:*}
        local proj_src_dir=${project#*:}

        local pkg_src_path="${CLONE_DIR}/${proj_src_dir}"
        if [ ! -d "${pkg_src_path}" ]; then
            WARNINGS+=("[PACKAGE_MISSING] Path not existing ($pkg_src_path).")
            printf " \033[33m[!]\033[m ${proj_pck_dir}: ${proj_src_dir}\n"
            continue
        fi

        project_packages+=( "${proj_pck_dir}" )
        project_sources+=( "${proj_src_dir}" )
        echo " [+] ${proj_pck_dir}: ${proj_src_dir}"
    done

    printh "Installing dependencies."
    ( cd ${CLONE_DIR} && npm install)

    printh "Updating projects versions."
    update_projects_versions

    printh "Building libraries."
    ( cd ${CLONE_DIR} && npm run build:libs)

    verdaccio --config ./config.yaml &

    VERDACCIO_PID=$!
    echo "verdaccio PID: ${VERDACCIO_PID}"

    sleep 15

    (npm-cli-login -u verdaccio-user -p 1234abcd -e verdaccio-user@spartacus.com -r http://localhost:4873)

    printh "Publish Packages"
    for project in ${project_packages[@]}; do
        publish_package "${CLONE_DIR}/${project}"
    done

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/

    restore_clone ${project_sources[@]}

    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"

    print_times
    print_summary
}

function install_from_npm {
    printh "Installing Spartacus from npm libraries"

    if [ -z "${NPM_URL}" ]; then
        echo "Please fill NPM_URL"
    else
        prepare_install

        #flag true to specify install is from npm
        create_apps true

        remove_npm_token
    fi

}

function build_csr {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app build (No port defined)"
    else
        printh "Building csr app"
        ( mkdir -p ${INSTALLATION_DIR}/${CSR_APP_NAME} && cd ${INSTALLATION_DIR}/${CSR_APP_NAME} && ng build --configuration production )
    fi
}

function build_ssr {
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app build (No port defined)"
    else
        printh "Building ssr app"
        ( mkdir -p ${INSTALLATION_DIR}/${SSR_APP_NAME} && cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && npm run build && npm run build:ssr )
    fi
}

function build_ssr_pwa {
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with PWA app build (No port defined)"
    else
        printh "Building ssr app with PWA"
        ( cd ${INSTALLATION_DIR}/${SSR_PWA_APP_NAME} && npm run build && npm run build:ssr )
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
    echo " install [...extensions] [--port <port>] [--branch <branch>] [--basesite <basesite>] [--skipsanity] (from sources)"
    echo " install_npm (from latest npm packages)"
    echo " start [--port <port>] [-c|--check] [--check-b2b] [--force-e2e] [--skip-e2e]"
    echo " stop [--port <port>]"
    echo " help"
}

function print_warnings {
    echo ""
    echo "${#WARNINGS[@]} Warnings"

    for WARNING in "${WARNINGS[@]}"
    do
        echo " ❗️ $WARNING"
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
        echo "⏩️ B2C E2E skipped (Option: --skip-e2e)."
        return 0
    fi

    if [ "$HAS_XVFB_INSTALLED" = false ] && [[ "$FORCE_B2B" = false ]] ; then
        echo "⏩️ E2E skipped (xvfb is missing)."
        return 0
    fi

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npm i &> /dev/null)
    local OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --spec "cypress/e2e/regression/checkout/checkout-flow.core-e2e.cy.ts")
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

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npm i &> /dev/null)
    OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --env BASE_SITE=powertools-spa,OCC_PREFIX_USER_ENDPOINT=orgUsers --spec "cypress/e2e/b2b/regression/checkout/b2b-credit-card-checkout-flow.core-e2e.cy.ts")
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

function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

function run_sanity_check {
    if [ "$SKIP_SANITY" = true ]; then
        printh "Skip config sanity check"
    else
        printh "Run config sanity check"
        ng_sanity_check
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

function run_system_check {
    printh "Checking system"

    HAS_XVFB_INSTALLED=false
    EXIT_CODE=0
    command -v xvfb-run &> /dev/null || EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ] ; then
        HAS_XVFB_INSTALLED=true
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
            -s|--basesite)
                BASE_SITE="$2"
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
            epd)
                ADD_EPD_VISUALIZATION=true
                echo "➖ Added EPD"
                shift
                ;;
            s4om)
                ADD_S4OM=true
                echo "➖ Added S4OM"
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
            --skip-e2e)
                SKIP_E2E=true
                echo "➖ Skip E2E Tests"
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

function parseStopArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
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

function add_time_measurement {
    local TITLE=${1};
    local START_TIME=${TIME_MEASUREMENT_TIMES[${#TIME_MEASUREMENT_TIMES[@]}-1]}
    local END_TIME=$(date +%s)
    local ELAPSED=$(($END_TIME - $START_TIME))
    TIME_MEASUREMENT_TIMES+=("$END_TIME")

    if [ $ELAPSED -gt 30 ]; then
        TIME_MEASUREMENT_TITLES+=("\033[31m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    elif [ $ELAPSED -gt 10 ]; then
        TIME_MEASUREMENT_TITLES+=("\033[33m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    else
        TIME_MEASUREMENT_TITLES+=("\033[32m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    fi

    TIME_MEASUREMENT_CURR_TITLE="$TITLE"
}

function print_times {
    add_time_measurement ""
    echo ""
    echo "Elapsed Time"

    for MEASURMENT in "${TIME_MEASUREMENT_TITLES[@]}"
    do
        printf " ┕ $MEASURMENT\n"
    done
}

function print_summary {
    local START_TIME=${TIME_MEASUREMENT_TIMES[0]}
    local END_TIME=$(date +%s)
    local ELAPSED=$(($END_TIME - $START_TIME))
    printf "\nOS: ${EXECUTING_OS}\n"
    printf "BRANCH: ${BRANCH}\n"
    printf "Total Time: \033[32m${ELAPSED}s\033[m\n\n"
}

function create_npmrc {
    local NPMRC_CONTENT="always-auth=${NPM_ALWAYS_AUTH}\n@spartacus:registry=${NPM_URL}\n$(echo ${NPM_URL} | sed 's/https://g'):_auth=${NPM_TOKEN}\n"
    if [ -z "$NPM_TOKEN" ] ; then
        echo "NPM_TOKEN is empty"
    fi
    echo "creating .npmrc file in ${1} folder"
    printf $NPMRC_CONTENT > .npmrc
    echo "Spartacus registry url for ${1} app: $(npm config get '@spartacus:registry')"
}

function remove_npmrc {
    if [ -f "./.npmrc" ]; then
        echo 'removing .npmrc file'
        rm -rf .npmrc
    fi
}

function remove_npm_token {
    if [[ -f "./config.sh" &&  ! -z "${NPM_TOKEN}" ]]; then
        echo 'removing NPM_TOKEN value from config.sh'
        sed -i'' -e 's/NPM_TOKEN=.*/NPM_TOKEN=/g' config.sh
    fi
    if [[ -f "./config.default.sh" &&  ! -z "${NPM_TOKEN}" ]]; then
        echo 'removing NPM_TOKEN value from config.default.sh'
        sed -i'' -e 's/NPM_TOKEN=.*/NPM_TOKEN=/g' config.default.sh
    fi
}
