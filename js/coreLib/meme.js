import { REST_ADR } from "../config/config.js"


class Meme{
    
    static ressourceName = '/memes'
    titre = ""
    text = ""
    X = 0
    y = 20
    fontWeight = "500"
    fontSize = 20
    underline = false
    italic = false
    imageId = -1
    color = "#000000"
    frameSizeX = 0
    frameSizeY = 0

    get #fullRessourceName(){
        return `${undefined !== this.id ? Meme.ressourceName +'/'+ this.id :
        Meme.ressourceName}`
    }

    save=()=>{

        fetch(`${REST_ADR}${this.#fullRessourceName}`, {
            
                method:undefined !== this.id ? 'PUT' : 'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this)
            }
        ).then(retour=>retour.json())
        .then(transformedFormRest =>{
            this.id = transformedFormRest.id
        })

    }

    deserialize=(chaine)=>{}

}


export class Memes extends Array{

    static ressourceName='/memes'

    constructor(){
        super()
    }

    push=(values)=>{

        if(Array.isArray(values)){
            values.forEach(value => super.push(value));
        }
        else{
            super.push(values)
        }
    }

    load=()=>{
        return fetch(`${REST_ADR}${Memes.ressourceName}`)
            .then(flux=>flux.json())
            .then(arr=>{
                arr.forEach(unique=>{
                    const meme = new Meme()
                    Object.assign(meme,unique)
                    //console.log(meme)
                    this.push(Object.freeze(meme))
                })
                return arr
            })
    }
}

//const listeMemes= new Memes()
