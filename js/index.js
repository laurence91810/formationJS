import { MessageBox, ConfirmBox } from "./composantsWeb/modal.js"
import {Memes} from './coreLib/meme.js'
import {Images} from './coreLib/image.js'
import {RouterDOM} from './router.js'

//const msgBox= new MessageBox()
// const listeMemes= new Memes()
// const listeImages= new Images()

const router = new RouterDOM()

class MemesDOM{

    listeMemes= new Memes()
    listeImages= new Images()
    constructor(){

        document.addEventListener('DOMContentLoaded',()=>{
            this.initNavbarLinks()
            //synchronisation des chargements
            Promise.all([this.listeMemes.load(),this.listeImages.load()])
            .then(promisesValues=>{
                return promisesValues
            })
            router.manageRoute();
        })
    }
    initNavbarLinks=()=>{
        document.querySelectorAll('.navbar-home').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/'
            })
        })
        document.querySelectorAll('.navbar-thumbnail').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/thumbnail'
            })
        })
        document.querySelectorAll('.navbar-meme').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/meme'
            })
        })

    }
}


const memeDOM = new MemesDOM()

// document.addEventListener('DOMContentLoaded',()=>{
//     listeMemes.load()
//     listeImages.load()

// })
