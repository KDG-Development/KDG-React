import React, { useState, useEffect } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput'
import { composedBooleanValidatedString } from '../../../utils/Common';

export type DecimalConfig = {
  allowDecimals: true;
  maxDecimals?: number;
} | {
  allowDecimals?: false;
  maxDecimals?:never
};
 
export type NumberInputProps = Omit<TextInputProps,"value"|"onChange"> & {
  value: number|null;
  onChange: (value: number|null) => void;
  min?:number
  max?:number
} & DecimalConfig

const NumberInput: React.FC<NumberInputProps> = (props) => {

  const [inputValue, setInputValue] = useState<string>(props.value !== null ? props.value.toString() : '');

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    setInputValue(padToMaxDecimalPlaces(inputValue));
  }, []);

  useEffect(() => {
      if (props.value !== null) {
          setInputValue(props.value.toString());
      } else {
          setInputValue('');
      }
  }, [props.value]);

  function padToMaxDecimalPlaces(numberString: string) {
    if (props.maxDecimals) {
      let [integerPart, decimalPart] = numberString.split('.');
      if (!integerPart || integerPart === '') {
        integerPart = '0';
      }
      if (!decimalPart) {
        decimalPart = '0';
      }
      
      numberString = `${integerPart}.${decimalPart.padEnd(props.maxDecimals, '0')}`;
    }
    return numberString;
  }

  const handleChange = (rawVal:string) => {
      let val = rawVal.trim();

      // Allow empty string to support clearing the input
      if (val === '' || val === '-') {
        setInputValue(val);
        props.onChange(null);
        return;
      }

      // Regex for validating input
      const regex = props.allowDecimals
          ? new RegExp(`^-?\\d*\\.?\\d{0,${props.maxDecimals ?? 2}}$`)
          : /^-?\d*$/;

      if (regex.test(val)) {
        let numericValue = parseFloat(val);

        if (!isNaN(numericValue)) {
          if (props.min !== undefined && numericValue < props.min) {
              numericValue = props.min;
              val = props.min.toString();
            }
            if (props.max !== undefined && numericValue > props.max) {
              numericValue = props.max;
              val = props.max.toString();
            }
        }

        setInputValue(val);
        props.onChange(numericValue);
      }
  };

  return (
    <TextInput
      { ...props }
      value={inputValue}
      onChange={handleChange}
      onBlur={() => setInputValue(padToMaxDecimalPlaces(inputValue))}
      helperText={
        props.helperText
        || composedBooleanValidatedString([
          [`Min ${props.min}`,props.min !== undefined],
          [`Max ${props.max}`,props.max !== undefined],
        ], ', ')
      }
    />
  );
};

export default NumberInput;