"use strict";

var tokenConfig = {
    "name": {
        "value": "ExToken",
        "minLength": 2,
        "maxLength": 128
    },
    "symbol": {
        "value": "ExToken",
        "minLength": 1,
        "maxLength": 16
    }
};
var otherConfig = {
    "allowanceSymbol": "|"
};

var Order = function(obj) {
    this.parse(obj);
};
Order.prototype = {
    toString: function() {
        return JSON.stringify(this);
    },

    parse: function(obj) {
        if (typeof obj != "undefined") {
            if (typeof obj != "object") {
                var data = JSON.parse(obj);
            } else {
                var data = obj;
            }
            this.orderId = data.orderId;
            this.address = data.address;
            this.amount = data.amount;
            this.price = data.price;
            this.time = data.time;
            this.tokenName = data.tokenName;
            this.freezeToken = data.freezeToken;
            this.freezeNAS = data.freezeNAS;
            this.status = data.status;
            this.hash = data.hash;
        } else {
            this.orderId = 0;
            this.address = '';
            this.amount = 0;
            this.price = 0;
            this.time = 0;
            this.tokenName = "";
            this.freezeToken = 0;
            this.freezeNAS = 0;
            this.status = 0;
            //status 0 Order 1 complete 2 cancel
            this.hash = "";
        }
    }
};

//Check
var isNumber = function(integer) {
    if (!isNaN(integer)) {
        return true;
    }
    return false;
}
var by = function(name, minor) {
    return function(o, p) {
        var a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }
}
var byd = function(name, minor) {
    return function(o, p) {
        var a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        } else {
            thro("error");
        }
    }
}

