#!/bin/sh

_container="docker_eye_deploy_1"
_deps_cmd="npm install"
_start_cmd="node index.js"
_test_cmd="npm run test"

# die message stdout
die() {
    printf "[-] Error: $@\n" >&2
    exit 1
}

# exec command in the container (docker exec wrapper)
docker_exec() {
    # docker options
    local _flags=$1
    local _container=$2
    local _command=$3

    echo "running: docker exec" "${_flags}" "${_container} ${_command}"
    # show message

    # execute the commmand
    docker exec ${_flags} ${_container} sh -c "${_command}"
}

install_deps(){
    docker_exec "" "${_container}" "${_deps_cmd}"

}

run_server(){
    install_deps
    docker_exec "-d" "${_container}" "${_start_cmd}"
}

run_tests(){
    install_deps
    docker_exec "" "${_container}" "${_test_cmd}"
}


# parse script options
parse_opts(){
    # check args
    test $# -lt 1 && \
        die "missing arguments! -h for help"

    # get args
    for opt in "$@"; do
        case $opt in
            # set debug and verbose
            -v) shift 1; set -v ;;
            -x) shift 1; set -x ;;

            # run server
            server) run_server ;;

            # run tests
            tests) run_tests ;;

        esac
    done
}

main(){
    # parse options
    parse_opts $@
}

main "$@"
