$(() => {
    const addModal = new bootstrap.Modal($('#add-modal')[0]);
    const editModal = new bootstrap.Modal($('#edit-modal')[0]);

    function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td>
                <button class="btn btn-danger" data-id="${person.id}" id="delete">Delete</button>
                <button class="btn btn-info" data-id="${person.id}" id="edit">Edit</button>
            </td>
</tr>`)
            });
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addModal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();


        $.post('/home/addperson', { firstName, lastName, age }, function () {
            addModal.hide();
            refreshTable();
        });
    });

    $("table").on('click', "#edit", function () {
        const id = $(this).data('id');
        $.post('/home/getperson', { id }, function (person) {
            $("#editFirstName").val(person.firstName);
            $("#editLastName").val(person.lastName);
            $("#editAge").val(person.age);
            $("#editId").val(person.id);
            editModal.show();
            
        });
    });

    $("#update-person").on('click', function () {
        const id = $("#editId").val();
        const firstName = $("#editFirstName").val();
        const lastName = $("#editLastName").val();
        const age = $("#editAge").val();


        $.post('/home/updateperson', { id, firstName, lastName, age }, function () {
            editModal.hide();
            refreshTable();
        });
    });

    $("table").on('click', "#delete", function () {

        const id = $(this).data('id');

        $.post('/home/deleteperson', { id }, function () {
            refreshTable();
        });
    });


})