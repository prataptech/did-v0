// import * as Kilt from "@kiltprotocol/sdk-js";
// import type { MultibaseKeyPair } from "@kiltprotocol/types";

// interface GeneratedAccounts {
//   issuerAccount: MultibaseKeyPair;
//   submitterAccount: MultibaseKeyPair;
//   holderAccount: MultibaseKeyPair;
//   verifierAccount: MultibaseKeyPair;
// }

// export function generateAccounts(): GeneratedAccounts {
//   const issuerAccount = Kilt.generateKeypair({ type: "ed25519" });
//   const submitterAccount = Kilt.generateKeypair({ type: "ed25519" });
//   const holderAccount = Kilt.generateKeypair({ type: "ed25519" });
//   const verifierAccount = Kilt.generateKeypair({ type: "ed25519" });

//   console.log("keypair generation complete");
//   console.log(`ISSUER_ACCOUNT_ADDRESS=${issuerAccount.publicKeyMultibase}`);
//   console.log(
//     `SUBMITTER_ACCOUNT_ADDRESS=${submitterAccount.publicKeyMultibase}`
//   );
//   console.log(`HOLDER_ACCOUNT_ADDRESS=${holderAccount.publicKeyMultibase}`);

//   return { issuerAccount, submitterAccount, holderAccount, verifierAccount };
// }


import { multibaseKeyToDidKey } from '@kiltprotocol/did';
import * as Kilt from "@kiltprotocol/sdk-js";
import type { MultibaseKeyPair } from "@kiltprotocol/types";
import { Crypto } from "@kiltprotocol/utils";
import { Keyring } from "@polkadot/keyring/cjs/keyring";
import type { KeyringPair } from "@polkadot/keyring/types";
import { u8aToHex } from "@polkadot/util";
import { encodeAddress, mnemonicGenerate, mnemonicToMiniSecret } from "@polkadot/util-crypto";

interface GeneratedAccounts {
  issuerAccount: MultibaseKeyPair;
  holderAccount: MultibaseKeyPair;
  issuerMnemonic: string;
  holderMnemonic: string;
  issuerWallet: KeyringPair;
  holderWallet: KeyringPair;
}

export function deriveAuthenticationKey(seed: Uint8Array) {
    const baseKey = Crypto.makeKeypairFromSeed(seed, 'sr25519');
    return baseKey.derive('//did//0') as typeof baseKey;
  }

export function generateAccounts(holdMnemonic?: string): GeneratedAccounts {
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 38 }); // KILT chain

  const issuerMnemonic = mnemonicGenerate();
  const holderMnemonic = holdMnemonic ?? mnemonicGenerate();
  
  const issuerSeed = u8aToHex(mnemonicToMiniSecret(issuerMnemonic));
  const holderSeed = u8aToHex(mnemonicToMiniSecret(holderMnemonic));

  // const issuerSeed = mnemonicToMiniSecret(issuerMnemonic);
  // const holderSeed = mnemonicToMiniSecret(holderMnemonic);

  // const holderAccount = Crypto.makeKeypairFromSeed(
  //   holderSeed,
  //   'ed25519'
  // )
  
  // const issuerAccount = Crypto.makeKeypairFromSeed(
  //   issuerSeed,
  //   'ed25519'
  // )
  
  
  //new 
  // const createHolderDidMnemonic = holderMnemonic + '//did//1'
  // console.log("new holder mnemonic",createHolderDidMnemonic);



  const issuerAccount = Kilt.generateKeypair({ 
    type: "ed25519", 
    seed: issuerSeed, 
  });
  const holderAccount = Kilt.generateKeypair({ 
    seed: holderSeed, 
    type: "ed25519", 
    
  });

  const issuerWallet = keyring.addFromMnemonic(issuerMnemonic);
  const holderWallet = keyring.addFromMnemonic(holderMnemonic);


  console.log("=== ISSUER ===");
  console.log("Mnemonic:", issuerMnemonic);
  console.log("DID publicKey:", issuerAccount.publicKeyMultibase);
  console.log("Wallet Address:", issuerWallet.address);

  console.log("=== HOLDER ===");
  console.log("Mnemonic:", holderMnemonic);
  console.log("DID publicKey:", holderAccount.publicKeyMultibase);
  console.log("Wallet Address:", holderWallet.address);


  console.log("Issuer:-")
  console.log("Public Key: "+issuerAccount.publicKeyMultibase);
  console.log("Secret Key: "+issuerAccount.secretKeyMultibase);
  
  const issuerMultibaseKeyToDidKey = multibaseKeyToDidKey(
    issuerAccount.publicKeyMultibase,
  );
  console.log('issuer publicKey:', issuerMultibaseKeyToDidKey.publicKey);
  console.log('issuer publicKey type:', issuerMultibaseKeyToDidKey.keyType);

  const hexIssuer = u8aToHex(issuerMultibaseKeyToDidKey.publicKey);
  console.log('issuer publicKey hex:', hexIssuer);
  const issuerEncodedAddhress = encodeAddress(hexIssuer, 38);
  console.log('issuer publicKey address:', issuerEncodedAddhress);

  return { 
    holderAccount,
    issuerAccount,
    holderMnemonic,
    issuerMnemonic,
    holderWallet,
    issuerWallet,
  };
}