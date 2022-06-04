import {NewOrUpdatedEntity} from "../Types";

export const loadData = async (searchValue : string) => {
    if (searchValue) {
        return await fetch('http://localhost:3001/product/search/' + searchValue,
            {
                method: 'GET',
                headers: {'Accept': 'application/json'}
            }).then(data => data.json())
            .then(result => result)
            .catch(error => console.log(error))
    } else {
        return await fetch('http://localhost:3001/product',
            {
                method: 'GET',
                headers: {'Accept': 'application/json'}
            }).then(data => data.json())
            .then(result => result)
            .catch(error => console.log(error))
    }
}

export const removeEntityById = async (id : string) => {
    return await fetch('http://localhost:3001/product/' + id,
        {
            method: 'DELETE',
            headers: {'Accept': 'application/json'}
        }).then(data => data)
        .catch(error => console.log(error))
}

export const getEntityById = async (id : string) => {
    return await fetch('http://localhost:3001/product/' + id,
        {
            method: 'GET',
            headers: {'Accept': 'application/json'}
        }).then(data => data.json())
        .then(result => result)
        .catch(error => console.log(error))
}

export const createEntity = async (entity : NewOrUpdatedEntity) => {
    return await fetch('http://localhost:3001/product',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        }).then(data => data.json())
        .then(result => result)
        .catch(error => console.log(error))
}

export const editEntityById = async (entity : NewOrUpdatedEntity, id : string) => {
    return await fetch('http://localhost:3001/product/' + id,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity)
        }).then(data => data.json())
        .then(result => result)
        .catch(error => console.log(error))
}
