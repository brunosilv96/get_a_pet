const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/getapet')
    console.log('Conexão com MONGODB realizada!')
}

main().catch((err) => console.log(err))

module.exports = mongoose