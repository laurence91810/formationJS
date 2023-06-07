//let modalNode = undefined;

// document.addEventListener('DOMContentLoaded',(evt)=>{
//     console.log(evt);
//     modalNode=document.querySelector('#modal');
//     console.log(modalNode);
//     removeModal();
// });


/**
 * fermeture du modal
 */
// const removeModal=()=>{
//     if(undefined!==modalNode){
//         modalNode.remove();
//     }
// }

// function removeModale(){
//     if(undefined!==modalNode){
//         modalNode.remove();
//     }

// }

/**
 * fonction pour afficher un modal
 * @param {string} titre titre du message
 * @param {HTMLElement|string} content contenu du message
 */
//  const showModal=(titre,content)=>{
//     //const title = document.querySelector('#modal-title');
//     //title.innerHTML="Mon <u>nouveau</u> titre";
//     if(undefined!==document.querySelector('#modal-title')){
//         removeModal();
//     }
    
//     modalNode.querySelector('#modal-title').innerHTML=titre;
//     modalNode.querySelector('#modal-content').innerHTML=content;

//     document.body.appendChild(modalNode);

//  }

 class Modal{

    #modalTemplateString='\
    <div>\
        <h3 id="modal-title">titre</h3>\
        <div id="modal-content">content</div>\
        <div id="modal-button"></div>\
    </div>'
    #refId
    #modalNode
    constructor(idModal="modal"){
        this.#refId=idModal
        this.#modalNode=document.createElement('div')
        this.#modalNode.id = this.#refId
        this.#modalNode.innerHTML = this.#modalTemplateString
    //     document.addEventListener('DOMContentLoaded',(evt)=>{
    //         this.#modalNode=document.querySelector(`#${this.#refId}`)
    //         this.removeModal()
    //     })
    }

    /**
     * exemple de getter et setter
     */

    get modalId(){
        return this.#refId
    }

    set modalId(value){
        if(value.length>0){
            this.#refId = value
        }
    }
   
    /**
     * fermeture du modal
     */
    removeModal=()=>{
        if(undefined!==this.#modalNode){
            this.#modalNode.remove()
        }
    }


    showModal=(titre,content)=>{
        if(null!==this.#modalNode){
            this.removeModal()
        }
        
        this.#modalNode.querySelector('#modal-title').innerHTML=titre
        this.#modalNode.querySelector('#modal-content').innerHTML=content
    
        document.body.appendChild(this.#modalNode)
    }
    /**
     * set buttons content
     * @param {Array(HTMLElement)} btnArray 
     */
     
    setButtons=(btnArray)=>{
        this.#modalNode.querySelector('#modal-button').innerHTML=''
        btnArray.forEach((iterr,i,liste)=>{
            this.#modalNode.querySelector('#modal-button').appendChild(iterr)
            iterr.addEventListener('click',this.removeModal)
        })

    }

 }



//const modal = new Modal('modal');

export class MessageBox extends Modal{
    #okCallBack
    #okButton
    set okCallBack(fn){
        if(typeof fn === 'function'){
            this.#okCallBack=fn
        }
    }

    constructor(okfn){
        super()
        this.okCallBack=okfn
        //creation du bouton
        this.#okButton=document.createElement('button')
        this.#okButton.className="btn btn-primary"
        this.#okButton.type='button'
        this.#okButton.innerHTML='OK'
        //ajout de l'event sur le bouton
        this.#okButton.addEventListener('click', ()=>{
          if(typeof this.#okCallBack === 'function'){  this.#okCallBack()}
        })
        // appel d'une fonction publique du parent lié à notre instance étendue
        this.setButtons([this.#okButton])

    }

    showMessage=(titre,content,okfn)=>{
        this.okCallBack=okfn
        this.showModal(titre,content)
    }
}


const msgBox= new MessageBox();


export class ConfirmBox extends Modal{
    #okCallBack
    #okButton
    set okCallBack(fn){
        if(typeof fn === 'function'){
            this.#okCallBack=fn
        }
    }

    #cancelCallBack
    #cancelButton
    set cancelCallBack(cancelfn){
        if(typeof cancelfn === 'function'){
            this.#cancelCallBack=cancelfn        }
    }


    constructor(okfn,cancelfn){
        super()
        this.okCallBack=okfn
        //creation du bouton
        this.#okButton=document.createElement('button')
        this.#okButton.className="btn btn-primary"
        this.#okButton.id='idOK'
        this.#okButton.type='button'
        this.#okButton.innerHTML='OK'
        this.#okButton.addEventListener('click', ()=>{
            if(typeof this.#okCallBack === 'function'){  this.#okCallBack()}
          })
        //   this.setButtons([this.#okButton])
          //ajout de l'event sur le bouton
        this.cancelCallBack=cancelfn
        //creation du bouton cancel
        this.#cancelButton=document.createElement('button')
        this.#cancelButton.className="btn btn-default"
        this.#cancelButton.id='idCancel'
        this.#cancelButton.type='button'
        this.#cancelButton.innerHTML='Cancel'
        this.#cancelButton.addEventListener('click', ()=>{
            if(typeof this.#cancelCallBack === 'function'){  this.#cancelCallBack()}
          })
          // appel d'une fonction publique du parent lié à notre instance étendue
          this.setButtons([this.#cancelButton,this.#okButton])
  

    }

    showMessageConfirm=(titre,content,okfn,cancelfn)=>{
        this.okCallBack=okfn
        this.cancelCallBack=cancelfn
        this.showModal(titre,content)
    }
}


//const confirmgBox= new MessageBox();
