import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { connect } from 'react-redux';
import { addTodoBucket } from '../redux/actions';
import { todoBuckets } from '../redux/bucketReducers';

const filter = createFilterOptions();

function AddToDoBucket({ addTodoBucket }) {

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
                            addTodoBucket(newValue, 0, 0, getCurrentDateTime());
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
                        params.inputValue = '';
                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={sample}
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
                />
            </div>
        </>
    );
}

const sample = [{
    bucketName: 'test1'
}]

export default connect(todoBuckets, { addTodoBucket })(AddToDoBucket)
