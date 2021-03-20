import { DOMAIN } from "../../constants"

export const getData = () => {
    return new Promise((resolve, reject) => {
        const url = DOMAIN+'todos';
        fetch(
            url,
            {
                method: 'GET'
            }
        )
        .then((res) => res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}
export const deleteTodo = (data) => {
    return new Promise((resolve, reject) => {
        const url = DOMAIN+'todos/'+data.id;
        fetch(
            url,
            {
                method: 'DELETE'
            }
        )
        .then((res) => res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}
export const addTodo = (data) => {
    return new Promise((resolve, reject) => {
        const url = DOMAIN+'todos/';
        fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then((res) => res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}
export const updateTodo = ({id, ...data}) => {
    return new Promise((resolve, reject) => {
        const url = DOMAIN+'todos/'+ id;
        fetch(
            url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then((res) => res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}