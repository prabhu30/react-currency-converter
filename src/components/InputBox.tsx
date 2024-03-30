import React, { useId } from "react";

interface InputBox {
    label: string,
    amount: number,
    onAmountChange: Function,
    onCurrencyChange: Function,
    currencyOptions: Array<string>,
    selectedCurrency: string,
    amountDisabled: boolean,
    currencyDisabled: boolean,
    className: string
}

const InputBox: React.FC<InputBox> = ({
    label, 
    amount, 
    onAmountChange, 
    onCurrencyChange, 
    currencyOptions = [], 
    selectedCurrency = "usd", 
    amountDisabled = false, 
    currencyDisabled = false, 
    className = ""
}) => {
    const amountInputId = useId();
    
    return (
        <div className={`bg-white p-4 px-5 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black mb-2 inline-block">
                    {label}
                </label>
                
                <input 
                id={amountInputId}
                className="outline-none w-full bg-transparent py-1.5" 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                disabled={amountDisabled} 
                autoComplete="off"
                onFocus={(event) => event.target.value = ""}
                onChange={(event) => {
                    onAmountChange && onAmountChange(Number(event.target.value))}
                 } />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black mb-2 w-full">Currency Type</p>
                
                <select 
                className="rounded-lg w-24 px-1 py-1 bg-gray-100 cursor-pointer border border-slate-400 outline-none uppercase" 
                value={selectedCurrency} 
                disabled={currencyDisabled} 
                onChange={(event) => onCurrencyChange && onCurrencyChange(event.target.value)}>
                        {
                            currencyOptions.map((currencyString) => (
                                <option key={currencyString} value={currencyString}>
                                    {currencyString}
                                </option>
                            ))
                        }
                </select>
            </div>
        </div>
    );
}

export default InputBox;
