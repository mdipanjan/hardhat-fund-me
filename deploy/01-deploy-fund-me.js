// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let ethUsdPricefeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPricefeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPricefeedAddress = networkConfig[chainId]?.ethUsdPriceFeed;
    }
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPricefeedAddress],
        log: true,
    });
    log(fundMe, "Contract deployed ---------------");
};
module.exports.tags = ["all", "fundme"];
