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
exports.issueCredential = issueCredential;
const Kilt = __importStar(require("@kiltprotocol/sdk-js"));
const credentials_1 = require("@kiltprotocol/credentials");
function issueCredential(issuerDid, holderDid, signers, submitterAccount) {
    return __awaiter(this, void 0, void 0, function* () {
        const passportCType = yield credentials_1.CType.fetchFromChain("kilt:ctype:0x05f099b888ddf3e8ef4fc690f12ca59d967bf934d58dda723921893cff0d8734");
        const passportCredential = yield Kilt.Issuer.createCredential({
            issuer: issuerDid.id,
            credentialSubject: {
                id: holderDid.id,
                Username: "Aybars",
            },
            cType: passportCType.cType,
        });
        const credential = yield Kilt.Issuer.issue({
            credential: passportCredential,
            issuer: {
                didDocument: issuerDid,
                signers: [...signers, submitterAccount],
                submitter: submitterAccount,
            },
        });
        console.log("credential issued");
        return credential;
    });
}
