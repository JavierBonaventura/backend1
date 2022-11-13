import dotenv  from "dotenv"

const result= await dotenv.config({ path: './src/.env' })
if (result.error) {
    throw result.error
}
console.log(result.parsed)

export default {
    env: result.parsed,
    fileSystem: {
        pathImg: './public/images/',
        pathviews: './src/views/'
    },   
    mongodb:{
        cnxStr: 'mongodb+srv://admin:admin@cluster0.imxi6sx.mongodb.net/?retryWrites=true&w=majority',
    
    }
}


