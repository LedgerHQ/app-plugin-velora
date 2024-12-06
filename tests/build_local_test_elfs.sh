#!/bin/bash

# FILL THESE WITH YOUR OWN SDKs PATHS and APP-ETHEREUM's ROOT
#NANOS_SDK=
#NANOX_SDK=
#NANOSP_SDK=
#FLEX_SDK=
#STAX_SDK=
APP_ETHEREUM=/plugin_dev/app-ethereum

# Create elfs folder if it doesn't exist
mkdir -p elfs

# Function to build both plugin and ethereum apps for a specific device
build_device_elfs() {
    local device=$1
    local sdk_var="${device}_SDK"
    
    echo "*Building elfs for ${device}..."
    export BOLOS_SDK="${!sdk_var}"

    # Build plugin
    echo "**Building app-paraswap for ${device}..."
    make clean
    make -j DEBUG=1
    cp bin/app.elf "tests/elfs/plugin_${device,,}.elf"

    # Build ethereum app
    echo "**Building app-ethereum for ${device}..."
    cd "$APP_ETHEREUM" || exit
    make clean BOLOS_SDK="${!sdk_var}"
    make -j DEBUG=1 BOLOS_SDK="${!sdk_var}" CHAIN=ethereum BYPASS_SIGNATURES=1 ALLOW_DATA=1
    cd - || exit
    cp "${APP_ETHEREUM}/bin/app.elf" "tests/elfs/ethereum_${device,,}.elf"
}

# Move to repo's root to build apps
cd ..

# List of supported devices
DEVICES=("NANOS" "NANOX" "NANOSP" "FLEX" "STAX")

# Build for each device
for device in "${DEVICES[@]}"; do
    build_device_elfs "$device"
done

echo "done"
