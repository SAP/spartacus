#!/usr/bin/env bash
set -e

source ./functions.sh

if [ -z "${1}" ]; then
    cmd_help
    exit 1
fi

readonly commands="${1}"

echo "Loading configs from ./config.default.sh"
. ./config.default.sh

if [ -f "./config.sh" ]; then
    echo "Custom config file ./config.sh found. Loading configurations (overriding vars from the default config)."
    . ./config.sh
fi

if [[ -z ${SPARTACUS_VERSION} ]]; then
    SPARTACUS_VERSION="latest"
fi

if [[ -z ${BRANCH} ]]; then
    BRANCH="develop"
fi

if [[ -z ${CSR_APP_NAME} ]]; then
    CSR_APP_NAME="csr"
fi

if [[ -z ${SSR_APP_NAME} ]]; then
    SSR_APP_NAME="ssr"
fi

if [[ -z ${SSR_PWA_APP_NAME} ]]; then
    SSR_PWA_APP_NAME="ssr-pwa"
fi

# top directory for the installation (must be outside of the main project)
if [ -z ${BASE_DIR} ]; then
    BASE_DIR="../../../spartacus-${SPARTACUS_VERSION}"
    echo "Setting base directory to ${BASE_DIR}"
fi

CLONE_DIR="${BASE_DIR}/${CLONE_DIR}"
INSTALLATION_DIR="${BASE_DIR}/${INSTALLATION_DIR}"
CHECK_AFTER_START=false

for current_command in $(echo "${commands}" | tr "+" "\n"); do

    case "${current_command}" in
        'install' )
            parseInstallArgs $@ 
            install_from_sources;;
        'install_npm' )
            parseInstallArgs $@
            install_from_npm;;
        'start' )
            if [[ $* == *--check* ]] ; then
                CHECK_AFTER_START=true
                echo "➖ Run Check after Installation"
            fi
            start_apps;;
        'stop' )
            stop_apps;;
        'check' )
            run_check;;
        'help' )
            cmd_help;;
        * )
            echo "Error: unknown command ${current_command}"
            cmd_help
            exit 1;;
    esac
done
