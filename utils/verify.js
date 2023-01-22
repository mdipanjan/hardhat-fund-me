const { run } = require("hardhat");

async function verify(contactAddress, args) {
    console.log("verifying contract..");
    try {
        await run("verify:verify", {
            address: contactAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(error, "Error");
        }
    }
}

module.exports = {
    verify,
};
