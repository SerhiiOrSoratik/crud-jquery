$(document).ready(() => {

    $("#createForm").on('submit', e => {
        e.preventDefault();
        const addBookPromise = new Promise(resolve => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                },
                url: "http://localhost:3001/product",
                dataType: 'json',
                type: "POST",
                data: $('#crForm').serialize(),
                success: () => {
                    resolve();
                },
            });
        })
        addBookPromise.then(() => {
            location.reload();
        })
    })

    $("#updateForm").on('submit', e => {
        e.preventDefault();
        const updateBookPromise = new Promise(resolve => {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                },
                url: "http://localhost:3001/product/" + $('#upd_id').attr("value"),
                dataType: 'json',
                type: "PUT",
                data: $('#updtForm').serialize(),
                success: () => {
                    resolve();
                },
            });
        });
        updateBookPromise.then(() => {
            location.reload();
        })
    })

    const loadData = new Promise(resolve => {
        $.ajax({
            headers: {"Accept": "application/json"},
            type: 'GET',
            url: "http://localhost:3001/product",
            crossDomain: true,
            success: data => {
                resolve(data);
            }
        })
    });

    loadData.then(data => {
        render(data);
    })
})

const render = data => {
    $('#catalog')[0].innerHTML = '';
    data.forEach(el => {
        $('#catalog').append(`
            <div style="border: 1px solid black; width: 20%; min-width: 300px; height: auto; margin-bottom: 25px">
                <button onclick="removeById(${el.id})" style="transform: translate(145px, 5px); position: absolute; height: 25px; width: 25px">x</button>
                <button onclick="editBook(${el.id})" style="transform: translate(115px, 5px); position: absolute; height: 25px; width: 25px">✎</button>
                <button onclick="downloadJsonFile(${el.id})" style="transform: translate(70px, 5px); position: absolute; height: 25px; width: 40px">json</button>
                <button onclick="downloadScvFile(${el.id})" style="transform: translate(25px, 5px); position: absolute; height: 25px; width: 40px">scv</button>
                <p style="color: gray; font-size: 12px; padding-top: 10px">${el.availability ? ' ' : 'Немає в наявності'}</p>
                <p>${el.caption}</p>
                <p>${el.price} грн</p>
                <p style="word-wrap: break-word; color: gray">${el.description}</p>
            </div>`)
    })
}

const getById = id => {
    const getByIdPromise = new Promise(resolve => {
        $.ajax({
            url: "http://localhost:3001/product/" + id,
            type: 'get',
            success: data => {
                resolve(data);
            },
        });
    })
    return getByIdPromise.then(data => {
        return data;
    })
}

const removeById = id => {
    const promise = new Promise(resolve => {
        $.ajax({
            url: "http://localhost:3001/product/" + id,
            type: 'DELETE',
            success: () => {
                resolve();
            },
        });
    })
    promise.then(() => {
        location.reload();
    })
}

const openForm = () => $("#createForm").attr("style", "display:block");

const hideForm = () => location.reload();

const hideUpdateForm = () => {
    const form = $("#updateForm");
    form.css("style", "display:none");
    form.empty();
}

const editBook = id => {
    const form = $("#updateForm");
    form.append(`
        <form id="updtForm" method="put" class="update_form">
                <h3>Edit book</h3>
                <input id="upd_id" name="id" required value="${id}" style="display: none" readonly/>
                <input id="upd_caption" name="caption" placeholder="Enter caption" required"/>
                <input id="upd_price" type="number" name="price" placeholder="Enter price" required"/>
                <input id="upd_description" name="description" placeholder="Enter description""/>
                <div style="display: flex; justify-content: space-between">
                    <input class="form_button" type="submit" value="Edit">
                    <button class="form_button" onclick="{hideUpdateForm()}">Cancel</button>
                </div>
        </form>
    `)
    form.attr("style", "display:block");
}

const downloadScvFile = async id => {
    const data = await getById(id);
    const csv = convertToCSV(data);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `${data.caption}.csv`);
    element.click();
}

const convertToCSV = data => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let result = keys.join(',');
    result += '\n';
    result += values.join(',')
    return result;
}

const downloadJsonFile = async id => {
    const data = await getById(id);
    const json = JSON.stringify(data);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', `${data.caption}.json`);
    element.click();
}

const search = () => {
    const searchValue = $("#search")[0].value;

    const search = new Promise(resolve => {
        if (searchValue) {
            $.ajax({
                url: "http://localhost:3000/product/search/" + searchValue,
                type: 'get',
                success: data => {
                    console.log(data)
                    resolve(data);
                },
            });
        } else {
            $.ajax({
                headers: {"Accept": "application/json"},
                type: 'GET',
                url: "http://localhost:3000/product",
                crossDomain: true,
                success: data => {
                    resolve(data);
                }
            })
        }
    })
    return search.then(data => {
        render(data);
    })
}



