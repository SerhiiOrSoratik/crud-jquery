import './App.css';
import {Header} from "./Components/Header";
import {MainPage} from "./Components/MainPage";
import {useState} from "react";

function App() {

    const [filter, setFilter] = useState('');
    const [showForm, setShowForm] = useState(false);


    return (
        <>
            <Header
                setFilter={setFilter}
                setShowForm={setShowForm}/>
            <MainPage
                filter={filter}
                showForm={showForm}
                setShowForm={setShowForm}/>
            />
        </>
    );
}

export default App;
