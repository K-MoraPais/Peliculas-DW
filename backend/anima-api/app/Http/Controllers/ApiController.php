<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deposit;
use App\Models\Transfer;
use App\Models\Withdrawal;
use App\Models\Account;

class ApiController extends Controller
{
    public function sendResponse($result, $message)
    {
        $response = [
            "success" => true,
            "data" => $result,
            "message" => $message
        ];
        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            "success" => false,
            "error" => $error,
            "errorMessages" => $errorMessages
        ];
        return response()->json($response, $code);
    }

    public function handler(Request $request)
    {

        $requestType = $request->input('tipo');
        switch ($requestType) {

            case 'deposito':
                try {
                    $Account = new Account();
                    $Deposit = new Deposit();
                    $Deposit->destino = $request->input('destino');
                    $Deposit->monto = $request->input('monto');
                    if (!Account::where('accountId', $request->input('destino'))->exists()) {
                        $Account->accountId = $request->input('destino');
                        $Account->balance = $request->input('monto');
                        $Account->save();
                    }else{
                        $Account =  Account::where('accountId', $request->input('destino'))->select('balance')->get();
                        $accountBal =  $Account[0]->balance;
                        Account::where('accountId', $request->input('destino'))->update(['balance' => $accountBal + $request->input('monto')]);
                    }
                    $Deposit->save();
                    return 'Ok';
                } catch (\Exception $e) {
                    return $e;
                }
                break;
            case 'retiro':
                try {
                    $Withdrawal = new Withdrawal();
                    $Withdrawal->origin = $request->input('origen');
                    $Withdrawal->monto = $request->input('monto');
                    $Withdrawal->save();
                    return "Withdrawal";
                } catch (\Exception $e) {
                    return "a";
                }
                break;
            case 'transferir':
                try {
                    $Transfer = new Transfer();
                    $Transfer->destino = $request->input('destino');
                    $Transfer->origen = $request->input('origen');
                    $Transfer->monto = $request->input('monto');
                    $Transfer->save();
                    return "Transfer";
                } catch (\Illuminate\Database\QueryException $e) {
                    return $e;
                }
                break;
        }
    }

    public function balance($id)
    {
        $Deposit = Deposit::where('idDeposit', $id)
            ->select('idDeposit', 'nombre', 'img')
            ->get();
        return $this->sendResponse($Deposit, "Deposit obtenida correctamente");
    }
}
