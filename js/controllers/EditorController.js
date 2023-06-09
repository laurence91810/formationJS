import { listeImages, listeMemes } from "../coreLib/dataInstance.js";
import { Meme } from "../coreLib/meme.js";
import router from "../coreLib/router.js";
let svgImageNode=undefined

export class EditorController{

    wrapper
    listeMemes
    listeImages
    #currentMeme
    #currentImage
    #params

    set params(parameters){

        if(undefined !== parameters.id){
            this.#currentMeme=this.listeMemes.find(meme=>{
                return meme.id===Number(parameters.id)
            })
            console.log(this.#currentMeme)
            if(undefined===this.#currentMeme){
                router.currentRoute='/404'
            }
            else{
                this.#currentImage=this.listeImages.find(image=>image.id===this.#currentMeme.imageId)
            }
        }
        else{
            this.#currentMeme=new Meme()
            this.#currentImage=undefined
        }
        

        this.#params = parameters
    }

    constructor(memes=listeMemes,images=listeImages){
        this.listeImages=images
        this.listeMemes=memes
    }

    initView(){
        const form = this.wrapper.querySelector('form')
        form['image'].addEventListener('change',(evt)=>{
            this.#currentMeme.imageId=Number(evt.target.value)
            this.#currentImage=this.listeImages.find(i=>i.id===this.#currentMeme.imageId)
            this.refreshSVG()
        })

        form['text'].addEventListener('input',(evt)=>{
            this.#currentMeme.text=evt.target.value
            this.refreshSVG()
        })


        form['x'].addEventListener('input',(evt)=>{
            this.#currentMeme.x=Number(evt.target.value)
            this.refreshSVG()
        })

        form['y'].addEventListener('input',(evt)=>{
             this.#currentMeme.y=Number(evt.target.value)
             this.refreshSVG()
        })
   

        // form['frameSizeX'].addEventListener('input',(evt)=>{
        //     this.#currentMeme.frameSizeX=Number(evt.target.value)
        //     this.refreshSVG()
        // })

        // form['frameSizeY'].addEventListener('input',(evt)=>{
        //      this.#currentMeme.frameSizeY=Number(evt.target.value)
        //      this.refreshSVG()
        // })

        form['color'].addEventListener('input',(evt)=>{
            this.#currentMeme.color=evt.target.value
            this.refreshSVG()
       })       

        form['fontWeight'].addEventListener('input',(evt)=>{
            this.#currentMeme.fontWeight=evt.target.value
            this.refreshSVG()
        })

        form['fontSize'].addEventListener('input',(evt)=>{
            this.#currentMeme.fontSize=Number(evt.target.value)
            this.refreshSVG()
        })

        form['underline'].addEventListener('change',(evt)=>{
            this.#currentMeme.underline=evt.target.checked
            this.refreshSVG()
        })

        form['italic'].addEventListener('change',(evt)=>{
            this.#currentMeme.italic=evt.target.checked
            this.refreshSVG()
        })

        this.refresh()
    }

    refresh(){
        if(undefined===this.wrapper){
            console.log('EditorController wrapper not set');
            return
        }
        const form=this.wrapper.querySelector('form')

        const imageSelect=form['image']   
        const nullOpt = imageSelect.querySelector('option[value="-1"]')
        imageSelect.innerHTML = ''
        imageSelect.appendChild(nullOpt)
        this.listeImages.map(i=>{
            const opt = document.createElement('option')
            opt.innerHTML= i.titre
            opt.value = i.id
            imageSelect.appendChild(opt)
        })

        imageSelect.value= this.#currentMeme.imageId

        form['titre'].value=this.#currentMeme.titre

        form['text'].value=this.#currentMeme.text

        form['x'].value=this.#currentMeme.x

        form['y'].value=this.#currentMeme.y

        form['color'].value=this.#currentMeme.color

        form['fontSize'].value=this.#currentMeme.fontSize

        form['fontWeight'].value=this.#currentMeme.fontWeight

        form['underline'].checked=this.#currentMeme.underline

        form['italic'].checked=this.#currentMeme.italic

        form['frameSizeX'].value=this.#currentMeme.frameSizeX

        form['frameSizeY'].value=this.#currentMeme.frameSizeY

        this.refreshSVG()

    }

    refreshSVG(){
        const svgNode = this.wrapper.querySelector('svg')
        const textNode=svgNode.querySelector('text')
        if(undefined===svgImageNode){
            svgImageNode = svgNode.querySelector('image')
        }
     
        svgImageNode.remove()

        if(undefined !== this.#currentImage){
            svgNode.setAttribute('viewBox',`0 0 ${this.#currentImage.w} ${this.#currentImage.h}`)
            svgImageNode.setAttribute('xlink:href', this.#currentImage.url)
            svgNode.insertBefore(svgImageNode,textNode)
        }
        else{
            svgNode.setAttribute('viewBox',`0 0 ${1000} ${1000}`)
            
        }
        textNode.innerHTML=this.#currentMeme.text
        textNode.setAttribute('x',this.#currentMeme.x)
        textNode.setAttribute('y',this.#currentMeme.y)
        textNode.style.fontSize=this.#currentMeme.fontSize
        textNode.style.fontWeight=this.#currentMeme.fontWeight
        textNode.style.fill=this.#currentMeme.color
        textNode.style.textDecoration=this.#currentMeme.underline?'underline':'none'
        textNode.style.fontStyle=this.#currentMeme.italic?'italic':'none'

    }
}