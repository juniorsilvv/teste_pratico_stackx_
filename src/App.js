// src/components/ItemList.js
import React, { useEffect, useState, useRef } from 'react';
import { getItems, deleteItem, createItem, updateItem } from './Api';
import './Bootstrap.css';
import Modal from 'react-bootstrap/Modal';




const ItemList = () => {
  const [items, setItems] = useState([]);
  const [showAddAndEdit, setShowAddAndEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [descricao, setDescricao] = useState('');
  const [id, setId] = useState('');
  const inputTitle = useRef(null)


  useEffect(() => {
    fetchItems();
  }, []);

  /** Ativa a modal */
  const handleOpenModal = () => {
    setTitle('')
    setDescricao('')
    setId('')
    setShowAddAndEdit(true);
  };

  /** Esconde a modal */
  const handleCloseModal = () => {
    setShowAddAndEdit(false);
  };

  /** Pega a o submit do formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { title, descricao };

    if (id == '') {
      try {
        await createItem(newItem);
        handleCloseModal()
        fetchItems();
        setTitle('');
        setDescricao('');
        setId('')
      } catch (error) {
        console.error('Error creating item', error);
      }
    }
    else {

      if(title == '')
        return alert('Título é obrigatório')
      try {
        await updateItem(id, newItem);
        handleCloseModal()
        fetchItems();
      } catch (error) {
        console.error('Error creating item', error);
      }
    }

  };

  /** Busca itens */
  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  /** Apaga itens */
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error(`Error deleting item with id ${id}`, error);
    }
  };

  /** Abre a modal para editar itens */
  const handleEdit = async (title, descricao, id) => {
    handleOpenModal(true)
    setTitle(title)
    setDescricao(descricao)
    setId(id)
  }

  return (
    <div class="container">
      <div class="row mt-5">
        <div class="d-flex justify-content-between">
          <h1 class="text-bold">Item List</h1>
          <button class="btn btn-sm btn-primary" onClick={handleOpenModal}>Adicionar</button>
        </div>
        <div class="table-responsive table-card">
          <table class="table table-nowrap table-striped-columns mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
                <th scope="col">Editar</th>
                <th scope="col">Apagar</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.descricao}</td>
                  <td>
                    <button class="btn btn-sm btn-primary" onClick={() => handleEdit(item.title, item.descricao, item.id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)} >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal size="lg" show={showAddAndEdit} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar/Editar Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div class="row">
              <div class="col-lg-12">
                <div class="mb-3">
                  <label for="title" class="form-label">Título</label>
                  <input type="text" class="form-control border" id="title" placeholder="Digite seu título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="mb-3 pb-2">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control border" id="description" placeholder="Digite sua descrição" rows="3"
                    value={descricao}
                    ref={inputTitle}
                    onChange={(e) => setDescricao(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="hstack gap-2 justify-content-end">
                  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Salvar</button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ItemList;
