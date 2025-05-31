
import * as Kilt from "@kiltprotocol/sdk-js";
import { KiltAddress, SignerInterface } from "@kiltprotocol/types";
import { verifyDid } from "./addVerification2Did.js";
import { claimW3N } from "./claimW3N.js";
import { generateAccounts } from "./generateAccount.js";
import { generateDid } from "./generateDid.js";
import { issueCredential } from "./issueCredential.js";

async function runAll(): Promise<void> {
  let api = await Kilt.connect("wss://peregrine.kilt.io/");

  console.log("connected");

  // const faucet = {
  //   publicKey: new Uint8Array([
  //     238, 93, 102, 137, 215, 142, 38, 187, 91, 53, 176, 68, 23, 64, 160, 101,
  //     199, 189, 142, 253, 209, 193, 84, 34, 7, 92, 63, 43, 32, 33, 181, 210,
  //   ]),
  //   secretKey: new Uint8Array([
  //     205, 253, 96, 36, 210, 176, 235, 162, 125, 84, 204, 146, 164, 76, 217,
  //     166, 39, 198, 155, 45, 189, 161, 94, 215, 229, 128, 133, 66, 81, 25, 174,
  //     3,
  //   ]),
  // };

  // const [submitter] = (await Kilt.getSignersForKeypair({
  //   keypair: faucet,
  //   type: "Ed25519",
  // })) as Array<SignerInterface<"Ed25519", KiltAddress>>;

  // console.log("submitter id is ", submitter.id);
  // submitter.
  // const balance = await api.query.system.account(submitter.id);
  // console.log("balance", balance.toHuman());
  let { holderAccount, issuerAccount } = generateAccounts();
  console.log("Successfully transferred tokens");

  let holderDid = await generateDid( holderAccount);
  console.log("holder did is " , holderAccount);
  // await claimW3N(
  //   "testw3nabc",
  //   holderDid.didDocument,
  //   holderDid.signers,
  //   submitter
  // );

  // let issuerDid = await generateDid(submitter, issuerAccount);

  // issuerDid = await verifyDid(
  //   submitter,
  //   issuerDid.didDocument,
  //   issuerDid.signers
  // );

  // const credential = await issueCredential(
  //   issuerDid.didDocument,
  //   holderDid.didDocument,
  //   issuerDid.signers,
  //   submitter
  // );

  // console.log("Credential", credential);

  await api.disconnect();
  console.log("disconnected");
}

runAll()
  .then(() => {
    console.log("All done");
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Finally");
    process.exit();
  });





// // import * as Kilt from "@kiltprotocol/sdk-js";
// // import { Keyring } from "@kiltprotocol/utils";
// // import { verifyDid } from "./addVerification2Did";
// // import { generateAccounts } from "./generateAccount";
// // import { generateDid } from "./generateDid";
// // import { issueCredential } from "./issueCredential";

// // async function runAll(): Promise<void> {
// //   let api = await Kilt.connect("wss://peregrine.kilt.io/");

// //   console.log("connected");

// //   const faucetAccount = Kilt.generateKeypair({
// //     type: "ed25519",
// //     seed: "0xe566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
// //   });

// //   // Yeni bir Keyring örneği oluştur
// //   const keyring = new Keyring({ type: "ed25519" });

// //   // Seed'den KeyringPair oluştur
// //   const keyringPair = keyring.addFromSeed(
// //     Buffer.from(
// //       "e566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
// //       "hex"
// //     )
// //   );

// //   let { issuerAccount, submitterAccount, holderAccount, verifierAccount } =
// //     generateAccounts();
// //   console.log("Successfully transferred tokens");
// //   submitterAccount = faucetAccount;
// //   let issuerDid = await generateDid(faucetAccount, issuerAccount);
// //   let holderDid = await generateDid(faucetAccount, holderAccount);
// //   //let verifierDid = await generateVerifierDid(faucetAccount, verifierAccount)

// //   issuerDid = await verifyDid(
// //     submitterAccount,
// //     issuerDid.didDocument,
// //     issuerDid.signers
// //   );

