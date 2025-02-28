function ModalWithForm() {
return ( <div className="modal"> 

<form className="modal__form">
<h2 className="modal__title">New Garment</h2>
<button type="button" className="modal__close">CLOSE</button>
<label htmlFor="name" className="modal__label">
    Name {""} 
    <input type="text" 
    className="modal__input" 
    id="name" 
    placeholder="Name" />
</label>
<label htmlFor="imageUrl" className="modal__label">
    Image {""}
     <input type="url" 
     className="modal__input" 
     id="imageUrl" 
     placeholder="Image URL" />
</label>
<fieldset className="modal__radio-buttons">
    
</fieldset>
</form>
</div>
    );
}

export default ModalWithForm;