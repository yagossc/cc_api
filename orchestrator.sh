#!/bin/sh

_file="./docker/docker-compose.yml"
_target=""
_action=""
_flags=""

# die message stdout
die() {
    printf "[-] Error: $@\n" >&2
    exit 1
}

help(){
    cat <<EOF
  -- Application exec util script --

    sh run.sh [-xvh] [server|tests]

    OPTIONS:

    -x  enable debugging.
    -v  enable verbose.
    -h  show help message and exit.

    EXAMPLES

    sh run.sh -x server
    sh run.sh -v tests

EOF
    exit 0
}

# lists the services in the composition
list(){
    docker_compose config "" --services
    exit 0
}

# docker compose (generic wrapper)
docker_compose() {
    # params
    local _action=$1; shift
    local _service=$1; shift

    # show message
    # echo "running: docker-compose -f" "${_file}" "${_action} ${@} ${_service}"

    # docker-compose (fundamental)
    docker-compose -f $_file $_action $@ $_service
}

conduct() {
    local _services=$(list)

    local _service

    for _service in $_services; do
        docker_compose up $_service -d

        # check exit code (and abort if necessary)
        test $? -gt 0 && die "error bringing service ${_service} up";
    done
    exit 0
}

# exec command in the container (docker exec wrapper)
docker_compose_exec() {
    # docker options
    local _flags=$1
    local _container=$2
    local _command=$3

    # show message
    # echo "running: docker exec" "${_flags}" "${_container} ${_command}"

    # execute the commmand
    docker-compose -f $_file exec -d \
                   $_service \
                   sh -c "${_command}"
}

# parses the script's needed arguments
parse_args(){
    test "$_target" = "" && \
        die "empty service name. -h for help"
    test "$_target" = "-s" && \
        die "empty service name. -h for help"
    test "$_action" = "" && \
        exit 0
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

            # print help
            -h|help) help ;;

            # list services
            -l|list) list ;;

            # sets the targert service
            -s) shift 1; _target="$1" ;;

            # build a service
            build) shift 1; _action="build"; _flags="--no-cache" ;;

            # plays a tune (ups a service)
            play) shift 1; _action="up"; _flags="-d" ;;

            # stops a tune|service
            stop) shift 1; _action="stop"; _flags="-t 5" ;;

            # plays all tunes (ups all services in the composition)
            -c|conduct) conduct ;;

        esac
    done
}

main(){
    # parse options
    parse_opts $@

    # parse args
    parse_args

    # dispatch the action
    docker_compose $_action $_target $_flags
}

main "$@"
