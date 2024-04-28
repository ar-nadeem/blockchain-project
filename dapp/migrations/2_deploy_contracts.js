var Kickstarter = artifacts.require("Kickstarter");
module.exports = function(deployer) {
  deployer.deploy(Kickstarter);
};