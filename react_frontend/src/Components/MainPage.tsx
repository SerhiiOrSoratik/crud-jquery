import {useMemo, useState} from "react";
import {getEntityById, loadData, removeEntityById} from "../Api/Api";
import {Form} from "./Form";
import {Entity} from "../Types";

type Props = {
    filter: string,
    showForm: boolean,
    setShowForm: any
}

export const MainPage = (props : Props) => {

    const [allEntities, setEntities] = useState([]);
    const [editingEntity, setEditingEntity] = useState({id: '', caption: '', price: 0, description: '', availability: false});

    useMemo(() => {
        loadData(props.filter).then(result => setEntities(result));
    }, [props.filter])

    const updateData = () => {
        loadData(props.filter).then(result => setEntities(result));
    }

    const removeById = (id : string) => {
        removeEntityById(id).then(() => loadData('').then(result => setEntities(result)));
    }

    const editById = (entity : Entity) => {
        setEditingEntity(entity)
        props.setShowForm(true)
    }

    const downloadJsonFile = async (id: string) => {
        const data = await getEntityById(id);
        const json = JSON.stringify(data);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
        element.setAttribute('download', `${data.caption}.json`);
        element.click();
    }

    const downloadScvFile = async (id: string) => {
        const data = await getEntityById(id);
        const csv = convertToCSV(data);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', `${data.caption}.csv`);
        element.click();
    }

    const convertToCSV = (data : Entity) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        let result = keys.join(',');
        result += '\n';
        result += values.join(',')
        return result;
    }

    return (
        <>
            <div id='container'>
                {props.showForm ? <Form setShowForm={props.setShowForm} setEditingEntity={setEditingEntity}
                                        editingEntity={editingEntity} updateData={updateData}/> : null}
                <div id='catalog'>
                    {
                        allEntities ? allEntities.map((entity : Entity) =>
                            <div style={{
                                border: '1px solid black',
                                width: '20%',
                                minWidth: '300px',
                                height: 'auto',
                                marginBottom: ' 25px'
                            }}
                                 key={entity.id}>
                                <button onClick={() => removeById(entity.id)}
                                        style={{
                                            transform: ' translate(145px, 5px)',
                                            position: 'absolute',
                                            height: '25px',
                                            width: '25px'
                                        }}>x
                                </button>
                                <button onClick={() => editById(entity)}
                                        style={{
                                            transform: 'translate(115px, 5px)',
                                            position: 'absolute',
                                            height: 25,
                                            width: 25
                                        }}>✎
                                </button>
                                <button onClick={() => downloadJsonFile(entity.id)}
                                        style={{
                                            transform: 'translate(70px, 5px)',
                                            position: 'absolute',
                                            height: 25,
                                            width: 40
                                        }}
                                >json
                                </button>
                                <button onClick={() => downloadScvFile(entity.id)}
                                        style={{
                                            transform: 'translate(25px, 5px)',
                                            position: 'absolute',
                                            height: 25,
                                            width: 40
                                        }}
                                >csv
                                </button>
                                <p style={{
                                    color: 'gray',
                                    fontSize: 12,
                                    paddingTop: 10
                                }}>{entity.availability ? ' ' : 'Немає в наявності'}</p>
                                <p>{entity.caption}</p>
                                <p>{entity.price} грн</p>
                                <p style={{wordWrap: 'break-word', color: 'gray'}}>{entity.description}</p>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </>
    )
}
