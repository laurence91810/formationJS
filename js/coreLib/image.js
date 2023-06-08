import { REST_ADR } from "../config/config.js"

class image{

    static ressourceName = '/images'
    titre = ""
    url = ""
    w = 0
    h = 0

}


export class Images extends Array{

    static ressourceName='/images'
/**
 * fonction de chargement asychrone promise des images
 * @returns  {Promise} promise d'appel du fetch
 */
    load=()=>{
        return fetch(`${REST_ADR}${Images.ressourceName}`)
            .then(flux=>flux.json())
            .then(arr=>{
                arr.map(element=>{
                    console.log(element)
                    this.push(element)
                })
                return arr
            })
    }

}
