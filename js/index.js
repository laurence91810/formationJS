import { MessageBox, ConfirmBox } from "./composantsWeb/modal.js"
import {RouterDOM} from './coreLib/router.js'
import { listeImages, listeMemes } from "./coreLib/dataInstance.js"

//const msgBox= new MessageBox()
// const listeMemes= new Memes()
// const listeImages= new Images()

const router = new RouterDOM()

class MemesDOM{

    listeMemes= listeMemes
    listeImages= listeImages
    constructor(){

        document.addEventListener('DOMContentLoaded',()=>{
            this.initNavbarLinks()
            //synchronisation des chargements
            Promise.all([this.listeMemes.load(),this.listeImages.load()])
            .then(promisesValues=>{   
                router.manageRoute();
              //  router.refresh();
                return promisesValues
            })
         
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