//Token DB
var Token = function() {
    function checkNumber(bigNumberObject, mustBeInteger, minimalValue, maximumValue, numberName) {
        let printName = numberName || 'Number';

        if (typeof bigNumberObject.isNaN !== 'function') {
            throw new Error('bad checkNumber: ' + JSON.stringify([bigNumberObject, mustBeInteger, minimalValue, maximumValue, numberName]) + ', please make sure you are ALWAYS dealing with numbers using BigNumber. That is important!');
        } else if (bigNumberObject.isNaN()) {
            throw new Error(printName + ' must be specified as number');
        } else if (mustBeInteger && !bigNumberObject.isInteger()) {
            throw new Error(printName + ' must be specified as Integer number');
        } else if (minimalValue !== null && bigNumberObject.lt(minimalValue)) {
            throw new Error(printName + ' must be larger than ' + minimalValue);
        } else if (maximumValue !== null && bigNumberObject.gt(maximumValue)) {
            throw new Error(printName + ' must be smaller than ' + maximumValue);
        } else {
            return true;
        }
    }

    function checkString(testString, minimalLength, maximumLength, stringName) {
        let printName = stringName || 'String';

        if (typeof(testString) !== 'string') {
            throw new Error(printName + ' must be a String');
        } else if (maximumLength !== null && testString.length > maximumLength) {
            throw new Error(printName + ' should not exceed ' + maximumLength + ' characters');
        } else if (minimalLength !== null && testString.length < minimalLength) {
            throw new Error(printName + ' should not exceed ' + minimalLength + ' characters');
        } else {
            return true;
        }
    }

    //Config
    LocalContractStorage.defineProperties(this, {
        "_owner": {
            parse: function(storedAddress) {
                return storedAddress;
            },
            stringify: function(newAddress) {
                return newAddress;
            }
        },
        "_hash": null,
        "_name": {
            parse: function(value) {
                return value;
            },
            stringify: function(valueString) {
                checkString(valueString, tokenConfig.name.minLength, tokenConfig.name.maxLength, 'Token name');
                return valueString;
            }
        },
        "_symbol": {
            parse: function(value) {
                return value;
            },
            stringify: function(valueString) {
                checkString(valueString, tokenConfig.symbol.minLength, tokenConfig.symbol.maxLength, 'Token symbol');
                return valueString;
            }
        },
        "_admin": {
            parse: function(storedAddress) {
                return storedAddress;
            },
            stringify: function(newAddress) {
                return newAddress;
            }
        }
    });

    //DB
    LocalContractStorage.defineMapProperty(this, "messages", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "tokenHash", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "withdrawHash", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "balances", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "transfers", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "tokenList", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "contractTotal", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "contractFee", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "buyIndex", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "sellIndex", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "buyList", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "sellList", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "myOrder", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "lastPrice", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "tradeHistory", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "kLine", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "maxList", {
        stringify: function(arrayOfStrings) {
            return JSON.stringify(arrayOfStrings);
        },
        parse: function(stringifiedArray) {
            if (typeof stringifiedArray != "object") {
                return JSON.parse(stringifiedArray);
            } else {
                return stringifiedArray;
            }
        }
    });
    LocalContractStorage.defineProperty(this, "tokenIndex");
    LocalContractStorage.defineMapProperty(this, "tokenMap");
};
Token.prototype = {
    init: function() {
        this._owner = Blockchain.transaction.from;
        this._hash = Blockchain.transaction.hash;
        this._name = "FixedEx";
        this._symbol = "FixedEx";
        this.tokenIndex = 0;
    },
    name: function() {
        return this._name;
    },
    symbol: function() {
        return this._symbol;
    },
    _isOwner: function() {
        var owner = this._owner;
        if (owner === Blockchain.transaction.from) {
            return true;
        } else {
            return false;
        }
    },
    _isAdmin: function() {
        var admin = this._admin;
        if (admin === Blockchain.transaction.from) {
            return true;
        } else {
            return false;
        }
    },
    _notify: function(eventType, eventData) {
        var eventObject = {};
        eventObject.type = eventType;
        eventObject[eventType] = eventData;
        return Event.Trigger(this._hash, eventObject);
    },
    _string: function(obj) {
        return JSON.stringify(obj);
    },
    _kline: function(tokenName, price, volume) {
        var lineData = this.kLine.get(tokenName);
        var myDate = new Date();
        var h = myDate.getHours();
        if (!lineData) {
            lineData = [];
        }
        try {
            let _time = this._timestampToTime();
            if (typeof lineData[h] != 'object' || (!lineData[h])) {
                lineData[h] = {
                    date: _time,
                    high: price,
                    low: price,
                    open: price,
                    close: price,
                    volume: volume
                };
            } else {
                if ((typeof lineData[h] == 'undefined') || !lineData[h] || (typeof lineData[h].date == 'undefined') || (lineData[h].date != _time)) {
                    lineData[h] = {
                        date: _time,
                        high: price,
                        low: price,
                        open: price,
                        close: price,
                        volume: volume
                    };
                } else {
                    if ((new BigNumber(lineData[h].high)) < (new BigNumber(price))) {
                        lineData[h].high = new BigNumber(price);
                    }
                    if ((new BigNumber(lineData[h].low)) > (new BigNumber(price))) {
                        lineData[h].low = new BigNumber(price);
                    }
                    lineData[h].close = price;
                    lineData[h].volume = (new BigNumber(lineData[h].volume)).add(new BigNumber(volume));
                }
            }
            this.kLine.set(tokenName, lineData);
        } catch (err) {
            throw new Error("error:" + err.message);
        }
    },
    _timestampToTime: function() {
        var myDate = new Date();
        var Y = myDate.getFullYear() + '-';
        var M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-';
        var D = myDate.getDate() + ' ';
        var h = myDate.getHours() + ':00:00:000';
        return (Date.parse(new Date(Y + M + D + h)));
    },
    updateKline: function(tokenName, h, timestamp, high, low, open, close, volume) {
        if (this._isOwner()) {
            var lineData = this.kLine.get(tokenName);
            if (!lineData) {
                lineData = [];
            }
            lineData[h] = {
                date: timestamp,
                high: high,
                low: low,
                open: open,
                close: close,
                volume: volume
            };
            this.kLine.set(tokenName, lineData);
        }
    },
    updateAdmin: function(Address) {
        if (this._isOwner() && Blockchain.verifyAddress(Address)) {
            this._admin = Address;
        }
    },
    updateToken: function(tokenName, symbol, fee, withdrawMin, withdrawFee, wallet, address, hash, approve, url, content) {
        if (this._isOwner() && tokenName && symbol && (tokenName.length > 0) && (symbol.length > 0)) {
            this.tokenMap.set(this.tokenIndex, tokenName);
            this.tokenList.set(tokenName, {
                name: tokenName,
                symbol: symbol,
                fee: fee,
                withdrawMin: withdrawMin,
                withdrawFee: withdrawFee,
                wallet: wallet,
                address: address,
                hash: hash,
                approve: approve,
                url: url,
                content: content
            });
            this.tokenIndex++;
            this.maxList.set(tokenName, 500);
            return "successful";
        } else {
            throw new Error("failed");
        }
    },
    //Get Token lastPrice
    price: function(tokenName) {
        var _tokenName = tokenName || "NAS";
        var _price = this.lastPrice.get(_tokenName);
        if (!_price) {
            _price = 0;
        }
        return _price;
    },
    //Get Token Line
    line: function(tokenName) {
        var _tokenName = tokenName || "NAS";
        var lineData = this.kLine.get(_tokenName);
        if (!lineData) {
            lineData = [];
        }
        return lineData;
    },
    //Get Token list
    tokens: function(tokenName) {
        if (typeof tokenName == "string" && tokenName.length > 0) {
            let token = this.tokenList.get(tokenName);
            if (token) {
                return token;
            } else {
                return {
                    approve: 0
                };
            }
        }

        var approveToken = {};
        if (this._isOwner()) {
            for (var i = 0; i < this.tokenIndex; i++) {
                let key = this.tokenMap.get(i);
                let token = this.tokenList.get(key);
                approveToken[token.symbol] = token;
            }
        } else {
            for (var i = 0; i < this.tokenIndex; i++) {
                let key = this.tokenMap.get(i);
                let token = this.tokenList.get(key);
                if (token.approve == 1) {
                    approveToken[token.symbol] = token;
                }
            }
        }
        return approveToken;
    },
    //contract Total
    total: function(tokenName) {
        if (this._isOwner()) {
            var _tokenName = tokenName || "NAS";
            return this.contractTotal.get(_tokenName);
        } else {
            return new BigNumber(0);
        }
    },
    //contract Fee Total
    totalFee: function(tokenName) {
        if (this._isOwner()) {
            var _tokenName = tokenName || "NAS";
            return this.contractFee.get(_tokenName);
        } else {
            return new BigNumber(0);
        }
    },
    //Check the balance
    balanceOf: function(walletAddress, tokenName) {
        if (walletAddress && !Blockchain.verifyAddress(walletAddress)) {
            throw new Error("Specified wallet address is not valid");
        }
        var wallet = this.balances.get(walletAddress);
        var _tokenName = tokenName || "NAS";
        if (wallet && wallet[_tokenName] && isNumber(wallet[_tokenName].balance)) {
            return new BigNumber(wallet[_tokenName].balance);
        }
        return new BigNumber(0);
    },
    //transfer
    transfer: function(receiverAddress, tokenAmount, tokenName) {
        if (!Blockchain.verifyAddress(receiverAddress)) {
            throw new Error("Receiver address is not valid");
        }
        var value = new BigNumber(tokenAmount || 0);
        if (!value.isInteger() || value.lt(0)) {
            throw new Error("Transfer value must be non-negative integer.");
        }
        var senderAddress = Blockchain.transaction.from;
        var wallet = this.balances.get(senderAddress);
        var _tokenName = tokenName || "NAS";
        var token = this.tokens(_tokenName);
        if (token) {
            if ((token.approve != 1) && !(this._isOwner())) {
                throw new Error("[approve] invalid token.");
            }
        } else {
            throw new Error("invalid token.");
        }

        if (wallet && wallet[_tokenName] && isNumber(wallet[_tokenName].balance)) {
            let senderFee = new BigNumber(0.002);
            if (token) {
                senderFee = new BigNumber(token.fee || 0.002);
            }
            let senderBalance = new BigNumber(wallet[_tokenName].balance || 0);
            let valueFee = value.mul(senderFee).add(value);
            if (senderBalance.lt(valueFee)) {
                throw new Error("insufficient balance.");
            }
            wallet[_tokenName].balance = senderBalance.sub(valueFee);
            this.balances.set(senderAddress, wallet);

            let contractFee = this.contractFee.get(_tokenName);
            if (contractFee) {
                this.contractFee.set(_tokenName, contractFee.add(valueFee.sub(value)));
            } else {
                this.contractFee.set(_tokenName, valueFee.sub(value));
            }

            var receiverWallet = this.balances.get(receiverAddress);
            if (receiverWallet && receiverWallet[_tokenName] && isNumber(receiverWallet[_tokenName].balance)) {
                let receiverBalance = new BigNumber(receiverWallet[_tokenName].balance || 0);
                receiverWallet[_tokenName].balance = receiverBalance.add(value);
                this.balances.set(receiverAddress, receiverWallet);
            } else if (receiverWallet) {
                receiverWallet[_tokenName] = {
                    balance: value
                };
                this.balances.set(receiverAddress, receiverWallet);
            } else {
                receiverWallet = {};
                receiverWallet[_tokenName] = {
                    balance: value
                };
                this.balances.set(receiverAddress, receiverWallet);
            }
            this._notify("Transfer", {
                "from": senderAddress,
                "to": receiverAddress,
                "symbol": _tokenName,
                "value": value
            });
        } else {
            throw new Error("transfer failed.");
        }
    },
    //Kill 3 method
    transferFrom: function(senderAddress, receiverAddress, tokensAmount) {},
    approve: function(spenderAddress, previousValue, newValue) {},
    allowance: function(senderAddress, spenderAddress) {},
    transferBatch: function(receiverAddress, tokenAmount, tokenName) {
        if (this._isOwner() && (typeof receiverAddress == 'object') && (receiverAddress instanceof Array) && !isNaN(tokenAmount) && (tokenAmount > 0)) {
            var okList = [];
            for (var i in receiverAddress) {
                if (Blockchain.verifyAddress(receiverAddress[i])) {

                    var Wallet = this.balances.get(receiverAddress[i]);
                    if (Wallet && Wallet[tokenName] && isNumber(Wallet[tokenName].balance)) {
                        var Balance = new BigNumber(Wallet[tokenName].balance);
                        Wallet[tokenName] = {
                            balance: Balance.add(new BigNumber(tokenAmount))
                        };
                        this.balances.set(receiverAddress[i], Wallet);
                    } else if (Wallet) {
                        var Balance = new BigNumber(tokenAmount);
                        Wallet[tokenName] = {
                            balance: Balance
                        };
                        this.balances.set(receiverAddress[i], Wallet);
                    } else {
                        var Balance = new BigNumber(tokenAmount);
                        Wallet = {};
                        Wallet[tokenName] = {
                            balance: Balance
                        };
                        this.balances.set(receiverAddress[i], Wallet);
                    }

                    this._notify("Transfer", {
                        "from": receiverAddress[i],
                        "to": receiverAddress[i],
                        "symbol": tokenName,
                        "value": new BigNumber(tokenAmount)
                    });

                    okList.push({
                        address: receiverAddress[i],
                        amount: Balance
                    });

                }
            }

            return {
                data: okList,
                count: okList.length
            };
        }
    },
    //transfer log
    transferLog: function(Address) {
        if (Blockchain.verifyAddress(Address)) {
            let _transLog = this.transfers.get(Address);
            if (!_transLog) {
                return [];
            }
            if (_transLog.length > 200) {
                let j = 0;
                let __transLog = [];
                for (var i = (_transLog.length - 1); i >= 0; i--) {
                    if (j >= 200) {
                        break;
                    }
                    __transLog[j] = _transLog[i];
                    j++;
                }
                this.transfers.set(Address, __transLog);
            }
            return _transLog;
        }
        return [];
    },
    //Confirmation of transfer
    transferConfirmation: function(Address, tokenAmount, tokenName, tokenHash) {
        if (this._isAdmin() && Blockchain.verifyAddress(Address) && !isNaN(tokenAmount) && (tokenAmount > 0)) {
            let _tokenHash = this.tokenHash.get(tokenHash);
            if (!_tokenHash) {
                throw new Error("failed. null");
            }
            if (_tokenHash.address != Address) {
                throw new Error("failed. address x");
            }
            let Wallet = this.balances.get(Address);
            if (Wallet && Wallet[tokenName] && isNumber(Wallet[tokenName].balance)) {
                var Balance = new BigNumber(Wallet[tokenName].balance);
            } else if (Wallet) {
                var Balance = new BigNumber(0);
                Wallet[tokenName] = {
                    balance: Balance
                };
                this.balances.set(Address, Wallet);
            } else {
                var Balance = new BigNumber(0);
                Wallet = {};
                Wallet[tokenName] = {
                    balance: Balance
                };
                this.balances.set(Address, Wallet);
            }

            Wallet[tokenName] = {
                balance: Balance.add(new BigNumber(tokenAmount))
            };
            this.balances.set(Address, Wallet);
            this.tokenHash.set(tokenHash, {
                address: Address,
                token: tokenName,
                amount: tokenAmount,
                status: 1
            });
            return 'success';
        }

        throw new Error("failed");
    },
    changeMax: function(tokenName, Number) {
        if (this._isOwner() && !isNaN(Number) && (Number > 0)) {
            this.maxList.set(tokenName, Number);
        }
        return this.maxList.get(tokenName);
    },
    //withdraw log
    withdrawLog: function(Address) {
        if (Blockchain.verifyAddress(Address)) {
            let _withdrawLog = this.withdrawHash.get(Address);
            if (!_withdrawLog) {
                return [];
            }
            return _withdrawLog;
        }
        return [];
    },
    //Set withdraw
    withdraw: function(tokenName, tokenAmount) {
        if (!isNaN(tokenAmount) && (tokenAmount > 0)) {
            var _tokenName = tokenName || "NAS";
            tokenAmount = new BigNumber(tokenAmount);
            var senderAddress = Blockchain.transaction.from;
            var wallet = this.balances.get(senderAddress);
            if (wallet && wallet[_tokenName] && isNumber(wallet[_tokenName].balance)) {
                var walletBalance = new BigNumber(wallet[_tokenName].balance);
            } else if (wallet) {
                var walletBalance = new BigNumber(0);
                wallet[_tokenName] = {
                    balance: walletBalance
                };
                this.balances.set(senderAddress, wallet);
            } else {
                var walletBalance = new BigNumber(0);
                wallet = {};
                wallet[_tokenName] = {
                    balance: walletBalance
                };
                this.balances.set(senderAddress, wallet);
            }

            if ((_tokenName == "NAS") && (walletBalance >= (tokenAmount.add(0.03)))) {
                wallet[_tokenName] = {
                    balance: ((new BigNumber(walletBalance)).sub(tokenAmount).sub(0.03))
                };
                this.balances.set(senderAddress, wallet);
                var result = Blockchain.transfer(senderAddress, tokenAmount.mul(new BigNumber(10).pow(18)));
                this._notify("Transfer", {
                    "from": this._owner,
                    "to": senderAddress,
                    "symbol": _tokenName,
                    "value": tokenAmount
                });

                let _message = this.messages.get(senderAddress);
                if (!_message) {
                    _message = [];
                }
                _message.push({
                    date: _time,
                    msg: 'Withdraw, +' + (tokenAmount.add(0.03)) + " NAS. Code:" + JSON.stringify(result)
                });
                this.messages.set(senderAddress, _message);

                return result;
            } else {
                let withdrawMin = new BigNumber(10);
                let withdrawFee = new BigNumber(1);
                var withdrawInfo = this.tokenList.get(_tokenName);
                if (withdrawInfo) {
                    withdrawMin = new BigNumber(withdrawInfo.withdrawMin);
                    withdrawFee = new BigNumber(withdrawInfo.withdrawFee);
                }
                if (walletBalance.gt(tokenAmount.add(withdrawFee))) {
                    if (withdrawMin > tokenAmount) {
                        throw new Error("withdraw failed. Minimum " + withdrawMin);
                    }

                    wallet[_tokenName] = {
                        balance: (walletBalance.sub(tokenAmount).sub(withdrawFee))
                    };
                    this.balances.set(senderAddress, wallet);

                    var _withdrawHash = this.withdrawHash.get(senderAddress);
                    if (!_withdrawHash) {
                        _withdrawHash = [];
                    }
                    _withdrawHash.push({
                        date: Date.now(),
                        tokenName: _tokenName,
                        amount: tokenAmount,
                        txHash: Blockchain.transaction.hash,
                        bindTx: ""
                    });

                    this.withdrawHash.set(senderAddress, _withdrawHash);

                    this._notify("Transfer", {
                        "from": this._owner,
                        "to": senderAddress,
                        "symbol": _tokenName,
                        "value": tokenAmount
                    });
                    return 'success';
                } else {
                    throw new Error("withdraw failed.");
                }
            }
        }
        throw new Error("withdraw failed..");
    }
}
Token.prototype.withdrawConfirmation = function(address, txHash, bindTx) {
    if (this._isAdmin() && Blockchain.verifyAddress(address) && txHash && (txHash.length == 64) && bindTx && (bindTx.length == 64)) {
        var _withdrawHash = this.withdrawHash.get(address);
        if (_withdrawHash) {
            for (var i in _withdrawHash) {
                if (_withdrawHash[i].txHash == txHash) {
                    _withdrawHash[i].bindTx = bindTx;
                    this.withdrawHash.set(address, _withdrawHash);
                    return 'success';
                }
            }
        }
    }
    throw new Error("failed.");
}
//Set transferConfirmation
Token.prototype.transferFirst = function(tokenHash) {
    let _tokenHash = this.tokenHash.get(tokenHash);
    if (_tokenHash) {
        throw new Error("Already exist");
    }
    this.tokenHash.set(tokenHash, {
        address: Blockchain.transaction.from,
        token: "",
        amount: 0,
        status: 0
    });
}
//Get transferHash
Token.prototype.getTransfers = function(tokenHash) {
    let _tokenHash = this.tokenHash.get(tokenHash);
    return _tokenHash;
}
//Get Message
Token.prototype.message = function(address) {
    if (Blockchain.verifyAddress(address)) {
        let _message = this.messages.get(address);
        if (!_message) {
            _message = [];
        }
        return _message;
    }
}
//Import History
Token.prototype.importHistory = function(tokenName, historyData) {
    if (this._isOwner() && (typeof historyData == 'object') && (historyData instanceof Array)) {
        this.tradeHistory.set(tokenName, historyData);
        return 'success';
    }
}
//Import Order
Token.prototype.importOrder = function(tokenName, orderData, Type) {
    if (this._isOwner() && (typeof orderData == 'object') && (orderData instanceof Array)) {
        //Type 0 ask, 1 bid
        var orderList = [];
        var newIndex = 0;
        orderList = orderData;
        newIndex = orderData.length;
        if (Type == 0) {
            this.buyIndex.set(tokenName, newIndex);
            this.buyList.set(tokenName, orderList);
        } else if (Type == 1) {
            this.sellIndex.set(tokenName, newIndex);
            this.sellList.set(tokenName, orderList);
        }
        return 'success';
    }
}
//Import Line
Token.prototype.importLine = function(tokenName, lineData) {
    if (this._isOwner() && (typeof lineData == 'object') && (lineData instanceof Array)) {
        this.kLine.set(tokenName, lineData);
        return 'success';
    }
}

