import { MessageBox, ConfirmBox } from "./composantsWeb/modal.js"
import {Memes} from './coreLib/meme.js'
import {Images} from './coreLib/image.js'
import './router.js'

//const msgBox= new MessageBox()
// const listeMemes= new Memes()
// const listeImages= new Images()


class MemesDOM{

    listeMemes= new Memes()
    listeImages= new Images()
    constructor(){

        document.addEventListener('DOMContentLoaded',()=>{
            //synchronisation des chargements
            Promise.all(this.listeMemes.load(),this.listeImages.load())
            .then(promisesValues=>{
                return promisesValues
            })
        
        })
    }
}


const memeDOM = new MemesDOM()

// document.addEventListener('DOMContentLoaded',()=>{
//     listeMemes.load()
//     listeImages.load()

// })
