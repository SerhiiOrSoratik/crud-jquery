$.ajax({
    headers: {"Accept": "application/json"},
    type: 'GET',
    url: "http://localhost:3000/product",
    crossDomain: true,
    success: function (data) {
        data.forEach(el => {
            $('#catalog').append(`
            <div style="border: 1px solid black; width: 20%; min-width: 300px; height: auto; margin-bottom: 25px">
                <p style="color: gray; font-size: 12px">${el.availability ? ' ' : 'Немає в наявності'}</p>
                <p>${el.caption}</p>
                <button onclick="removeById(${el.id})" style="transform: translate(150px, -50px); position: absolute">x</button>
                <button onclick="editBook(${el.id})" style="transform: translate(100px, -50px); position: absolute">Edit</button>
                <p>${el.price} грн</p>
                <p style="word-wrap: break-word; color: gray">${el.description}</p>
            </div>
             `)
        })
    }
});

$(document).ready(function (e) {
    $("#createForm").on('submit', (function (e) {
        e.preventDefault();
        $.ajax({
            headers: {
                'Accept': 'application/json',
            },
            url: "http://localhost:3000/product",
            dataType: 'json',
            type: "POST",
            data: $('#crForm').serialize(),
            success: function (data) {
                location.reload();
            },
        });
    }));

    $("#updateForm").on('submit', (function (e) {
        e.preventDefault();
        $.ajax({
            headers: {
                'Accept': 'application/json',
            },
            url: "http://localhost:3000/product/" + $('#upd_id').attr("value"),
            dataType: 'json',
            type: "PUT",
            data: $('#updtForm').serialize(),
            success: function (data) {
                location.reload();
            },
        });
    }));
});

const removeById = (id) => {
    $.ajax({
        url: "http://localhost:3000/product/" + id,
        type: 'DELETE',
        success: function () {
            location.reload();
        }
    });
}

function openForm(formName) {
    document.getElementById(formName).style.display = "block";
}

function hideForm(formName) {
    $("#crForm")[0].reset();
    document.getElementById(formName).style.display = "none";
}

function hideUpdateForm() {
    document.getElementById('updateForm').style.display = "none";
    $("#updateForm").empty()
}

const editBook = (id) => {
    $("#updateForm").append(`
        <form id="updtForm" method="put" style="width: 320px; padding: 10px; background-color: #999999; display: flex; flex-direction: column; gap: 25px;">
                <input id="upd_id" name="id"  placeholder="Enter id" required value="${id}" style="display: none" readonly/>
                <input id="upd_caption" name="caption" placeholder="Enter caption" required"/>
                <input id="upd_price" type="number" name="price" placeholder="Enter price" required"/>
                <input id="upd_description" name="description" placeholder="Enter description""/>
            <div style="display: flex; justify-content: space-between">
                <input style=" background: #656565; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#656565), to(#444)); background: -moz-linear-gradient(#656565, #444); background: linear-gradient(#656565, #444);
                    padding: 16px 20px; border: none; cursor: pointer; width: 45%; opacity: 0.8;" type="submit" value="Edit">
                <button style=" background: #656565; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#656565), to(#444)); background: -moz-linear-gradient(#656565, #444); background: linear-gradient(#656565, #444);
                    padding: 16px 20px; border: none; cursor: pointer; width: 45%; opacity: 0.8;" onclick="{hideUpdateForm()}">Cancel</button>
            </div>
        </form>`
    )
    openForm("updateForm")
}



