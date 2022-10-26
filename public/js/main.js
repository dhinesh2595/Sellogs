


var sellogs = sellogs || {};
sellogs.table = function () {
 
    var self = {
        datatable: "",

        ready: function () {
          
                self.load();
          
        },

        load: function () {
            self.loadDataTable();
            self.eventHandler();
          
        },
        eventHandler: function () {

        },

        loadDataTable: function (id,url,columns) {
          
            var datas =   [
                {data: 'id', name: 'ID'},
                {data: 'name', name: 'name'},
                {data: 'category', name: 'category'},
                {data: 'annualturnover', name: 'annualturnover'},
                {
                            "data": "date_created",
                            "render": function (data) {
                                var date = new Date(data);
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" +  (month.toString().length > 1 ? month : "0" + month)  + "/" + date.getFullYear();
                            }
                        },
                        {
                            "data": "name",
                          
                            searchable: true,
                            "title": "",
                            render: function (data, type, rowObject, meta) {
                                
                                return '<a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Edit" class="edit btn btn-primary btn-sm editCompany">Edit</a> / <a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Delete" class="btn btn-danger btn-sm deleteCompany">Delete</a>';
                            }
                        },
            ];
           
            var element = '#'+ id
            self.datatable = $(element).DataTable({
                processing: true,
                serverSide: true,
                ajax: window.location.origin + url,
                columns: columns
            });
			
        },

       

    };
    return self;
}();




sellogs.company = function () {
    var self = {

        endpoints: {
            'company': '/company'
        },
        columns: [
                {data: 'id', name: 'ID', sName:  'id'  },
                {data: 'name', name: 'name', sName:  'name' },
                {data: 'category', name: 'category', sName:  'category'},
                {data: 'annualturnover', name: 'Annual turn Over', sName:  'annualturnover'},
                {
                            "data": "date_created",
                            "render": function (data) {
                                var date = new Date(data);
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" +  (month.toString().length > 1 ? month : "0" + month)  + "/" + date.getFullYear();
                            }, sName:  'date created'
                            
                        },
                        {
                            "data": "name",
                          
                            searchable: true,
                            "title": "",
                            render: function (data, type, rowObject, meta) {
                                
                                return '<a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Edit" class="edit btn btn-primary btn-sm editCompany">Edit</a> / <a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Delete" class="btn btn-danger btn-sm deleteCompany">Delete</a>';
                            }
                        },
            ],

        ready: function () {
            if (jQuery('#company-table').length) {
                self.load();
            }
            $.ajaxSetup({
        headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
        });
        },

        load: function () {
            sellogs.table.loadDataTable("company-table",self.endpoints.company,self.columns);
            self.eventHandler();
            self.saveCompany();
          
        },
        eventHandler: function () {
            jQuery(document).on('click', '#createNewComany', self.createNewCompany);
            jQuery(document).on('click', '.editCompany', self.editCompany);
            jQuery(document).on('click', '.deleteCompany', self.deleteCompany);
			
        },
        createNewCompany: function () {
            $('#saveBtn').val("create-comapny");
            $('#company_id').val('');
            $('#companyForm').trigger("reset");
            $('#modelHeading').html("Create New Comany");
            $('#ajaxModel').modal('show');
        },
        editCompany: function () {
            var company_id = $(this).data('id');
            $.get( window.location.origin + '/company' +'/' + company_id +'/edit', function (data) {
                $('#modelHeading').html("Edit Comany");
                $('#saveBtn').val("edit-Comany");
                $('#ajaxModel').modal('show');
                $('#company_id').val(data.id);
                $('#name').val(data.name);
                $('#category').val(data.category);
                $('#turnover').val(data.annualturnover);
                $('#date_created').val(data.date_created);
            })
        },
        saveCompany: function (e) {   
        var $form = $("#companyForm");
        $form.validate({
           
            submitHandler: function() {
                $('saveBtn').html('Save');
                $.ajax({
                    data: $('#companyForm').serialize(),
                    url: window.location.origin + '/company',
                    type: "POST",
                    dataType: 'json',
                    success: function (data) {
            
                        $('#companyForm').trigger("reset");
                        $('#ajaxModel').modal('hide');
                        sellogs.table.datatable.draw();
                      
                
                    },
                    error: function (data) {
                        console.log('Error:', data);
                        $('#saveBtn').html('Save Changes');
                    }
                });
            }
          });
           
        },
        deleteCompany: function (e) {
            var company_id = $(this).data("id");
            confirm("Are You sure want to delete !");
            
            $.ajax({
                type: "DELETE",
                url: window.location.origin + '/company'+'/'+company_id,
                success: function (data) {
                    sellogs.table.datatable.draw();
                },
                error: function (data) {
                    console.log('Error:', data);
                }
            });
        },


    };
    return self;
}();
  jQuery(document).ready(function () {
    sellogs.company.ready();
});


