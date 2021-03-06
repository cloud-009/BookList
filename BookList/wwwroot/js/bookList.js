var DataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    DataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                             <a href="/List/Edit?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                               Edit
                             </a>
                             &nbsp;
                             <a class='btn btn-danger' style='cursor:pointer; width:100px;'
                                 onclick=Delete('api/book?id='+${data})>
                               Delete
                             </a>
                     </div>`;
                }, "width": "30%"
            }
        ],
        "language": {
            "emptyTables": "No Data Found"
        },
        "width": "70%"
    });
}

function Delete(url) {
    swal({
        title: "Are You Sure?",
        text: "Once deleted it can't be recovered",
        icon: "warning",
        dangerMode: true,
        buttons: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}