import Modal from "../../../elements/modal";
import styles from "./modalAddTodo.module.css";
import { useState } from 'react';
import { addTodoActivity } from "../../../../action/todo";
import DropdownTodo from "./dropdownTodo";
import ModalHeader from "./modalHeader";
import ModalFooter from "./modalFooter";


export default function ModalAddTodo({ id, getAllTodo, showModal, setShowModal}){
    const [modelTodo, setModelTodo] = useState({
        activity_group_id: id,
        title: '',
        is_active: false,
    })
    const [showDropdown, setShowDropdown] = useState(false);
    const [priority, setPriority] = useState(false);

    const handleStatePriority = (data) => {
        setPriority(data);
        setShowDropdown(false);
    }
    const handleChangeTitleTodo = (e) => {
        setModelTodo({...modelTodo, title : e.target.value})
    }
    const handleAddTodoActivity = async () => {
        if(modelTodo.title !== ''){
            const response = await addTodoActivity({...modelTodo, priority: priority ?  priority.level : 'very-high'});
            if(!response.error){
                getAllTodo();
                setShowModal(false);
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodoActivity();
    }
    return(
        <Modal classNameModal={styles.modal} showModal={showModal} setShowModal={setShowModal} datacy="modal-add">
            <ModalHeader setShowModal={setShowModal} />
            <section className={styles.modalBody}>
                <form onSubmit={handleSubmit}>
                    <label data-cy="modal-add-name-title">NAMA LIST ITEM</label>
                    <input 
                        onChange={handleChangeTitleTodo}
                        type="text" 
                        value={modelTodo.title}
                        placeholder="Tambahkan name list item" 
                        data-cy="modal-name-add-input" 
                        required
                    />
                    <label htmlFor="priority" data-cy="modal-add-priority-title">PRIORITY</label>
                    <DropdownTodo 
                        priority={priority} 
                        handleStatePriority={handleStatePriority} 
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                    />
                </form>
            </section>
            <ModalFooter handleFor={handleAddTodoActivity}/>
        </Modal>
    )
}