<!DOCTYPE html>
<html>
<head>
   
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @include('layout.header')
</head>
<body>
   
<div class="container">
    
    <a class="btn btn-success mt-3 mb-3" href="javascript:void(0)" id="createNewEmployee"> Create New Employee</a>
    <a class="mt-3 mb-3 float-right" href="{{ route('company.index') }}"> Go to Company -></a>
    <table id="employee-table" class="table table-bordered data-table">
        <thead> 
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Salary</th>
                <th>Joined date</th>
                <th width="300px">Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
   
<div class="modal fade" id="ajaxModel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modelHeading"></h4>
            </div>
            <div class="modal-body">
                <form id="employeeForm" name="employeeForm" class="form-horizontal">
                   <input type="hidden" name="employee_id" id="employee_id">
                    <div class="form-group">
                        <label for="name" class="col-sm-3 control-label">Name *</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control " id="name" name="name" placeholder="Enter Name" value="" maxlength="50" required="">
                        </div>
                    </div>
                    <div class="form-group">
                       
                        <label for="name" class="col-sm-4 control-label">Company Name</label>
                        <div class="col-sm-12">
                            <div class="select">
                            <select class="company-select" name="company_name" id="company_name">
                                @foreach($companys as $company)
                                    <option value="{{$company->name}}">{{$company->name}}</option>
                                @endforeach
                               
                              </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-sm-3 control-label">Salary *</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control" id="salary" name="salary" placeholder="Enter Salary" value="" maxlength="50" required="">
                        </div>
                    </div>
     
                    <div class="form-group">
                        <label class="col-sm-5 control-label">Joined Date *</label>
                        <div class="col-sm-12">
                            <input type="date" class="form-control" id="joined_date" name="joined_date" placeholder="Enter Joined date" value="" maxlength="50" required="">
                        </div>
                    </div>
                
      
                    <div class="col-sm-offset-2 col-sm-10">
                     <button type="submit" class="btn btn-primary" id="saveBtn" value="create">Save changes
                     </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    

@include('layout.footer')

<script type="text/javascript">

</script>
</body>
</html>