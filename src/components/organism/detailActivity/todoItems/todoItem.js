import styles from './todoItem.module.css';
import { Pencil, TrashIcon } from '../../../icons';
import { deleteTodoActivity, editTodoActivity } from '../../../../action/todo';
import ModalDelete from '../../activity/modalDelete/modalDelete';
import { useState, useEffect } from 'react';
import ModalEditTodo from '../modalAddTodo/modalEditTodo';

export default function TodoItem({ getDetailActivity, activity, setActivity }){

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataToDelete, setDataToDelete] = useState({});
    const [dataToEdit, setDataToEdit] = useState({});

    const handleChangeTodoDone = async (todo) => {
        const findAndDoneTodo = activity.todo_items.filter(d => {
            if(d.id === todo.id){
                d.is_active = d.is_active > 0 ? 0 : 1;
            }
            return d;
        }) 
        setActivity({...activity, todo_items: findAndDoneTodo});
        await editTodoActivity({...todo, is_active: todo.is_active > 0 ? 1 : 0});
    }


    const handleDataToDelete = (data) => {
        setDataToDelete(data);
        setShowModal(true);
    }

    // parameter id dikirim melalui data yang mau di hapus pada delete modal
    // atau bisa juga diambil dari state => dataToDelete
    const handleDeleteTodoItem = async (id) => {
        await deleteTodoActivity(id);
        setShowModal(false);
        getDetailActivity();
    }

    const FindAndEditTodo = (todo) => {
        const findTodo = activity.todo_items.filter(data => data.id === Number(todo));
        setDataToEdit(findTodo[0]);
        setShowModalEdit(true);
    }
    return(
        <>
            {activity.todo_items.map(todo => (
                <div className={styles.todoItem} key={todo.id} data-cy="todo-item">
                    <input type="checkbox" data-cy="todo-item-checkbox" onChange={() => handleChangeTodoDone(todo)} checked={todo.is_active} />
                    <p className={todo.is_active > 0 ? styles.done : ''} data-cy="todo-item-title"><span className={["levelColor", todo.priority].join(' ')} />{todo.title}</p>
                    <Pencil data-cy="todo-item-edit-button" onClick={() => FindAndEditTodo(todo.id)}/>
                    <TrashIcon data-cy="todo-item-delete-button" className={styles.delete} onClick={() => handleDataToDelete({ title: todo.title, id: todo.id})} />
                </div>
            ))}
            <ModalEditTodo 
                todo={dataToEdit}
                getAllTodo={getDetailActivity} 
                showModal={showModalEdit} 
                setShowModal={setShowModalEdit} 
            />
            <ModalDelete
                showModal={showModal}
                setShowModal={setShowModal} 
                dataToDelete={dataToDelete} 
                heading="List Item"
                handleDelete={handleDeleteTodoItem} 
            />
        </>
        ) 
        
}