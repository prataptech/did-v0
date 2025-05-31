import * as Kilt from "@kiltprotocol/sdk-js";
import type {
  SignerInterface,
  DidDocument,
  MultibaseKeyPair,
  KiltAddress,
} from "@kiltprotocol/types";
import { Blockchain } from "@kiltprotocol/chain-helpers";

export async function VerifyDid(
  submitter: SignerInterface<"Ed25519", KiltAddress>,
  authenticationKeyPair: MultibaseKeyPair
) {
  const api = Kilt.ConfigService.get("api");
  const transactionHandler = Kilt.DidHelpers.createDid({
    api,
    signers: [authenticationKeyPair],
    submitter: submitter,
    fromPublicKey: authenticationKeyPair.publicKeyMultibase,
  });

  // const didDocumentTransactionResult = await transactionHandler.submit();
  // const lol = await transactionHandler.getSubmittable({signSubmittable: false});

  // console.log("after get submittable ")
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


// // // @ts-ignore
//   const try89 = await lol.checkResult({txHash: result.txHash.toHex(), blockHash: result.status.toJSON()!.finalized})
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
  // console.log(`ISSUER_DID_URI=${didDocument.id}`);
  // return { didDocument, signers };
}
