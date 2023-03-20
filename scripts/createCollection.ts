import {ethers} from "hardhat";
import {CollectionHelpersFactory, UniqueNFTFactory} from "@unique-nft/solidity-interfaces"
import dotenv from "dotenv";

import { Address } from '@unique-nft/utils'

dotenv.config();


const { PRIVATE_KEY, RPC_OPAL } = process.env;

// const NFT_JSON_URL = `https://gateway.pinata.cloud/ipfs/bafkreiajeno7t5lyq7ws6kqo7z4d5zqbpxu3gmqi52jlb3jdx5o2jnt454`;
const NFT_JSON_URL = `https://gateway.pinata.cloud/ipfs/QmZ8Syn28bEhZJKYeZCxUTM5Ut74ccKKDbQCqk5AuYsEnp`;
const CONTRACT_ADDRESS = `0x29Bf40BDC587Cc852De9b668cf7d72cDFCBF76b4`;
const MY_ADDRESS = '0xA4f4590Ad25014950995B9e75740275DF9df7375';

// tx 0x58cce4db48f9fe804d11113212c7fdf7da4a549d2e641a46551f8053895737b0

// collection address 0x17C4e6453Cc49aaAaEaca894e6D9683E0000036f

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_OPAL!)
  const wallet = new ethers.Wallet(PRIVATE_KEY!, provider)

  // const CollectionManager = await ethers.getContractFactory("CollectionManager");
  //
  // // Start deployment, returning a promise that resolves to a contract object
  // const collectionManager = await CollectionManager.deploy(); // Instance of the contract
  //
  // console.log('collectionManager ', collectionManager.address);
  //
  // const collectionHelpers = await CollectionHelpersFactory(wallet, ethers);
  //
  const signer = ethers.provider.getSigner(MY_ADDRESS);
  //
  // const collectionCreationFee = await collectionHelpers.collectionCreationFee();
  //
  // console.log('collectionCreationFee ', collectionCreationFee.toString());
  //
  // const collectionTx = await collectionManager.createCollection(
  //   MY_ADDRESS,
  //   MY_ADDRESS,
  //   'Ann eth collection',
  //   'This collection is for testing purposes',
  //   'CL',
  //   'https://ipfs.unique.network/ipfs/',
  //   { value: collectionCreationFee }
  // )
  //
  // const transactionReceipt = await collectionTx.wait();
  // const collectionAddress = transactionReceipt.events?.[0].args?.collectionId as string

  const collectionAddress = '0x17c4E6453CC49aAAAEacA894e6D9683e000003E1';
  const collectionId = Address.collection.addressToId(collectionAddress);
  console.log('collectionAddress ', collectionAddress);
  console.log('collectionId ', collectionId);
  console.log(`https://uniquescan.io/OPAL/collections/${collectionId}`);

  const collection = await UniqueNFTFactory(collectionAddress, wallet, ethers)

  const tx = await collection.mintWithTokenURI(await signer.getAddress(), NFT_JSON_URL);
  const mintTokenTxReceipt = await tx.wait()
  console.log(`NFT Minted! Check it out tx hash is ${tx.hash}`)

  const tokenId = mintTokenTxReceipt.events?.[1].args?.tokenId.toNumber()
  const tokenUri = await collection.tokenURI(tokenId)
  console.log(`Successfully minted token #${tokenId}, it's URI is: ${tokenUri}`)

  console.log(`https://uniquescan.io/OPAL/tokens/${collectionId}/${tokenId}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
