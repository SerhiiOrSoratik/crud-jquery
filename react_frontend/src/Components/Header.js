export const Header = (props) => {

    const search = () => {
        const searchValue = document.getElementById("search").value;
        props.setFilter(searchValue)
    }

    return (
        <div id="header">
            <h1>Book shop</h1>
            <div style={{width: '50%'}}>
                <input style={{width: '15%', height: '88%'}} id="search"/>
                <button className='form_button' style={{width: '15%'}} id="searchButton" onClick={() => search()}>
                    Search
                </button>
            </div>
            <button className='form_button' id="addBook" style={{width: '15%'}} onClick={() => {
                props.setShowForm(true)
            }}>Add book
            </button>
        </div>
    )
}
