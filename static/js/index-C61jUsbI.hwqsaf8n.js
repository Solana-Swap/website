import{cO as m,cP as B,a4 as b,o as l,a7 as k,c9 as I,ca as $,cb as w,t as o,cQ as f,p as c,l as h,cR as S,cg as _,a0 as x,cd as E,j as T,bN as p,cS as U,bT as C,cT as F}from"./Bridge.kcbhiddz.js";import{A as O}from"./aptos-BIjJ-z5H.i0e8jd2w.js";import"./index.gj1dsgp4.js";import"./vue.ij1rt9yd.js";import"./lodash-es.bp0zmem9.js";import"./axios.i01mok01.js";import"./dayjs.pb8a0t5b.js";import"./swiper.jxnsts7f.js";import"./vuex.i01hmc51.js";import"./vue-router.ii2ni9cp.js";import"./svg-icons.nc57d0by.js";var R=Object.defineProperty,W=(i,e,t)=>e in i?R(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,a=(i,e,t)=>W(i,typeof e!="symbol"?e+"":e,t);class N{constructor(e,t,s,r,n=!1){a(this,"transaction"),a(this,"network"),a(this,"chain"),a(this,"description"),a(this,"parallelizable"),this.transaction=e,this.network=t,this.chain=s,this.description=r,this.parallelizable=n}}const P=[{name:"tokenBridgeAddress",...m},{name:"chain",...B()},{name:"domainSeparator",binary:"bytes",custom:b.encode(l),omit:!0},{name:"tokenId",...m},{name:"domainSeparator",binary:"bytes",custom:new Uint8Array([255]),omit:!0}],Q=i=>F(P,i);class d{constructor(e,t,s,r){a(this,"network"),a(this,"chain"),a(this,"connection"),a(this,"contracts"),a(this,"chainId"),a(this,"tokenBridgeAddress"),this.network=e,this.chain=t,this.connection=s,this.contracts=r,this.chainId=k(t);const n=r.tokenBridge;if(!n)throw new Error(`TokenBridge contract Address for chain ${t} not found`);this.tokenBridgeAddress=n}static async fromRpc(e,t){const[s,r]=await O.chainFromRpc(e),n=t[r];if(n.network!==s)throw new Error("Network mismatch "+n.network+" !== "+s);return new d(s,r,e,n.contracts)}async isWrappedAsset(e){try{return await this.getOriginalAsset(e),!0}catch{return!1}}async getOriginalAsset(e){const t=e.toString().split(l);let s;if(s=(await this.connection.getAccountResource(t[0],`${this.tokenBridgeAddress}::state::OriginInfo`)).data,!s)throw I;const r=$(parseInt(s.token_chain.number)),n=new w(s.token_address.external_address);return{chain:r,address:n}}async getTokenUniversalAddress(e){return new w(o.encode(f(e.toString()),!0))}async getTokenNativeAddress(e,t){const s=e===this.chain?await this.getTypeFromExternalAddress(t.toString()):await this.getAssetFullyQualifiedType({chain:e,address:t});if(!s)throw new Error("Invalid asset address.");return new c(s)}async hasWrappedAsset(e){try{return await this.getWrappedAsset(e),!0}catch{}return!1}async getWrappedAsset(e){if(h(e.address))throw new Error("native asset cannot be a wrapped asset");const t=await this.getAssetFullyQualifiedType(e);if(!t)throw new Error("Invalid asset address.");return await this.connection.getAccountResource(S(t),`${this.tokenBridgeAddress}::state::OriginInfo`),_(this.chain,t)}async isTransferCompleted(e){const t=(await this.connection.getAccountResource(this.tokenBridgeAddress,`${this.tokenBridgeAddress}::state::State`)).data.consumed_vaas.elems.handle;try{return await this.connection.getTableItem(t,{key_type:"vector<u8>",value_type:"u8",key:`0x${x.Buffer.from(E(e.hash)).toString("hex")}`}),!0}catch{return!1}}async getWrappedNative(){return _(this.chain,T)}async*createAttestation(e,t){const s={chain:this.chain,address:new c(e)},r=await this.getAssetFullyQualifiedType(s);if(!r)throw new Error("Invalid asset address.");yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::attest_token::attest_token_entry`,type_arguments:[r],arguments:[]},"Aptos.AttestToken")}async*submitAttestation(e,t){yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::wrapped::create_wrapped_coin_type`,type_arguments:[],arguments:[p(e)]},"Aptos.CreateWrappedCoinType");const s=await this.getAssetFullyQualifiedType(e.payload.token);if(!s)throw new Error("Invalid asset address.");yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::wrapped::create_wrapped_coin`,type_arguments:[s],arguments:[p(e)]},"Aptos.CreateWrappedCoin")}async*transfer(e,t,s,r,n){const v=0n,g=0n,u=h(s)?T:s.toString(),y=t.address.toUniversalAddress().toUint8Array(),A=k(t.chain);n?yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::transfer_tokens::transfer_tokens_with_payload_entry`,type_arguments:[u],arguments:[r,A,y,g,n]},"Aptos.TransferTokensWithPayload"):yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::transfer_tokens::transfer_tokens_entry`,type_arguments:[u],arguments:[r,A,y,v,g]},"Aptos.TransferTokens")}async*redeem(e,t,s=!0){const r=t.payload.token.chain===this.chain?await this.getTypeFromExternalAddress(t.payload.token.address.toString()):await this.getAssetFullyQualifiedType(t.payload.token);if(!r)throw new Error("Invalid asset address.");yield this.createUnsignedTx({function:`${this.tokenBridgeAddress}::complete_transfer::submit_vaa_and_register_entry`,type_arguments:[r],arguments:[p(t)]},"Aptos.CompleteTransfer")}async getAssetFullyQualifiedType(e){return e.chain===this.chain?U(e.address.toString())?e.address.toString():null:`${d.getForeignAssetAddress(this.chain,this.tokenBridgeAddress,e)}::coin::T`}async getTypeFromExternalAddress(e){try{const t=(await this.connection.getAccountResource(this.tokenBridgeAddress,`${this.tokenBridgeAddress}::state::State`)).data,{handle:s}=t.native_infos,r=await this.connection.getTableItem(s,{key_type:`${this.tokenBridgeAddress}::token_hash::TokenHash`,value_type:"0x1::type_info::TypeInfo",key:{hash:e}});return r?[r.account_address,String.fromCharCode(...o.decode(r.module_name)),String.fromCharCode(...o.decode(r.struct_name))].join(l):null}catch{return null}}static getForeignAssetAddress(e,t,s){if(h(s.address))throw new Error("Invalid token address");const r=Q({chain:s.chain,tokenBridgeAddress:new c(t).toUniversalAddress(),tokenId:s.address.toUniversalAddress()});return o.encode(f(r),!0)}createUnsignedTx(e,t,s=!1){return new N(e,this.network,this.chain,t,s)}}C("Aptos","TokenBridge",d);export{d as AptosTokenBridge};