// //   const credential = await issueCredential(
// //     issuerDid.didDocument,
// //     holderDid.didDocument,
// //     issuerDid.signers,
// //     submitterAccount
// //   );
// // console.log("credential", credential);
// //   await api.disconnect();
// //   console.log("disconnected");
// // }
// // runAll();

// import * as Kilt from "@kiltprotocol/sdk-js";
// import { Keyring } from "@kiltprotocol/utils";
// import { verifyDid } from "./addVerification2Did";
// import { generateAccounts } from "./generateAccount";
// import { generateDid } from "./generateDid";
// import { issueCredential } from "./issueCredential";
// import * as bip39 from "bip39";
// import { MultibaseKeyPair } from "@kiltprotocol/types";
// import { claimW3N } from "./claimW3N";
// async function runAll(): Promise<void> {
//   let api = await Kilt.connect("wss://peregrine.kilt.io/");

//   console.log("connected step 1");

//   // Generate a BIP39 mnemonic
//   // const mnemonic = bip39.generateMnemonic();
//   const mnemonic =
//     "tackle rain name quote cover possible reopen tower make symbol cactus more";

//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   const slicedSeed = seed.slice(0, 32);

// //   export const faucetAccount = {
// //   publicKey: new Uint8Array([
// //     238, 93, 102, 137, 215, 142, 38, 187, 91, 53, 176, 68, 23, 64, 160, 101,
// //     199, 189, 142, 253, 209, 193, 84, 34, 7, 92, 63, 43, 32, 33, 181, 210,
// //   ]),
// //   secretKey: new Uint8Array([
// //     205, 253, 96, 36, 210, 176, 235, 162, 125, 84, 204, 146, 164, 76, 217, 166,
// //     39, 198, 155, 45, 189, 161, 94, 215, 229, 128, 133, 66, 81, 25, 174, 3,
// //   ]),
// // };

//   // const faucetAccount = Kilt.generateKeypair({
//   //   type: "ed25519",
//   //   // seed: "0xe566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
//   //   seed: `0x${Buffer.from(slicedSeed).toString("hex")}`,
//   // });
//   // console.log("acc " + faucetAccount.publicKeyMultibase);

//   // Yeni bir Keyring örneği oluştur
//   const keyring = new Keyring({ type: "ed25519" });
//   const keyringPair = keyring.addFromSeed(slicedSeed);
//   console.log("Wallet Address:", keyringPair.address);

//   console.log("Keyring Address: step 2", keyringPair.address);

//   // Seed'den KeyringPair oluştur
//   // const keyringPair = keyring.addFromSeed(
//   //   Buffer.from(
//   //     "e566520fec3ca23d80dfe9e9529ada463b93fc33f17219c1089de906f7253f1c",
//   //     "hex"
//   //   )
//   // );
//   console.log("Keyring Address: step 2", keyringPair.address);

//   // let { issuerAccount, submitterAccount, holderAccount, verifierAccount } =
//     generateAccounts();
//   // console.log("Successfully transferred tokens");
//   // console.log("issuerAccount", issuerAccount);
//   // console.log("submitterAccount", submitterAccount);
//   // submitterAccount = faucetAccount;
//   // let issuerDid = await generateDid(faucetAccount, issuerAccount);
//   // let holderDid = await generateDid(faucetAccount, holderAccount);
//   // let verifierDid = await generateVerifierDid(faucetAccount, verifierAccount)
//   // console.log("issuerDid step 3", issuerDid);
//   // console.log("holderDid step 4", holderDid);
//   // issuerDid = await verifyDid(
//   //   submitterAccount,
//   //   issuerDid.didDocument,
//   //   issuerDid.signers
//   // );
//   // let w3name = await claimW3N(
//   //   "my-name.kilt",
//   //   holderDid.didDocument,
//   //   holderDid.signers,
//   //   submitterAccount
//   // );
//   // console.log("w3name", w3name);
//   // console.log("issuerDid step 5", issuerDid);
//   // const credential = await issueCredential(
//   //   issuerDid.didDocument,
//   //   holderDid.didDocument,
//   //   issuerDid.signers,
//   //   submitterAccount
//   // );
//   // console.log("Issued Credential:", credential);

//   await api.disconnect();
//   console.log("disconnected step ");
// }
// runAll();
