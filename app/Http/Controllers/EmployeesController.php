<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Company;
use Illuminate\Http\Request;
use DataTables;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $employee =  Employee::all();
        $companys = Company::all();;
        
        if ($request->ajax()) {
            $data =  Employee::all();;
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->rawColumns(['action'])
                    ->make(true);
                   
        }
      
        return view('employee',compact('employee','companys'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Employee::updateOrCreate(['id' => $request->employee_id],
        ['name' => $request->name,'company_name' => $request->company_name, 'salary' => $request->salary,'joined_date' => $request->joined_date]);        
   
        return response()->json(['success'=>'Employee saved successfully.']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $employee = Employee::find($id);
        return response()->json($employee);
    }
    

    
    public function destroy($id)
    {
        Employee::find($id)->delete();
     
        return response()->json(['success'=>'Employee deleted successfully.']);
    }
}
