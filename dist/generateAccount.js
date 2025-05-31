"use strict";
// import * as Kilt from "@kiltprotocol/sdk-js";
// import type { MultibaseKeyPair } from "@kiltprotocol/types";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveAuthenticationKey = deriveAuthenticationKey;
exports.generateAccounts = generateAccounts;
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
const did_1 = require("@kiltprotocol/did");
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const utils_1 = require("@kiltprotocol/utils");
const keyring_1 = require("@polkadot/keyring/cjs/keyring");
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
function deriveAuthenticationKey(seed) {
    const baseKey = utils_1.Crypto.makeKeypairFromSeed(seed, 'sr25519');
    return baseKey.derive('//did//0');
}
function generateAccounts(holdMnemonic) {
    const keyring = new keyring_1.Keyring({ type: 'sr25519', ss58Format: 38 }); // KILT chain
    const issuerMnemonic = (0, util_crypto_1.mnemonicGenerate)();
    const holderMnemonic = holdMnemonic !== null && holdMnemonic !== void 0 ? holdMnemonic : (0, util_crypto_1.mnemonicGenerate)();
    const issuerSeed = (0, util_1.u8aToHex)((0, util_crypto_1.mnemonicToMiniSecret)(issuerMnemonic));
    const holderSeed = (0, util_1.u8aToHex)((0, util_crypto_1.mnemonicToMiniSecret)(holderMnemonic));
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
    console.log("Issuer:-");
    console.log("Public Key: " + issuerAccount.publicKeyMultibase);
    console.log("Secret Key: " + issuerAccount.secretKeyMultibase);
    const issuerMultibaseKeyToDidKey = (0, did_1.multibaseKeyToDidKey)(issuerAccount.publicKeyMultibase);
    console.log('issuer publicKey:', issuerMultibaseKeyToDidKey.publicKey);
    console.log('issuer publicKey type:', issuerMultibaseKeyToDidKey.keyType);
    const hexIssuer = (0, util_1.u8aToHex)(issuerMultibaseKeyToDidKey.publicKey);
    console.log('issuer publicKey hex:', hexIssuer);
    const issuerEncodedAddhress = (0, util_crypto_1.encodeAddress)(hexIssuer, 38);
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