//GET Trade History
Token.prototype.historyOf = function(tokenName) {
    var _tokenName = tokenName || "NAS";
    let history = this.tradeHistory.get(_tokenName);
    if (!history) {
        history = [];
    }
    return history;
}
//market
Token.prototype.marketList = function(tokenName, Address) {
    var _tokenName = tokenName || "NAS";
    let sellList = this.sellList.get(_tokenName);
    let buyList = this.buyList.get(_tokenName);
    if (!buyList) {
        buyList = {};
    }
    if (!sellList) {
        sellList = {};
    }
    let line = this.line(_tokenName);
    let balance = this.balanceOf(Address, _tokenName);
    let price = this.price(_tokenName);
    let info = this.tokens(_tokenName);
    let history = this.historyOf(_tokenName);

    return {
        info: info,
        price: price,
        history: history,
        balance: balance,
        line: line,
        bid: buyList,
        ask: sellList
    };
}
// reset
Token.prototype.resetOrder = function(tokenName) {
    var _tokenName = tokenName || "NAS";
    if (this._isAdmin()) {
        var askInfo = [];
        var bidInfo = [];
        let _time = Date.now();
        let maxIndex = this.maxList.get(_tokenName);
        if (isNaN(maxIndex) || !maxIndex) {
            maxIndex = 500;
        } else {
            maxIndex = parseInt(maxIndex);
        }
        //reset Buy
        var List = this.buyList.get(_tokenName);
        var newList = [];
        var newIndex = 0;
        for (var i in List) {
            if (List[i] && (List[i].status == 0)) {
                newList[newIndex] = List[i];
                newIndex++;
            }
        }
        this.buyIndex.set(_tokenName, newIndex);
        this.buyList.set(_tokenName, newList);

        if (newList.length > 0) {
            newList.sort(byd('price', by('orderId')));
            List = newList;
            newList = [];
            newIndex = 0;
            for (var i in List) {
                if (List[i].status == 0) {
                    if (newIndex < maxIndex) {
                        bidInfo.push({
                            data: List[i],
                            i: i,
                            index: newIndex
                        });
                        newList[newIndex] = List[i];
                        newIndex++;
                    } else {
                        let _message = this.messages.get(List[i].address);
                        if (!_message) {
                            _message = [];
                        }

                        if (new BigNumber(List[i].freezeToken).gt(0)) {

                            let orderWallet = this.balances.get(List[i].address);
                            if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                            } else if (orderWallet) {
                                var orderBalance = new BigNumber(0);
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            } else {
                                var orderBalance = new BigNumber(0);
                                orderWallet = {};
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }

                            orderWallet[_tokenName] = {
                                balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                            };
                            this.balances.set(List[i].address, orderWallet);

                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + new BigNumber(List[i].freezeToken) + ' ' + _tokenName + '.'
                            });

                        }

                        if (new BigNumber(List[i].freezeNAS).gt(0.99)) {
                            var result = Blockchain.transfer(List[i].address, new BigNumber(List[i].freezeNAS).sub(0.03).mul(new BigNumber(10).pow(18)));
                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                            });
                        }

                        this.messages.set(List[i].address, _message);
                    }
                }
            }

            this.buyIndex.set(_tokenName, newIndex);
            this.buyList.set(_tokenName, newList);
        }

        //reset Sell
        var List = this.sellList.get(_tokenName);
        var newList = [];
        var newIndex = 0;
        for (var i in List) {
            if (List[i] && (List[i].status == 0)) {
                newList[newIndex] = List[i];
                newIndex++;
            }
        }
        this.sellIndex.set(_tokenName, newIndex);
        this.sellList.set(_tokenName, newList);

        if (newList.length > 0) {
            newList.sort(by('price', by('orderId')));
            List = newList;
            newList = [];
            newIndex = 0;
            for (var i in List) {
                if (List[i].status == 0) {
                    if (newIndex < maxIndex) {
                        askInfo.push({
                            data: List[i],
                            i: i,
                            index: newIndex
                        });
                        newList[newIndex] = List[i];
                        newIndex++;
                    } else {
                        let _message = this.messages.get(List[i].address);
                        if (!_message) {
                            _message = [];
                        }

                        if (new BigNumber(List[i].freezeToken).gt(0)) {

                            let orderWallet = this.balances.get(List[i].address);
                            if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                            } else if (orderWallet) {
                                var orderBalance = new BigNumber(0);
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            } else {
                                var orderBalance = new BigNumber(0);
                                orderWallet = {};
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }

                            orderWallet[_tokenName] = {
                                balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                            };
                            this.balances.set(List[i].address, orderWallet);

                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + new BigNumber(List[i].freezeToken) + ' ' + _tokenName + '.'
                            });

                        }

                        if (new BigNumber(List[i].freezeNAS).gt(0.99)) {
                            var result = Blockchain.transfer(List[i].address, new BigNumber(List[i].freezeNAS).sub(0.03).mul(new BigNumber(10).pow(18)));
                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                            });
                        }

                        this.messages.set(List[i].address, _message);
                    }
                }
            }

            this.sellIndex.set(_tokenName, newIndex);
            this.sellList.set(_tokenName, newList);
        }

        return {
            ask: askInfo,
            bid: bidInfo
        };
    }
}
//Action Cancel
Token.prototype.cancelOrder = function(tokenName, hash, type) {
    var _tokenName = tokenName || "NAS";
    let maxIndex = this.maxList.get(_tokenName);
    if (isNaN(maxIndex) || !maxIndex) {
        maxIndex = 500;
    } else {
        maxIndex = parseInt(maxIndex);
    }
    if (type == 'bid') {
        let List = this.buyList.get(_tokenName);
        if (!List) {
            throw new Error("invalid order.");
        } else {
            let newList = {};
            let newIndex = 0;
            let _time = Date.now();
            var hasD = false;
            for (var i in List) {
                if (List[i].status == 0) {
                    if (newIndex < maxIndex) {
                        if (((Blockchain.transaction.from == List[i].address) || (this._isOwner())) && (List[i].hash !== "") && (List[i].hash == hash)) {
                            hasD = true;
                            if (new BigNumber(List[i].freezeToken).gt(0)) {
                                let orderWallet = this.balances.get(List[i].address);
                                if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                    var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                                } else if (orderWallet) {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(List[i].address, orderWallet);
                                } else {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet = {};
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(List[i].address, orderWallet);
                                }

                                orderWallet[_tokenName] = {
                                    balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }
                            if (new BigNumber(List[i].freezeNAS).gt(0.1)) {
                                let _message = this.messages.get(List[i].address);
                                if (!_message) {
                                    _message = [];
                                }
                                var result = Blockchain.transfer(List[i].address, (new BigNumber(List[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                                _message.push({
                                    date: _time,
                                    msg: 'Order cancel, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                                });
                                this.messages.set(List[i].address, _message);
                            }
                        } else {
                            newList[newIndex] = List[i];
                            newIndex++;
                        }
                    } else {
                        //refund  > MaxOrders
                        let _message = this.messages.get(List[i].address);
                        if (!_message) {
                            _message = [];
                        }
                        if (new BigNumber(List[i].freezeToken).gt(0)) {
                            let orderWallet = this.balances.get(List[i].address);
                            if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                            } else if (orderWallet) {
                                var orderBalance = new BigNumber(0);
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            } else {
                                var orderBalance = new BigNumber(0);
                                orderWallet = {};
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }

                            orderWallet[_tokenName] = {
                                balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                            };
                            this.balances.set(List[i].address, orderWallet);

                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + new BigNumber(List[i].freezeToken) + ' ' + _tokenName + '.'
                            });
                        }
                        if (new BigNumber(List[i].freezeNAS).gt(0.1)) {
                            var result = Blockchain.transfer(List[i].address, (new BigNumber(List[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                            });
                        }

                        this.messages.set(List[i].address, _message);
                    }
                }
            }
            if (hasD) {
                this.buyIndex.set(_tokenName, newIndex);
                this.buyList.set(_tokenName, newList);
                return "success";
            }
        }
        throw new Error("failed.");
    } else if (type == 'ask') {
        let List = this.sellList.get(_tokenName);
        if (!List) {
            throw new Error("invalid order.");
        } else {
            let newList = {};
            let newIndex = 0;
            let _time = Date.now();
            for (var i in List) {
                if (List[i].status == 0) {
                    if (newIndex < maxIndex) {
                        if (((Blockchain.transaction.from == List[i].address) || (this._isOwner())) && (List[i].hash != "") && (List[i].hash == hash)) {
                            if (new BigNumber(List[i].freezeToken).gt(0)) {
                                let orderWallet = this.balances.get(List[i].address);
                                if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                    var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                                } else if (orderWallet) {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(List[i].address, orderWallet);
                                } else {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet = {};
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(List[i].address, orderWallet);
                                }

                                orderWallet[_tokenName] = {
                                    balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }
                            if (new BigNumber(List[i].freezeNAS).gt(0.1)) {
                                let _message = this.messages.get(List[i].address);
                                if (!_message) {
                                    _message = [];
                                }
                                var result = Blockchain.transfer(List[i].address, (new BigNumber(List[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                                _message.push({
                                    date: _time,
                                    msg: 'Order cancel, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                                });
                                this.messages.set(List[i].address, _message);
                            }
                        } else {
                            newList[newIndex] = List[i];
                            newIndex++;
                        }
                    } else {
                        //refund  > MaxOrders
                        let _message = this.messages.get(List[i].address);
                        if (!_message) {
                            _message = [];
                        }
                        if (new BigNumber(List[i].freezeToken).gt(0)) {
                            let orderWallet = this.balances.get(List[i].address);
                            if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                            } else if (orderWallet) {
                                var orderBalance = new BigNumber(0);
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            } else {
                                var orderBalance = new BigNumber(0);
                                orderWallet = {};
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(List[i].address, orderWallet);
                            }

                            orderWallet[_tokenName] = {
                                balance: orderBalance.add(new BigNumber(List[i].freezeToken))
                            };
                            this.balances.set(List[i].address, orderWallet);

                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + new BigNumber(List[i].freezeToken) + ' ' + _tokenName + '.'
                            });
                        }
                        if (new BigNumber(List[i].freezeNAS).gt(0.1)) {
                            var result = Blockchain.transfer(List[i].address, (new BigNumber(List[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + (new BigNumber(List[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                            });
                        }

                        this.messages.set(List[i].address, _message);
                    }
                }
            }

            this.sellIndex.set(_tokenName, newIndex);
            this.sellList.set(_tokenName, newList);
            return "success";
        }
        throw new Error("failed.");
    }
    throw new Error("failed.");
}
//Action Buy
Token.prototype.buy = function(tokenPrice, tokenAmount, tokenName, debug) {
    if (isNaN(tokenPrice) || isNaN(tokenAmount) || (parseFloat(tokenPrice) == 0) || (parseFloat(tokenAmount) == 0)) {
        throw new Error("invalid input.");
    }
    var debugInfo = '';
    var senderAddress = Blockchain.transaction.from;
    var _tokenName = tokenName || "NAS";
    let token = this.tokens(_tokenName);
    if (token) {
        if ((token.approve != 1) && !(this._isOwner())) {
            throw new Error("invalid token.");
        }
    } else {
        throw new Error("invalid token.");
    }

    var _time = Date.now();
    let maxIndex = this.maxList.get(_tokenName);
    if (isNaN(maxIndex) || !maxIndex) {
        maxIndex = 500;
    } else {
        maxIndex = parseInt(maxIndex);
    }

    //Min NAS
    let minBalance = new BigNumber(0.2);
    var senderBalance = new BigNumber(Blockchain.transaction.value || 0);
    if (senderBalance <= 0) {
        throw new Error("Minimum " + minBalance + " NAS");
    }
    senderBalance = senderBalance.div(new BigNumber(10).pow(18));
    if (senderBalance < minBalance) {
        throw new Error("Minimum " + minBalance + " NAS");
    }

    //Any Ex Token
    //var senderBalance = new BigNumber(wallet[_tokenName].balance || 0);
    //if(_tokenName == "NAS"){
    //    senderBalance = Blockchain.transaction.value;
    //    if (senderBalance.lt(new BigNumber(1.002).pow(15))) {
    //        throw new Error("Minimum 1 NAS");
    //    }
    //}else{
    //    if(!wallet || wallet[_tokenName] || isNumber(wallet[_tokenName].balance)){
    //        throw new Error("insufficient balance.");
    //    }
    //    senderBalance = new BigNumber(wallet[_tokenName].balance || 0);
    //}

    var price = new BigNumber(tokenPrice || 0);
    if (price.lt(0.00001)) {
        throw new Error("Price > 0.00001");
    }

    var _tokenAmount = new BigNumber(tokenAmount || 0);
    let MinAmount = minBalance.div(price);
    if (_tokenAmount.lt(MinAmount)) {
        throw new Error("Minimum " + minBalance + " NAS");
    }

    //NAS
    var senderFee = new BigNumber(0.002);
    var totalAmount = _tokenAmount.mul(price).mul(senderFee).add(_tokenAmount.mul(price));
    if (token) {
        senderFee = new BigNumber(token.fee || 0.002);
    }
    if (isNaN(senderFee) || (senderFee.gt(0.1))) {
        senderFee = new BigNumber(0.002);
    }
    var receiverFee = new BigNumber(1 - senderFee);
    if (senderBalance >= totalAmount) {

        //BUYER WALLET
        var wallet = this.balances.get(senderAddress);
        if (wallet && wallet[_tokenName] && isNumber(wallet[_tokenName].balance)) {
            var walletBalance = new BigNumber(wallet[_tokenName].balance);
        } else if (wallet) {
            var walletBalance = new BigNumber(0);
            wallet[_tokenName] = {
                balance: walletBalance
            };
            this.balances.set(senderAddress, wallet);
        } else {
            var walletBalance = new BigNumber(0);
            wallet = {};
            wallet[_tokenName] = {
                balance: walletBalance
            };
            this.balances.set(senderAddress, wallet);
        }

        //FEE WALLET
        var contractFeeToken = this.contractFee.get(_tokenName);
        if (!contractFeeToken) {
            contractFeeToken = new BigNumber(0);
            this.contractFee.set(_tokenName, contractFeeToken);
        }

        //FEE WALLET
        let contractFeeNAS = this.contractFee.get("NAS");
        if (!contractFeeNAS) {
            contractFeeNAS = new BigNumber(0);
            this.contractFee.set("NAS", contractFeeNAS);
        }

        //Buy Action
        let orderTotalAmount = new BigNumber(0);
        let validOrder = [];
        let destroyAmount = new BigNumber(0);
        let destroyNAS = new BigNumber(0);
        let _sellIndex = this.sellIndex.get(_tokenName);
        let _sellList = this.sellList.get(_tokenName);

        debugInfo = _tokenName + '|' + price + '|' + tokenAmount + '|' + totalAmount + '|' + senderBalance + '|' + receiverFee;

        if (_sellIndex) {
            if (_sellList) {
                let validIndex = 0;
                //apply for purchase
                for (var i = 0; i < _sellIndex; i++) {
                    if (_sellList[i]) {
                        if ((_sellList[i].time <= _time) && (_sellList[i].price <= price)) {
                            if (Blockchain.verifyAddress(_sellList[i].address)) {
                                validOrder[validIndex] = _sellList[i];
                                validOrder[validIndex].orderId = i;
                                orderTotalAmount = orderTotalAmount.add(_sellList[i].amount);
                                validIndex++;
                            }
                        }
                    }
                }
                if (orderTotalAmount.gt(0)) {
                    validOrder.sort(byd('price', by('orderId')));
                }
                if ((typeof debug == 'number') && this._isOwner() && (debug == 1)) {
                    return debug + '|' + debugInfo;
                }
            }
        }

        if (orderTotalAmount.gt(0)) {

            let actionPrice = price;
            let _tradeHistory = this.tradeHistory.get(_tokenName);
            if (!_tradeHistory) {
                _tradeHistory = [];
            }

            for (var i in validOrder) {
                if ((_tokenAmount.sub(destroyAmount)) <= 0) {
                    break;
                }

                let needAmount = _tokenAmount.sub(destroyAmount);
                //SELL < BUY
                if (new BigNumber(validOrder[i].amount).lt(0)) {
                    //Mark Order

                    _sellList[validOrder[i].orderId].status = 1;
                    _sellList[validOrder[i].orderId].freezeToken = 0;
                    _sellList[validOrder[i].orderId].freezeNAS = 0;
                    this.sellList.set(_tokenName, _sellList);

                    if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                        return debug + '|1|' + validOrder[i].amount;
                    }

                } else if (needAmount.gt(new BigNumber(validOrder[i].amount))) {
                    this.lastPrice.set(_tokenName, new BigNumber(validOrder[i].price));
                    _tradeHistory.push({
                        time: _time,
                        type: 'bid',
                        price: new BigNumber(validOrder[i].price),
                        amount: new BigNumber(validOrder[i].amount)
                    });

                    //BUY NAS
                    let NASAmount = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee.add(1));
                    //BUY NAS
                    destroyNAS = destroyNAS.add(NASAmount);

                    //Buyer Get Token
                    walletBalance = walletBalance.add(validOrder[i].amount);
                    wallet[_tokenName] = {
                        balance: walletBalance
                    };
                    this.balances.set(senderAddress, wallet);

                    //CREATE LOG
                    this._notify("Transfer", {
                        "from": validOrder[i].address,
                        "to": senderAddress,
                        "symbol": _tokenName,
                        "value": validOrder[i].amount
                    });

                    //BUY FEE
                    let orderFee = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee);
                    contractFeeToken = new BigNumber(contractFeeToken).add(orderFee);
                    this.contractFee.set(_tokenName, contractFeeToken);

                    //CREATE LOG
                    var _param = {
                        time: _time,
                        price: validOrder[i].price,
                        amount: validOrder[i].amount,
                        total: (new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount))),
                        fee: orderFee,
                        symbol: _tokenName,
                        type: 'bid',
                        status: 1
                    };

                    var _myLog = this.transfers.get(senderAddress);
                    if (!_myLog) {
                        _myLog = [];
                    }
                    _myLog.push(_param);
                    this.transfers.set(senderAddress, _myLog);

                    //Mark Order
                    _sellList[validOrder[i].orderId].status = 1;
                    _sellList[validOrder[i].orderId].freezeToken = 0;
                    _sellList[validOrder[i].orderId].freezeNAS = 0;
                    this.sellList.set(_tokenName, _sellList);

                    if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                        return debug + '|2|' + validOrder[i].amount;
                    }

                    //SELL FEE
                    let NASFee = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee);
                    contractFeeNAS = new BigNumber(contractFeeNAS).add(NASFee);
                    this.contractFee.set("NAS", contractFeeNAS);

                    //CREATE LOG
                    var _param = {
                        time: _time,
                        price: validOrder[i].price,
                        amount: validOrder[i].amount,
                        total: (new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount))),
                        fee: NASFee,
                        symbol: _tokenName,
                        type: 'ask',
                        status: 1
                    };

                    var _myLog = this.transfers.get(validOrder[i].address);
                    if (!_myLog) {
                        _myLog = [];
                    }
                    _myLog.push(_param);
                    this.transfers.set(validOrder[i].address, _myLog);

                    //sell get nas
                    NASAmount = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(receiverFee);
                    var result = Blockchain.transfer(validOrder[i].address, NASAmount.mul(new BigNumber(10).pow(18)));

                    let _message = this.messages.get(validOrder[i].address);
                    if (!_message) {
                        _message = [];
                    }
                    _message.push({
                        date: _time,
                        msg: 'Transaction, +' + NASAmount + " NAS. Code:" + JSON.stringify(result)
                    });
                    this.messages.set(validOrder[i].address, _message);

                    //CREATE LOG
                    this._notify("Transfer", {
                        "from": Blockchain.transaction.from,
                        "to": validOrder[i].address,
                        "symbol": "NAS",
                        "value": NASAmount
                    });

                    actionPrice = new BigNumber(validOrder[i].price);
                    destroyAmount = destroyAmount.add(new BigNumber(validOrder[i].amount));

                    if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                        return debug + '|3|' + validOrder[i].amount + '|' + actionPrice + '|' + destroyAmount;
                    }

                } else if (needAmount.gt(new BigNumber(0))) {
                    this.lastPrice.set(_tokenName, new BigNumber(validOrder[i].price));

                    let currAmount = needAmount;
                    _tradeHistory.push({
                        time: _time,
                        type: 'bid',
                        price: new BigNumber(validOrder[i].price),
                        amount: new BigNumber(currAmount)
                    });

                    //BUY NAS
                    let NASAmount = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee.add(1));
                    //BUY NAS
                    destroyNAS = destroyNAS.add(NASAmount);

                    //BUY GET TOKEN
                    walletBalance = walletBalance.add(currAmount);
                    wallet[_tokenName] = {
                        balance: walletBalance
                    };
                    this.balances.set(senderAddress, wallet);

                    //CREAT LOG
                    this._notify("Transfer", {
                        "from": validOrder[i].address,
                        "to": senderAddress,
                        "symbol": _tokenName,
                        "value": currAmount
                    });

                    //BUY FEE
                    let orderFee = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee);
                    contractFeeToken = new BigNumber(contractFeeToken).add(orderFee);
                    this.contractFee.set(_tokenName, contractFeeToken);

                    //CREATE LOG
                    var _param = {
                        time: _time,
                        price: validOrder[i].price,
                        amount: currAmount,
                        total: (new BigNumber(validOrder[i].price).mul(currAmount)),
                        fee: orderFee,
                        symbol: _tokenName,
                        type: 'bid',
                        status: 1
                    };

                    var _myLog = this.transfers.get(senderAddress);
                    if (!_myLog) {
                        _myLog = [];
                    }
                    _myLog.push(_param);
                    this.transfers.set(senderAddress, _myLog);

                    if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                        return debug + '|4|' + validOrder[i].amount + '|' + currAmount;
                    }

                    //CHANGE AMOUNT
                    if ((new BigNumber(validOrder[i].amount).sub(currAmount)).lt(0.1)) {
                        _sellList[validOrder[i].orderId].status = 1;
                        _sellList[validOrder[i].orderId].freezeToken = 0;
                        _sellList[validOrder[i].orderId].freezeNAS = 0;
                        this.sellList.set(_tokenName, _sellList);

                        destroyAmount = _tokenAmount;
                    } else {
                        _sellList[validOrder[i].orderId].amount = new BigNumber(validOrder[i].amount).sub(currAmount);
                        _sellList[validOrder[i].orderId].freezeToken = _sellList[validOrder[i].orderId].amount;
                        _sellList[validOrder[i].orderId].freezeNAS = 0;
                        this.sellList.set(_tokenName, _sellList);

                        destroyAmount = destroyAmount.add(new BigNumber(currAmount));
                    }

                    //SELL FEE
                    let NASFee = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee);
                    contractFeeNAS = new BigNumber(contractFeeNAS).add(NASFee);
                    this.contractFee.set("NAS", contractFeeNAS);

                    //CREATE LOG
                    var _param = {
                        time: _time,
                        price: validOrder[i].price,
                        amount: currAmount,
                        total: (new BigNumber(validOrder[i].price).mul(currAmount)),
                        fee: NASFee,
                        symbol: _tokenName,
                        type: 'ask',
                        status: 1
                    };

                    var _myLog = this.transfers.get(validOrder[i].address);
                    if (!_myLog) {
                        _myLog = [];
                    }
                    _myLog.push(_param);
                    this.transfers.set(validOrder[i].address, _myLog);

                    //SELLER GET NAS
                    NASAmount = new BigNumber(validOrder[i].price).mul(currAmount).mul(receiverFee);
                    var result = Blockchain.transfer(validOrder[i].address, NASAmount.mul(new BigNumber(10).pow(18)));

                    let _message = this.messages.get(validOrder[i].address);
                    if (!_message) {
                        _message = [];
                    }
                    _message.push({
                        date: _time,
                        msg: 'Transaction, +' + NASAmount + " NAS. Code:" + JSON.stringify(result)
                    });
                    this.messages.set(validOrder[i].address, _message);

                    //CREATE ORDER
                    this._notify("Transfer", {
                        "from": Blockchain.transaction.from,
                        "to": validOrder[i].address,
                        "symbol": "NAS",
                        "value": NASAmount
                    });

                    actionPrice = new BigNumber(validOrder[i].price);

                    if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                        return debug + '|4|' + validOrder[i].amount + '|' + currAmount + '|' + actionPrice;
                    }
                }
            }
            let j = 0;
            let __tradeHistory = [];
            for (var i = (_tradeHistory.length - 1); i >= 0; i--) {
                if (j >= 50) {
                    break;
                }
                __tradeHistory[j] = _tradeHistory[i];
                j++;
            }
            this.tradeHistory.set(_tokenName, __tradeHistory);
            if (typeof debug == 'undefined') {
                this._kline(_tokenName, actionPrice, destroyAmount);
            }
        }

        //Sell List
        if (_sellIndex) {
            if (_sellList) {
                let newList = {};
                let newIndex = 0;
                for (var i = 0; i < _sellIndex; i++) {
                    if (_sellList[i].status == 0) {
                        if (newIndex < maxIndex) {
                            newList[newIndex] = _sellList[i];
                            newIndex++;
                        } else {
                            //refund  > MaxOrders
                            let _message = this.messages.get(_sellList[i].address);
                            if (!_message) {
                                _message = [];
                            }
                            if (new BigNumber(_sellList[i].freezeToken).gt(0)) {
                                let orderWallet = this.balances.get(_sellList[i].address);
                                if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                    var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                                } else if (orderWallet) {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(_sellList[i].address, orderWallet);
                                } else {
                                    var orderBalance = new BigNumber(0);
                                    orderWallet = {};
                                    orderWallet[_tokenName] = {
                                        balance: orderBalance
                                    };
                                    this.balances.set(_sellList[i].address, orderWallet);
                                }

                                orderWallet[_tokenName] = {
                                    balance: orderBalance.add(new BigNumber(_sellList[i].freezeToken))
                                };
                                this.balances.set(_sellList[i].address, orderWallet);

                                _message.push({
                                    date: _time,
                                    msg: 'Order invalidation, refund +' + new BigNumber(_sellList[i].freezeToken) + ' ' + _tokenName + '.'
                                });
                            }
                            if (new BigNumber(_sellList[i].freezeNAS).gt(0.2)) {
                                var result = Blockchain.transfer(_sellList[i].address, (new BigNumber(_sellList[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                                _message.push({
                                    date: _time,
                                    msg: 'Order invalidation, refund +' + (new BigNumber(_sellList[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                                });
                            }
                            this.messages.set(_sellList[i].address, _message);
                        }
                    }
                }
                this.sellIndex.set(_tokenName, newIndex);
                this.sellList.set(_tokenName, newList);
            }
        }

        //return Date.now();

        let lastAmount = _tokenAmount.sub(destroyAmount);
        let _Balance = senderBalance.sub(destroyNAS);

        if ((typeof debug == 'number') && this._isOwner() && (debug == 3)) {
            return debug + '|' + lastAmount + '|' + _Balance;
        }

        if ((parseInt(lastAmount) > 0) && (parseFloat(_Balance) > 0.1)) {
            //Buy Order
            if (_Balance >= minBalance) {
                let buyIndex = this.buyIndex.get(_tokenName);
                if (!buyIndex) {
                    buyIndex = 0;
                }

                var param = {
                    orderId: buyIndex,
                    address: Blockchain.transaction.from,
                    amount: new BigNumber(lastAmount),
                    price: price,
                    time: _time,
                    tokenName: _tokenName,
                    freezeToken: 0,
                    freezeNAS: _Balance,
                    status: 0,
                    hash: Blockchain.transaction.hash
                };
                var markOrder = new Order(param);
                let buyList = this.buyList.get(_tokenName);
                if (!buyList) {
                    buyList = {};
                }
                buyList[buyIndex] = markOrder;

                this.buyList.set(_tokenName, buyList);
                this.buyIndex.set(_tokenName, (buyIndex + 1));

                if ((typeof debug == 'number') && this._isOwner() && (debug == 4)) {
                    return debug + '|' + new BigNumber(lastAmount) + '|' + price;
                }

            } else {
                if (_Balance >= 0.1) {
                    let _message = this.messages.get(Blockchain.transaction.from);
                    if (!_message) {
                        _message = [];
                    }
                    var result = Blockchain.transfer(Blockchain.transaction.from, _Balance.sub(0.03).mul(new BigNumber(10).pow(18)));
                    _message.push({
                        date: _time,
                        msg: 'Order cancel, refund +' + _Balance + " NAS. Code:" + JSON.stringify(result)
                    });
                    this.messages.set(Blockchain.transaction.from, _message);
                }
            }
        } else {
            if (parseFloat(_Balance) > 0) {
                if (_Balance >= 0.1) {
                    let _message = this.messages.get(Blockchain.transaction.from);
                    if (!_message) {
                        _message = [];
                    }
                    var result = Blockchain.transfer(Blockchain.transaction.from, _Balance.sub(0.03).mul(new BigNumber(10).pow(18)));
                    _message.push({
                        date: _time,
                        msg: 'Order cancel, refund +' + _Balance + " NAS. Code:" + JSON.stringify(result)
                    });
                    this.messages.set(Blockchain.transaction.from, _message);
                }
            }
        }
        return "success";
    } else {
        throw new Error("transfer failed. " + senderBalance + " < " + totalAmount);
    }
};
//Action Sell
Token.prototype.sell = function(tokenPrice, tokenAmount, tokenName, debug) {
    if (isNaN(tokenPrice) || isNaN(tokenAmount) || (parseFloat(tokenPrice) == 0) || (parseFloat(tokenAmount) == 0)) {
        throw new Error("invalid input.");
    }
    var debugInfo = '';
    var senderAddress = Blockchain.transaction.from;
    var _tokenName = tokenName || "NAS";
    let token = this.tokens(_tokenName);
    if (token) {
        if ((token.approve != 1) && !(this._isOwner())) {
            throw new Error("invalid token.");
        }
    } else {
        throw new Error("invalid token.");
    }

    var price = new BigNumber(tokenPrice || 0);
    if (price.lt(0.00001)) {
        throw new Error("Price > 0.00001");
    }

    var wallet = this.balances.get(senderAddress);
    if (wallet && wallet[_tokenName] && isNumber(wallet[_tokenName].balance)) {
        var senderBalance = new BigNumber(wallet[_tokenName].balance);
    } else if (wallet) {
        var senderBalance = new BigNumber(0);
        wallet[_tokenName] = {
            balance: senderBalance
        };
        this.balances.set(senderAddress, wallet);
    } else {
        var senderBalance = new BigNumber(0);
        wallet = {};
        wallet[_tokenName] = {
            balance: senderBalance
        };
        this.balances.set(senderAddress, wallet);
    }

    var _tokenAmount = new BigNumber(tokenAmount || 0);
    if (senderBalance.lt(_tokenAmount)) {
        throw new Error("insufficient balance.");
    }

    let maxIndex = this.maxList.get(_tokenName);
    if (isNaN(maxIndex) || !maxIndex) {
        maxIndex = 500;
    } else {
        maxIndex = parseInt(maxIndex);
    }

    //Min NAS
    let minNAS = new BigNumber(0.2); //1.002
    let transNAS = price.mul(_tokenAmount);
    let MinAmount = new BigNumber(parseInt(minNAS / _tokenAmount) + 1);
    if (minNAS.gt(transNAS)) {
        throw new Error("Minimum " + minNAS + " NAS.[" + minNAS + "|" + transNAS + "|" + MinAmount + "]");
    }

    wallet[_tokenName] = {
        balance: senderBalance.sub(_tokenAmount)
    };
    this.balances.set(senderAddress, wallet);


    //FEE AMOUNT
    var senderFee = new BigNumber(0.002);
    if (token) {
        senderFee = new BigNumber(token.fee || 0.002);
    }

    if (isNaN(senderFee) || (senderFee.gt(0.1))) {
        senderFee = 0.002;
    }
    var receiverFee = 1 - senderFee;

    //GET TOKEN Fee
    var contractFeeToken = this.contractFee.get(_tokenName);
    if (!contractFeeToken) {
        contractFeeToken = new BigNumber(0);
        this.contractFee.set(_tokenName, contractFeeToken);
    }

    //Get NAS Fee
    let contractFeeNAS = this.contractFee.get("NAS");
    if (!contractFeeNAS) {
        contractFeeNAS = new BigNumber(0);
        this.contractFee.set("NAS", contractFeeNAS);
    }

    //Sell Action
    let orderTotalAmount = new BigNumber(0);
    let validOrder = [];
    let destroyAmount = new BigNumber(0);
    let destroyNAS = new BigNumber(0);
    let _buyIndex = this.buyIndex.get(_tokenName);
    let _buyList = this.buyList.get(_tokenName);
    var _time = Date.now();

    debugInfo = _tokenName + '|' + price + '|' + _tokenAmount + '|' + transNAS + '|' + senderBalance + '|' + receiverFee;

    if (_buyIndex) {
        if (_buyList) {
            let validIndex = 0;
            //apply for purchase
            for (var i = 0; i < _buyIndex; i++) {
                if ((_buyList[i].time <= _time) && (_buyList[i].price >= price)) {
                    if (Blockchain.verifyAddress(_buyList[i].address)) {
                        validOrder[validIndex] = _buyList[i];
                        validOrder[validIndex].orderId = i;
                        orderTotalAmount = orderTotalAmount.add(_buyList[i].amount);
                        validIndex++;
                    }
                }
            }
            if (orderTotalAmount.gt(0)) {
                validOrder.sort(by('price', by('orderId')));
            }
            if ((typeof debug == 'number') && this._isOwner() && (debug == 1)) {
                return debug + '|' + debugInfo;
            }
        }
    }

    if (orderTotalAmount.gt(0)) {
        let actionPrice = price;

        let _tradeHistory = this.tradeHistory.get(_tokenName);
        if (!_tradeHistory) {
            _tradeHistory = [];
        }

        for (var i in validOrder) {
            if ((_tokenAmount.sub(destroyAmount)) <= 0) {
                break;
            }
            //Sell > Buy
            let needAmount = _tokenAmount.sub(destroyAmount);
            if (new BigNumber(validOrder[i].amount).lt(new BigNumber(0.02))) {
                //Mark Order
                _buyList[validOrder[i].orderId].status = 1;
                _buyList[validOrder[i].orderId].freezeToken = 0;
                _buyList[validOrder[i].orderId].freezeNAS = 0;
                this.buyList.set(_tokenName, _buyList);

                if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                    return debug + '|1|' + validOrder[i].amount;
                }

            } else if (needAmount.gt(new BigNumber(validOrder[i].amount))) {
                this.lastPrice.set(_tokenName, new BigNumber(validOrder[i].price));
                _tradeHistory.push({
                    time: _time,
                    type: 'ask',
                    price: new BigNumber(validOrder[i].price),
                    amount: new BigNumber(validOrder[i].amount)
                });

                //BUYER NAS
                let NASAmount = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee.add(1));
                //BUYER NAS
                destroyNAS = destroyNAS.add(NASAmount);

                //BUYER GET TOKEN
                let receiverWallet = this.balances.get(validOrder[i].address);
                if (receiverWallet && receiverWallet[_tokenName] && isNumber(receiverWallet[_tokenName].balance)) {
                    var receiverBalance = new BigNumber(receiverWallet[_tokenName].balance);
                } else if (receiverWallet) {
                    var receiverBalance = new BigNumber(0);
                    receiverWallet[_tokenName] = {
                        balance: receiverBalance
                    };
                    this.balances.set(validOrder[i].address, receiverWallet);
                } else {
                    var receiverBalance = new BigNumber(0);
                    receiverWallet = {};
                    receiverWallet[_tokenName] = {
                        balance: receiverBalance
                    };
                    this.balances.set(validOrder[i].address, receiverWallet);
                }

                receiverBalance = receiverBalance.add(validOrder[i].amount);
                receiverWallet[_tokenName] = {
                    balance: receiverBalance
                };
                this.balances.set(validOrder[i].address, receiverWallet);

                //CREATE ORDER LOG
                this._notify("Transfer", {
                    "from": senderAddress,
                    "to": validOrder[i].address,
                    "symbol": _tokenName,
                    "value": validOrder[i].amount
                });

                //BUYER FEE
                let orderFee = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee);
                contractFeeToken = new BigNumber(contractFeeToken).add(orderFee);
                this.contractFee.set(_tokenName, contractFeeToken);

                //CREATE LOG
                var _param = {
                    time: _time,
                    price: validOrder[i].price,
                    amount: validOrder[i].amount,
                    total: (new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount))),
                    fee: orderFee,
                    symbol: _tokenName,
                    type: 'bid',
                    status: 1
                };

                var _myLog = this.transfers.get(validOrder[i].address);
                if (!_myLog) {
                    _myLog = [];
                }
                _myLog.push(_param);
                this.transfers.set(validOrder[i].address, _myLog);

                //BUY SUCCESS
                _buyList[validOrder[i].orderId].status = 1;
                _buyList[validOrder[i].orderId].freezeToken = 0;
                _buyList[validOrder[i].orderId].freezeNAS = 0;
                this.buyList.set(_tokenName, _buyList);

                if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                    return debug + '|2|' + validOrder[i].amount;
                }

                //SELL FEE
                let NASFee = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(senderFee);
                contractFeeNAS = new BigNumber(contractFeeNAS).add(NASFee);
                this.contractFee.set("NAS", contractFeeNAS);

                //CREATE LOG
                var _param = {
                    time: _time,
                    price: validOrder[i].price,
                    amount: validOrder[i].amount,
                    total: (new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount))),
                    fee: NASFee,
                    symbol: _tokenName,
                    type: 'ask',
                    status: 1
                };

                var _myLog = this.transfers.get(senderAddress);
                if (!_myLog) {
                    _myLog = [];
                }
                _myLog.push(_param);
                this.transfers.set(senderAddress, _myLog);

                //SELLER GET NAS
                NASAmount = new BigNumber(validOrder[i].price).mul(new BigNumber(validOrder[i].amount)).mul(receiverFee);
                var result = Blockchain.transfer(senderAddress, NASAmount.mul(new BigNumber(10).pow(18)));

                let _message = this.messages.get(senderAddress);
                if (!_message) {
                    _message = [];
                }
                _message.push({
                    date: _time,
                    msg: 'Transaction, +' + NASAmount + " NAS. Code:" + JSON.stringify(result)
                });
                this.messages.set(senderAddress, _message);

                //CREATE ORDER LOG
                this._notify("Transfer", {
                    "from": validOrder[i].address,
                    "to": senderAddress,
                    "symbol": "NAS",
                    "value": NASAmount
                });

                actionPrice = new BigNumber(validOrder[i].price);
                destroyAmount = destroyAmount.add(new BigNumber(validOrder[i].amount));

                if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                    return debug + '|3|' + validOrder[i].amount + '|' + actionPrice + '|' + destroyAmount;
                }

            } else if (needAmount.gt(new BigNumber(0))) {

                this.lastPrice.set(_tokenName, new BigNumber(validOrder[i].price));
                let currAmount = needAmount;
                _tradeHistory.push({
                    time: _time,
                    type: 'ask',
                    price: new BigNumber(validOrder[i].price),
                    amount: new BigNumber(currAmount)
                });

                //Buyer NAS
                let NASAmount = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee.add(1));
                //Buyer NAS
                destroyNAS = destroyNAS.add(NASAmount);

                //Buyer Get Token
                let receiverWallet = this.balances.get(validOrder[i].address);
                if (receiverWallet && receiverWallet[_tokenName] && isNumber(receiverWallet[_tokenName].balance)) {
                    var receiverBalance = new BigNumber(receiverWallet[_tokenName].balance);
                } else if (receiverWallet) {
                    var receiverBalance = new BigNumber(0);
                    receiverWallet[_tokenName] = {
                        balance: receiverBalance
                    };
                    this.balances.set(validOrder[i].address, receiverWallet);
                } else {
                    var receiverBalance = new BigNumber(0);
                    receiverWallet = {};
                    receiverWallet[_tokenName] = {
                        balance: receiverBalance
                    };
                    this.balances.set(validOrder[i].address, receiverWallet);
                }

                receiverBalance = receiverBalance.add(currAmount);
                receiverWallet[_tokenName] = {
                    balance: receiverBalance
                };
                this.balances.set(validOrder[i].address, receiverWallet);

                //CREAT ORDER LOG
                this._notify("Transfer", {
                    "from": senderAddress,
                    "to": validOrder[i].address,
                    "symbol": _tokenName,
                    "value": currAmount
                });

                //BUYER FEE
                let orderFee = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee);
                contractFeeToken = new BigNumber(contractFeeToken).add(orderFee);
                this.contractFee.set(_tokenName, contractFeeToken);

                //CREATE ORDER
                var _param = {
                    time: _time,
                    price: validOrder[i].price,
                    amount: currAmount,
                    total: (new BigNumber(validOrder[i].price).mul(currAmount)),
                    fee: orderFee,
                    symbol: _tokenName,
                    type: 'bid',
                    status: 1
                };

                var _myLog = this.transfers.get(validOrder[i].address);
                if (!_myLog) {
                    _myLog = [];
                }
                _myLog.push(_param);
                this.transfers.set(validOrder[i].address, _myLog);

                if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                    return debug + '|4|' + validOrder[i].amount + '|' + currAmount;
                }

                //CHANGE AMOUNT
                if ((new BigNumber(validOrder[i].amount).sub(currAmount)).lt(0.1)) {
                    _buyList[validOrder[i].orderId].status = 1;
                    _buyList[validOrder[i].orderId].freezeToken = 0;
                    _buyList[validOrder[i].orderId].freezeNAS = 0;
                    this.buyList.set(_tokenName, _buyList);

                    destroyAmount = _tokenAmount;
                } else {
                    _buyList[validOrder[i].orderId].amount = new BigNumber(validOrder[i].amount).sub(currAmount);
                    _buyList[validOrder[i].orderId].freezeToken = 0;
                    _buyList[validOrder[i].orderId].freezeNAS = new BigNumber(validOrder[i].freezeNAS).sub(new BigNumber(validOrder[i].price).mul(currAmount)).sub(orderFee);
                    if (new BigNumber(_buyList[validOrder[i].orderId].freezeNAS).lt(0)) {
                        _buyList[validOrder[i].orderId].status = 1;
                        _buyList[validOrder[i].orderId].freezeToken = 0;
                        _buyList[validOrder[i].orderId].freezeNAS = 0;

                        destroyAmount = _tokenAmount;
                    } else {
                        destroyAmount = destroyAmount.add(currAmount);
                    }
                    this.buyList.set(_tokenName, _buyList);
                }
                //SELLER FEE
                let NASFee = new BigNumber(validOrder[i].price).mul(currAmount).mul(senderFee);
                contractFeeNAS = new BigNumber(contractFeeNAS).add(NASFee);
                this.contractFee.set("NAS", contractFeeNAS);

                //CREATE ORDER LOG
                var _param = {
                    time: _time,
                    price: validOrder[i].price,
                    amount: currAmount,
                    total: (new BigNumber(validOrder[i].price).mul(currAmount)),
                    fee: NASFee,
                    symbol: _tokenName,
                    type: 'ask',
                    status: 1
                };

                var _myLog = this.transfers.get(senderAddress);
                if (!_myLog) {
                    _myLog = [];
                }
                _myLog.push(_param);
                this.transfers.set(senderAddress, _myLog);

                //Seller Get Nas
                NASAmount = new BigNumber(validOrder[i].price).mul(currAmount).mul(receiverFee);
                var result = Blockchain.transfer(senderAddress, NASAmount.mul(new BigNumber(10).pow(18)));

                let _message = this.messages.get(validOrder[i].address);
                if (!_message) {
                    _message = [];
                }
                _message.push({
                    date: _time,
                    msg: 'Transaction, +' + NASAmount + " NAS. Code:" + JSON.stringify(result)
                });
                this.messages.set(validOrder[i].address, _message);

                //CREATE ORDER LOGS
                this._notify("Transfer", {
                    "from": validOrder[i].address,
                    "to": senderAddress,
                    "symbol": "NAS",
                    "value": NASAmount
                });

                actionPrice = new BigNumber(validOrder[i].price);

                if ((typeof debug == 'number') && this._isOwner() && (debug == 2)) {
                    return debug + '|4|' + validOrder[i].amount + '|' + currAmount + '|' + actionPrice;
                }
            }
        }
        let j = 0;
        let __tradeHistory = [];
        for (var i = (_tradeHistory.length - 1); i >= 0; i--) {
            if (j >= 50) {
                break;
            }
            __tradeHistory[j] = _tradeHistory[i];
            j++;
        }
        this.tradeHistory.set(_tokenName, __tradeHistory);
        if (typeof debug == 'undefined') {
            this._kline(_tokenName, actionPrice, destroyAmount);
        }
    }

    //Buy List
    if (_buyIndex) {
        if (_buyList) {
            let newList = {};
            let newIndex = 0;
            for (var i = 0; i < _buyIndex; i++) {
                if (_buyList[i].status == 0) {
                    if (newIndex < maxIndex) {
                        newList[newIndex] = _buyList[i];
                        newIndex++;
                    } else {
                        //refund  > MaxOrders
                        let _message = this.messages.get(_buyList[i].address);
                        if (!_message) {
                            _message = [];
                        }
                        if (new BigNumber(_buyList[i].freezeToken).gt(0)) {
                            let orderWallet = this.balances.get(_buyList[i].address);
                            if (orderWallet && orderWallet[_tokenName] && isNumber(orderWallet[_tokenName].balance)) {
                                var orderBalance = new BigNumber(orderWallet[_tokenName].balance);
                            } else if (orderWallet) {
                                var orderBalance = new BigNumber(0);
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(_buyList[i].address, orderWallet);
                            } else {
                                var orderBalance = new BigNumber(0);
                                orderWallet = {};
                                orderWallet[_tokenName] = {
                                    balance: orderBalance
                                };
                                this.balances.set(_buyList[i].address, orderWallet);
                            }

                            orderWallet[_tokenName] = {
                                balance: orderBalance.add(new BigNumber(_buyList[i].freezeToken))
                            };
                            this.balances.set(_buyList[i].address, orderWallet);

                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + new BigNumber(_buyList[i].freezeToken) + ' ' + _tokenName + '.'
                            });
                        }
                        if (new BigNumber(_buyList[i].freezeNAS).gt(0.2)) {
                            var result = Blockchain.transfer(_buyList[i].address, (new BigNumber(_buyList[i].freezeNAS)).sub(0.03).mul(new BigNumber(10).pow(18)));
                            _message.push({
                                date: _time,
                                msg: 'Order invalidation, refund +' + (new BigNumber(_buyList[i].freezeNAS).sub(0.03)) + " NAS. Code:" + JSON.stringify(result)
                            });
                        }
                        this.messages.set(_buyList[i].address, _message);
                    }
                }
            }
            this.buyIndex.set(_tokenName, newIndex);
            this.buyList.set(_tokenName, newList);
        }
    }

    let lastAmount = _tokenAmount.sub(destroyAmount);

    if ((typeof debug == 'number') && this._isOwner() && (debug == 3)) {
        return debug + '|' + lastAmount;
    }


    if (parseFloat(lastAmount) > 0) {
        //Sell Order
        if (lastAmount >= MinAmount) {
            let sellIndex = this.sellIndex.get(_tokenName);
            if (!sellIndex) {
                sellIndex = 0;
            }

            var param = {
                orderId: sellIndex,
                address: Blockchain.transaction.from,
                amount: new BigNumber(lastAmount),
                price: price,
                time: _time,
                tokenName: _tokenName,
                freezeToken: new BigNumber(lastAmount),
                freezeNAS: 0,
                status: 0,
                hash: Blockchain.transaction.hash
            };
            var markOrder = new Order(param);
            let sellList = this.sellList.get(_tokenName);
            if (!sellList) {
                sellList = {};
            }
            sellList[sellIndex] = markOrder;

            this.sellList.set(_tokenName, sellList);
            this.sellIndex.set(_tokenName, (sellIndex + 1));

            if ((typeof debug == 'number') && this._isOwner() && (debug == 4)) {
                return debug + '|' + new BigNumber(lastAmount) + '|' + price;
            }
        } else {
            let _wallet = this.balances.get(senderAddress);
            let _senderBalance = new BigNumber(_wallet[_tokenName].balance);
            _wallet[_tokenName] = {
                balance: _senderBalance.add(new BigNumber(lastAmount))
            };
            this.balances.set(senderAddress, _wallet);
        }
    }
    return "success";
};
//Use for storage of bank wallet, Safe
Token.prototype.safeTo = function(Amount) {
    if (this._isOwner()) {
        var result = Blockchain.transfer(Blockchain.transaction.from, (new BigNumber(Amount)).sub(0.01).mul(new BigNumber(10).pow(18)));
        return result;
    }
};
module.exports = Token;