import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { connect } from 'react-redux';
import { addTodoBucket } from '../redux/actions';
import { todoBuckets } from '../redux/bucketReducers';
import _ from 'underscore';

const filter = createFilterOptions();

function AddToDoBucket({ todoBuckets, addTodoBucket }) {
    
    const [value, setValue] = useState(null);

    const getCurrentDateTime = () => {
        const currentdate = new Date();
        const datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        return datetime;
    }

    return (
        <>
            <div style={{ width: 300 }}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                bucketName: newValue,
                            });
                            addTodoBucket(newValue, 0, 0, getCurrentDateTime());
                        } else if (newValue && newValue.inputValue) {
                            setValue({
                                bucketName: newValue.inputValue,
                            });
                            addTodoBucket(newValue.inputValue, 0, 0, getCurrentDateTime());
                        } else {
                            setValue(newValue);
                            //addTodoBucket(newValue, 0, 0, getCurrentDateTime());
                        }

                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                bucketName: `Add "${params.inputValue}"`,
                            });
                        }
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={_.keys(todoBuckets.data).map((item, index) => todoBuckets.data[item].bucketName)}
                    getOptionSelected={(option, value) => option.bucketName === value.bucketName}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.bucketName;
                    }}
                    renderOption={(option) => option.bucketName}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Add a new bucket" variant="outlined" />
                    )}
                    renderOption={(option, { inputVal }) => {
                        const matches = match(option.bucketName, inputVal);
                        const parts = parse(option.bucketName, matches);
                        return (
                            <div>
                                {parts.map((part, index) => (
                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                        {part.text}
                                    </span>
                                ))}
                            </div>
                        );
                    }}
                />
            </div>
        </>
    );
}

export default connect(todoBuckets, { addTodoBucket })(AddToDoBucket)
