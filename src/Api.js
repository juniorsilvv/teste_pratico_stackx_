// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://5bwxvz4hrh.execute-api.us-east-1.amazonaws.com';

export const getItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items", error);
        throw error;
    }
};

export const createItem = async (item) => {
    console.log(item)
    try {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json, */*';

        const response = await axios.post(`${API_BASE_URL}/items`, item).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        // return response.data;
    } catch (error) {
        // console.error("Error creating item", error);
        // throw error;
    }
};

export const updateItem = async (id, item) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json, */*';
    try {
        const response = await axios.put(`${API_BASE_URL}/items/${id}`, item);
        let data = {
            'title': response.data.title,
            'descricao': response.data.descricao,
            'id': id
        }
        return data;
    } catch (error) {
        console.error(`Error updating item with id ${id}`, error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
        console.log(response)
    } catch (error) {
        console.error(`Error deleting item with id ${id}`, error);
        throw error;
    }
};
