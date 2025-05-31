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
exports.generateDid = generateDid;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
function generateDid(
// submitter: SignerInterface<"Ed25519", KiltAddress>,
authenticationKeyPair) {
    return __awaiter(this, void 0, void 0, function* () {
        const submitterId = "4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire";
        const api = Kilt.ConfigService.get("api");
        const transactionHandler = Kilt.DidHelpers.createDid({
            api,
            signers: [authenticationKeyPair],
            submitter: submitterId,
            fromPublicKey: authenticationKeyPair.publicKeyMultibase,
        });
        // const didDocumentTransactionResult = await transactionHandler.submit();
        const didTrans = yield transactionHandler.getSubmittable({ signSubmittable: false });
        console.log("did result is ", didTrans);
        // console.log("did doc is ", didDocumentTransactionResult);
        // const lol = await transactionHandler.getSubmittable({signSubmittable: false});
        // console.log("after get submittable ", lol.txHex)
        // lol.checkResult()
        // console.log("submittable is ", lol)
        // const result = await Blockchain.signAndSubmitTx(
        //   api.tx(lol.txHex),
        //   submitter,
        // );
        // lol.checkResult()
        // api.getBlockRegistry()
        // console.log("axxxxxxxxx ", result)
        // console.log("result human ", result.toHuman(true))
        // console.log("result block ", result.isCompleted)
        // console.log("result block ", result.isCompleted)
        // @ts-ignore
        // console.log("result status ", result.status.asInBlock)
        // const xyz = result.status.finalized
        // @ts-ignore
        // console.log("xyz  ", result.status.toJSON());
        // console.log("status is ", result.isError)
        // console.log("lol ", result.internalError)
        // console.log("txHash", result.txHash.toJSON())
        // // @ts-ignore
        // const try89 = await lol.checkResult({txHash: result.txHash.toHex(), blockHash: result.status.toJSON()!.finalized})
        //   // const try89 = await lol.checkResult({txHash: lol.txHex, blockHash: result.status.toJSON()!.finalized})
        //   console.log("xx is ", try89);
        //   console.log()
        //   let { didDocument, signers } = try89.asConfirmed;
        //   console.log(`ISSUER_DID_URI=${didDocument.id}`);
        // `0x${result.status.toJSON()!.finalized}`
        // console.log("xxxyz , ", xx.asConfirmed)
        // console.log("xxxyz , ", xx.asFailed)
        // console.log("lol is ", lol );
        // console.log("lol is ", lol );
        // if (didDocumentTransactionResult.status !== "confirmed") {
        //   console.log(didDocumentTransactionResult.status);
        //   throw new Error("create DID failed");
        // }
        // let { didDocument, signers } = didDocumentTransactionResult.asConfirmed;
        // // console.log(`ISSUER_DID_URI=${didDocument.id}`);
        // return { didDocument, signers };
    });
}
