// Write your Javascript code.
angular.module("Calculator", []).controller("CalculatorController",
	function CalculatorController($scope) {
	    $scope.disabled = false;
	    $scope.displayValue = "0";
	    $scope.error = undefined;
	    var notChanged = true;
	    var value = 0;
	    var state = "UNKNOWN";

	    $scope.onButtonClick = function (btVal) {
	        switch (btVal) {
	            case "C":
	                $scope.displayValue = "0";
	                $scope.error = undefined;
	                value = 0;
	                state = "UNKNOWN";
	                notChanged = true;
	                $scope.disabled = false;
	                break;
	            case "sqrt":
	                sqrtAction();
	                break;
	            case "%":
	                var secondComponentWithPercent = Number.parseFloat($scope.displayValue) / 100;
	                resultAction(secondComponentWithPercent);
	                break;
	            case "/":
	                biOperatorAction("DIV");
	                break;
	            case "*":
	                biOperatorAction("MUL");
	                break;
	            case "-":
	                biOperatorAction("SUB");
	                break;
	            case "+":
	                biOperatorAction("ADD");
	                break;
	            case "+/-":
	                signAction();
	                break;
	            case "=":
	                var secondComponent = Number.parseFloat($scope.displayValue);
	                resultAction(secondComponent);
	                break;
	            case ".":
	                dotAction();
	                break;
	            default:
	                numberAction(btVal);
	                break;
	        }
	        console.log(btVal);
	    }

	    function sqrtAction() {
	        var parsedVal = Number.parseFloat($scope.displayValue);
	        if (parsedVal < 0) {
	            setError("Nie można policzyć pierwiastka z liczby ujemnej");
	        } else {
	            var sqrtVal = Math.sqrt(parsedVal);
	            resultAction(sqrtVal);
	        }
	    }

	    function resultAction(secondComponent) {
	        if (state === "DIV" && secondComponent == 0) {
	            setError("Dzielenie przez zero");
	        } else {
	            console.log("result action: " + state);
	            if (state === "ADD") {
	                value = value + secondComponent;
	            } else if (state === "SUB") {
	                value = value - secondComponent;
	            } else if (state === "MUL") {
	                value = value * secondComponent;
	            } else if (state === "DIV") {
	                value = value / secondComponent;
	            } else {
	                value = secondComponent;
	            }
	            setResult();
	            state = "UNKNOWN";
	        }
	    }

	    function biOperatorAction(newState) {
	        if (!notChanged) {
	            var parsedVal = Number.parseFloat($scope.displayValue);
	            if (value == 0) {
	                value = parsedVal;
	            } else {
	                if (state === "ADD") {
	                    value = value + parsedVal;
	                } else if (state === "SUB") {
	                    value = value - parsedVal;
	                } else if (state === "MUL") {
	                    value = value * parsedVal;
	                } else if (state === "DIV") {
	                    value = value / parsedVal;
	                } else {
	                    value = parsedVal;
	                }
	            }
	        }
	        setResult();
	        state = newState;
	    }

	    function signAction() {
	        if ($scope.displayValue === "0") {
	            return;
	        }
	        $scope.displayValue = $scope.displayValue.startsWith("-") ?
                $scope.displayValue.substring(1, $scope.displayValue.length) :
                "-" + $scope.displayValue;
	    }

	    function dotAction() {
	        if ($scope.displayValue.indexOf("." < 0)) {
	            $scope.displayValue = $scope.displayValue + ".";
	            notChanged = false;
	        } else {
                setError("Wpisana liczba posiada już separator dziesiętny")
	        }
	    }

	    function numberAction(val) {
	        var parsedVal = Number.parseFloat($scope.displayValue);
	        if (Number.isNaN(parsedVal) || !Number.isFinite(parsedVal)) {
	            setError("Niepoprawna operacja");
	        } else {
	            $scope.displayValue = notChanged ? val : $scope.displayValue + val;
	            notChanged = false;
	        }
	    }

	    function setResult() {
	        var intVal = Math.round(value);
	        $scope.displayValue = value == intVal ? intVal.toString() : value.toString();
	        console.log("set result: " + $scope.displayValue);
	        notChanged = true;
	    }

	    function setError(errorMsg) {
	        state = "ERROR";
	        $scope.displayValue = "ERR";
	        $scope.error = errorMsg;
	        $scope.disabled = true;
	    }
	}
);