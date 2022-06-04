import {useState} from "react";
import {createEntity, editEntityById} from "../Api/Api";

export const Form = (props) => {

    const [caption, setCaption] = useState(props?.editingEntity?.caption ? props.editingEntity.caption : '')
    const [price, setPrice] = useState(props?.editingEntity?.price ? props.editingEntity.price : 0)
    const [description, setDescription] = useState(props?.editingEntity?.description ? props.editingEntity.description : '')


    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.editingEntity?.id) {
            editEntityById({caption, price, description}, props.editingEntity.id).then(() => props.updateData())
        } else {
            createEntity({caption, price, description}).then(() => props.updateData())
        }
        clear();
    }

    const clear = () => {
        props.setShowForm(false)
        setDescription('')
        setPrice('')
        setCaption('')
        props.setEditingEntity({})
    }

    return (
        <form id="crForm" encType="application/json" className="form-container" onSubmit={handleSubmit}>
            <h3>{props.editingEntity?.id ? 'Edit book' : 'Add book'}</h3>
            <div className="form-group">
                <label htmlFor="cr_caption">Caption</label>
                <input id="cr_caption" name="caption" placeholder="Enter caption" value={caption}
                       onChange={(e) => setCaption(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="cr_price">Price</label>
                <input id="cr_price" type={"number"} name="price" placeholder="Enter price" value={price}
                       onChange={(e) => setPrice(+e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="cr_description">Description</label>
                <input id="cr_description" name="description" placeholder="Enter description" value={description}
                       onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className="form_button" value="Cancel" onClick={() => {
                    clear()
                }}>Cancel
                </button>
                <button className="form_button" type="submit">Ok</button>

            </div>
        </form>
    )
}
