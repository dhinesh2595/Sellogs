<?php
         
namespace App\Http\Controllers;
          
use App\Models\Company;
use Illuminate\Http\Request;
use DataTables;
        
class CompanysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
   
        $company =  Company::all();;
        
        
        if ($request->ajax()) {
            $data =  Company::all();;
            return Datatables::of($data)

                    ->make(true);
                   
        }
      
        return view('company',compact('company'));
    }
     
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Company::updateOrCreate(['id' => $request->company_id],
        ['name' => $request->name,'category' => $request->category, 'annualturnover' => $request->turnover,'date_created' => $request->date_created]);        
   
        return response()->json(['success'=>'Company saved successfully.']);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::find($id);
        return response()->json($company);
    }
  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Company::find($id)->delete();
     
        return response()->json(['success'=>'Company deleted successfully.']);
    }
}