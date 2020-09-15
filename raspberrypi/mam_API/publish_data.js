const { asciiToTrytes } = require('@iota/converter')
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const Mam = require('@iota/mam')
let mamState = Mam.init(provider)
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Published', packet, '\n');
    return message.root
}
module.exports =publish;