sellogs.employee = function () {
    var self = {

        endpoints: {
            'employee': '/employee'
        },
        columns: [
                    {data: 'id', name: 'Id', sName:  'id'},
                    {data: 'name', name: 'name', sName:  'name'},
                    {data: 'company_name', name: 'Company Name', sName:  'company_name'},
                    {data: 'salary', name: 'Salary', sName:  'salary'},
                    {
                        "data": "joined_date",
                        "render": function (data) {
                            var date = new Date(data);
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" +  (month.toString().length > 1 ? month : "0" + month)  + "/" + date.getFullYear();
                        }, sName:  'joined_date'
                    },
                    {
                        "data": "name",
                        orderable: false, 
                        searchable: false,
                        "title": "",
                        render: function (data, type, rowObject, meta) {
                            
                            return '<a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Edit" class="edit btn btn-primary btn-sm editEmployee">Edit</a> / <a href="javascript:void(0)" data-toggle="tooltip"  data-id="'+ rowObject.id +'" data-original-title="Delete" class="btn btn-danger btn-sm deleteEmployee">Delete</a>';
                        }
                    },
                ],

        ready: function () {
            if (jQuery('#employee-table').length) {
                self.load();
            }
            $.ajaxSetup({
        headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
        });
        },

        load: function () {
            sellogs.table.loadDataTable("employee-table",self.endpoints.employee,self.columns);
            self.eventHandler();
            self.savEmployee();
          
        },
        eventHandler: function () {
            jQuery(document).on('click', '#createNewEmployee', self.createNewEmployee);
            jQuery(document).on('click', '.editEmployee', self.editEmployee);
            jQuery(document).on('click', '.deleteEmployee', self.deleteEmployee);
			
        },
        createNewEmployee: function () {
    
            $('#saveBtn').val("create-employee");
            $('#employee_id').val('');
            $('#employeeForm').trigger("reset");
            $('#modelHeading').html("Create New Employee");
            $('#ajaxModel').modal('show');
        },
        editEmployee: function () {
            var employee_id = $(this).data('id');
            console.log(employee_id)
            $.get( window.location.origin + '/employee' +'/' + employee_id +'/edit', function (data) {
                $('#modelHeading').html("Edit Employee");
                $('#saveBtn').val("edit-employee");
                $('#ajaxModel').modal('show');
                $('#employee_id').val(data.id);
                $('#name').val(data.name);
                $('#company_name').val(data.company_name);
                $('#salary').val(data.salary);
                $('#joined_date').val(data.joined_date);
            })
        },
        savEmployee: function (e) {
           
            var $form = $("#employeeForm");
            $form.validate({
               
                submitHandler: function() {
                    $('saveBtn').html('Save');
                    $.ajax({
                        data: $('#employeeForm').serialize(),
                        url: window.location.origin + '/employee',
                        type: "POST",
                        dataType: 'json',
                        success: function (data) {
                
                            $('#employeeForm').trigger("reset");
                            $('#ajaxModel').modal('hide');
                            sellogs.table.datatable.draw();
                          
                    
                        },
                        error: function (data) {
                            console.log('Error:', data);
                            $('#saveBtn').html('Save Changes');
                        }
                    });
                }
              });
            
            
        },
        deleteEmployee: function (e) {
            var employee_id = $(this).data("id");
            confirm("Are You sure want to delete !");
            
            $.ajax({
                type: "DELETE",
                url: window.location.origin + '/employee'+'/'+employee_id,
                success: function (data) {
                    sellogs.table.datatable.draw();
                },
                error: function (data) {
                    console.log('Error:', data);
                }
            });
        },


    };
    return self;
}();
  jQuery(document).ready(function () {
    sellogs.employee.ready();
});
