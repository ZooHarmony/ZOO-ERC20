import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const IterableMappingLibrary = await ethers.getContractFactory("IterableMapping");
  const iterableMappingLibrary = await IterableMappingLibrary.deploy();
  await iterableMappingLibrary.deployed();

  console.log("IterableMappingLibrary deployed to:", iterableMappingLibrary.address);

  
  const TokenDividen = await ethers.getContractFactory("ZooHarmonyDividendTracker", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const TokenZoo = await ethers.getContractFactory("ZooHarmony",  {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });


  
  const tokenDividen = await TokenDividen.deploy();
  await tokenDividen.deployed();

  const tokenZoo = await TokenZoo.deploy();
  await tokenZoo.deployed();

  console.log("$ZooHarmonyDividendTracker deployed to:", tokenDividen.address);
  console.log("$ZooHarmony deployed to:", tokenZoo.address);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
