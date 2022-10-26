<!DOCTYPE html>
<html>
<head>
   
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <?php echo $__env->make('layout.header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
</head>
<body>
    
<div class="container">

    <a class="btn btn-success mt-3 mb-3" href="javascript:void(0)" id="createNewComany"> Create New Company</a>
    <a class="mt-3 mb-3 float-right" href="<?php echo e(route('employee.index')); ?>"> Go to Employee -></a>
    <table id="company-table" class="table table-bordered data-table">
        <thead> 
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Annual Turnover</th>
                <th>Date Created</th>
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
                <form id="companyForm" name="companyForm" class="form-horizontal">
                   <input type="hidden" name="company_id" id="company_id">
                   <div class="error"></div>
                    <div class="form-group">
                        <label for="name" class="col-sm-4 control-label">Name *</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" value="" maxlength="50" required="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-sm-4 control-label">Category *</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control" id="category" name="category" placeholder="Enter category" value="" maxlength="50" required="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-sm-5 control-label">Annual Turnover *</label>
                        <div class="col-sm-12">
                            <input type="text" class="form-control" id="turnover" name="turnover" placeholder="Enter Annual Turnover" value="" maxlength="50" required="">
                        </div>
                    </div>
     
                    <div class="form-group">
                        <label class="col-sm-5 control-label">Date Created *</label>
                        <div class="col-sm-12">
                            <input type="date" class="form-control" id="date_created" name="date_created" placeholder="Enter date created" value="" maxlength="50" required="">
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
    

<?php echo $__env->make('layout.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

<script type="text/javascript">

</script>
</body>
</html><?php /**PATH C:\xampp-new\htdocs\Sellogs\resources\views/company.blade.php ENDPATH**/ ?>