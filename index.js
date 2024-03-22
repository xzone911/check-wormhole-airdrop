const {toLowerCase, toUpperCase} = require("str-hex-utils");
const keccak = require('keccak')
const axios=require('axios');
const wallet='0xab5801a7d398351b8be11c439e05c5b3259aec9b';
checkWormhole(wallet).then(console.log);

async function checkWormhole(address){
    try{
        let res=await axios.get(`https://prod-flat-files-min.wormhole.com/${toLowerAddress(address)}_2.json`);
        if(res.data){
            return true;
        }
    }catch (e) {
    }
    try{
        let res=await axios.get(`https://prod-flat-files-min.wormhole.com/${toUpperAddress(address)}_2.json`);
        if(res.data){
            return true;
        }
    }catch (e) {

    }
    try{
        let res=await axios.get(`https://prod-flat-files-min.wormhole.com/${toChecksumAddress(address)}_2.json`);
        if(res.data){
            return true;
        }
    }catch (e) {
    }
    return false;
}


function toLowerAddress(address){
return toLowerCase(address);
}
function toUpperAddress(address){
return toUpperCase(address);
}

function toChecksumAddress (address, chainId = null) {
    if (typeof address !== 'string') {
        return ''
    }

    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error(
            `Given address "${address}" is not a valid Ethereum address.`
        )
    }

    const stripAddress = stripHexPrefix(address).toLowerCase()
    const prefix = chainId != null ? chainId.toString() + '0x' : ''
    const keccakHash = keccak('keccak256')
        .update(prefix + stripAddress)
        .digest('hex')
    let checksumAddress = '0x'

    for (let i = 0; i < stripAddress.length; i++) {
        checksumAddress +=
            parseInt(keccakHash[i], 16) >= 8
                ? stripAddress[i].toUpperCase()
                : stripAddress[i]
    }

    return checksumAddress
}
