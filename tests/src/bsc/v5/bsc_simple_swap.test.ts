import { processTest, populateTransaction} from "../../test.fixture";

const contractName = "Paraswap V5";

const testLabel = "Simple Swap"; // <= Name of the test
const testDirSuffix = "simple_swap"; // <= directory to compare device snapshots to
const testNetwork = "bsc";
const signedPlugin = false;

const contractAddr = "0xdef171fe48cf0115b1d80b88dc8eab59176fee57";
const chainID = 56; // BSC

// From : https://bscscan.com/tx/0xe7bf1075167a955d5eb966176a43d8d20255b5a3cc1de783ea65f8c3d32ad7c5
const inputData = "0x54e3f31b0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d560000000000000000000000001af3f329e8be154074d8769d1ffa4ee058b1dbc300000000000000000000000000000000000000000000010f0cf064dd5920000000000000000000000000000000000000000000000000010eae1ace859e98c7ff00000000000000000000000000000000000000000000010ef377dac5d13cf02d00000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000070617261737761702e696f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003800000000000000000000000000000000000000000000000000000000061a66d9832c8181051d911ecac10f98b6719e1ba000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000b3f0c9ea1f05e312093fdb031e789a756659b0ac00000000000000000000000000000000000000000000000000000000000000843df021240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
  {
    name: "nanosp",
    label: "Nano S+",
    steps: 6 // <= Define the number of steps for this test case and this device
  },
  {
    name: "nanox",
    label: "Nano X",
    steps: 6 // <= Define the number of steps for this test case and this device
  },
  {
    name: "stax",
    label: "Stax",
  },
  {
    name: "flex",
    label: "Flex",
  }
];

devices.forEach((device) =>
  processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx,testNetwork)
);
