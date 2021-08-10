<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deposit;
use App\Models\Transfer;
use App\Models\Withdrawal;
use App\Models\Account;

class ApiController extends Controller
{
    function sendResponse($result, $message, $code)
    {
        $response = [
            "success" => true,
            "data" => $result,
            "message" => $message
        ];
        return response()->json($response, $code);
    }

    function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            "success" => false,
            "error" => $error,
            "errorMessages" => $errorMessages
        ];
        return response()->json($response, $code);
    }

    function handler(Request $request)
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
                        $Deposit->save();
                        $currentBal = Account::where('accountId', $request->input('destino'))->select('balance')->get()[0]->balance;
                        return $this->sendResponse($request->input('destino') . ' , ' . $currentBal, "Account created", 201);
                    } else {
                        $Account =  Account::where('accountId', $request->input('destino'))->select('balance')->get();
                        $accountBal =  $Account[0]->balance;
                        Account::where('accountId', $request->input('destino'))->update(['balance' => $accountBal + $request->input('monto')]);
                        $Deposit->save();
                        $currentBal = Account::where('accountId', $request->input('destino'))->select('balance')->get()[0]->balance;
                        return $this->sendResponse($request->input('destino') . ' , ' . $currentBal, "Normal deposit", 200);
                    }
                } catch (\Exception $e) {
                    return $e;
                }
                break;
            case 'retiro':
                try {
                    $Withdrawal = new Withdrawal();
                    $Withdrawal->origen = $request->input('origen');
                    $Withdrawal->monto = $request->input('monto');
                    if (!Account::where('accountId', $request->input('origen'))->exists()) {
                        return $this->sendResponse("Error", "Origin does not exist", 404);
                    } else {
                        $Account =  Account::where('accountId', $request->input('origen'))->select('balance')->get();
                        $accountBal =  $Account[0]->balance;
                        if ($accountBal < $request->input('monto')) {
                            return $this->sendResponse("Error", "Withdrawal amount exceeds account balance", 404);
                        }
                        Account::where('accountId', $request->input('origen'))->update(['balance' => $accountBal - $request->input('monto')]);
                        $currentBal = Account::where('accountId', $request->input('origen'))->select('balance')->get()[0]->balance;
                        $Withdrawal->save();
                        return $this->sendResponse($request->input('origen') . ' , ' . $currentBal, "Withdrawal successful", 200);
                    }
                } catch (\Exception $e) {
                    return $e;
                }
                break;
            case 'transferir':
                try {
                    $Transfer = new Transfer();
                    $Transfer->destino = $request->input('destino');
                    $Transfer->origen = $request->input('origen');
                    $Transfer->monto = $request->input('monto');
                    if (!Account::where('accountId', $request->input('origen'))->exists()) {
                        return $this->sendResponse("Error", "Origin does not exist", 404);
                    } else {
                        $Account =  Account::where('accountId', $request->input('origen'))->select('balance')->get();
                        $accountBal =  $Account[0]->balance;
                        if ($accountBal < $request->input('monto')) {
                            return $this->sendResponse("Error", "Withdrawal amount exceeds account balance", 404);
                        }
                        Account::where('accountId', $request->input('origen'))->update(['balance' => $accountBal - $request->input('monto')]);
                        $currentBal = Account::where('accountId', $request->input('origen'))->select('balance')->get()[0]->balance;
                        $Withdrawal->save();
                        return $this->sendResponse($request->input('origen') . ' , ' . $currentBal, "Withdrawal successful", 200);
                    }
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
        return $this->sendResponse($Deposit, "Deposit obtenida correctamente", 200);
    }
}
