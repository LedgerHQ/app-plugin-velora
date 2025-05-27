[![Ensure compliance with Ledger guidelines](https://github.com/blooo-io/app-plugin-paraswap/actions/workflows/guidelines_enforcer.yml/badge.svg?branch=develop)](https://github.com/blooo-io/app-plugin-paraswap/actions/workflows/guidelines_enforcer.yml)
[![Compilation & tests](https://github.com/blooo-io/app-plugin-paraswap/actions/workflows/ci-workflow.yml/badge.svg?branch=develop)](https://github.com/blooo-io/app-plugin-paraswap/actions/workflows/ci-workflow.yml)


# Ledger Velora Plugin

This is a plugin for the Ethereum application which helps parsing and displaying relevant information when signing a Velora transaction.


## Prerequisite

Clone the plugin to a new folder.

```shell
git clone https://github.com/blooo-io/app-plugin-paraswap.git
```

Then in the same folder clone one more repository, which is the app-ethereum.

```shell
git clone --recurse-submodules https://github.com/LedgerHQ/app-ethereum.git     #app-ethereum
```
## Documentation

Need more information about the interface, the architecture, or general stuff about ethereum plugins? You can find more about them [here](https://ethereum-plugin-sdk.ledger.com/).

## Smart Contracts

Smart contracts covered by this plugin are:

| Network | Version | Smart Contract |
| ---            | --- | --- |
| Arbitrum       | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Base           | V5  | `0x59c7c832e96d2568bea6db468c1aadcbbda08a52`|
| BSC            | V4  | `0x55a0e3b6579972055faa983482aceb4b251dcf15`|
| BSC            | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Ethereum       | V4  | `0x1bd435f3c054b6e901b7b108a0ab7617c808677b`|
| Ethereum       | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Fantom         | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Optimism       | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Polygon        | V4  | `0x90249ed4d69d70e709ffcd8bee2c5a566f65dade`|
| Polygon        | V5  | `0xdef171fe48cf0115b1d80b88dc8eab59176fee57`|
| Polygon ZK EVM | V5  | `0xb83b554730d29ce4cb55bb42206c3e2c03e4a40a`|


## Build

Go to the global folder (the one that contains both apps) and run the below command.
```shell
sudo docker run --rm -ti -v "$(realpath .):/app" --user $(id -u $USER):$(id -g $USER) ghcr.io/ledgerhq/ledger-app-builder/ledger-app-dev-tools:latest
```
The script will build a docker image and attach a console.
When the docker image is running go to the "app-plugin-velora" folder and build the ".elf" files.
```shell
cd app-plugin-velora/tests       # go to the tests folder in app-plugin-velora
./build_local_test_elfs.sh              # run the script build_local_test_elfs.sh
```

## Tests

To test the plugin go to the tests folder from the "app-plugin-velora" and run the script "test"
```shell
cd app-plugin-velora/tests       # go to the tests folder in app-plugin-velora
yarn test                       # run the script test
```
## Loading on a physical device

This step will vary slightly depending on your platform.

Your physical device must be connected, unlocked and the screen showing the dashboard (not inside an application).

**Linux (Ubuntu)**

First make sure you have the proper udev rules added on your host :

```shell
# Run these commands on your host, from the app's source folder.
sudo cp .vscode/20-ledger.ledgerblue.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules 
sudo udevadm trigger
```

Then once you have [opened a terminal](#with-a-terminal) in the `app-builder` image and [built the app](#compilation-and-load) for the device you want, run the following command :

```shell
# Run this command from the app-builder container terminal.
make load    # load the app on a Nano S by default
```

[Setting the BOLOS_SDK environment variable](#compilation-and-load) will allow you to load on whichever supported device you want.

**macOS / Windows (with PowerShell)**

It is assumed you have [Python](https://www.python.org/downloads/) installed on your computer.

Run these commands on your host from the app's source folder once you have [built the app](#compilation-and-load) for the device you want :

```shell
# Install Python virtualenv
python3 -m pip install virtualenv 
# Create the 'ledger' virtualenv
python3 -m virtualenv ledger
```

Enter the Python virtual environment

* macOS : `source ledger/bin/activate`
* Windows : `.\ledger\Scripts\Activate.ps1`

```shell
# Install Ledgerblue (tool to load the app)
python3 -m pip install ledgerblue 
# Load the app.
python3 -m ledgerblue.runScript --scp --fileName bin/app.apdu --elfFile bin/app.elf
```
## Continuous Integration


The flow processed in [GitHub Actions](https://github.com/features/actions) is the following:

- Code formatting with [clang-format](http://clang.llvm.org/docs/ClangFormat.html)
- Compilation of the application for Ledger Nano S in [ledger-app-builder](https://github.com/LedgerHQ/ledger-app-builder)