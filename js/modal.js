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
    <div id="modal">\
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
        

 }



const modal = new Modal('modal');
