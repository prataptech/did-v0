"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const generateAccount_js_1 = require("./generateAccount.js");
const generateDid_js_1 = require("./generateDid.js");
function runAll() {
    return __awaiter(this, void 0, void 0, function* () {
        let api = yield Kilt.connect("wss://peregrine.kilt.io/");
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
        let { holderAccount, issuerAccount } = (0, generateAccount_js_1.generateAccounts)();
        console.log("Successfully transferred tokens");
        let holderDid = yield (0, generateDid_js_1.generateDid)(holderAccount);
        console.log("holder did is ", holderAccount);
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
        yield api.disconnect();
        console.log("disconnected");
    });
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
