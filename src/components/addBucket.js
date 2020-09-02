import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { connect } from 'react-redux';
import { addTodoBucket } from '../redux/actions';
import { todoBuckets } from '../redux/bucketReducers';

const filter = createFilterOptions();

function AddToDoBucket({ todoBuckets, addTodoBucket }) {

    const [selectedValue, setSelectedValue] = useState(null);
    const [uniqueBuckets, setUniqueBuckets] = useState([]);

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

    const handleAutoCompleteChange = (event, newValue) => {
        if (typeof newValue === 'string') {
            setSelectedValue({
                bucketName: newValue,
            });
            addTodoBucket(newValue, 0, 0, getCurrentDateTime());
            getUniqueBucketValues(newValue);
        } else if (newValue && newValue.inputValue) {
            setSelectedValue({
                bucketName: newValue.inputValue,
            });
            addTodoBucket(newValue.inputValue, 0, 0, getCurrentDateTime());
            getUniqueBucketValues(newValue.inputValue);
        } else if (newValue !== null) {
            setSelectedValue(newValue);
            addTodoBucket(newValue.bucketName, 0, 0, getCurrentDateTime());
            getUniqueBucketValues(newValue.bucketName);
        }
        setSelectedValue(null);
    }

    const handleFilterOptions = (options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                bucketName: `Add bucket "${params.inputValue}"`,
            });

        }
        return filtered;
    }

    const handleGetOptionLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.bucketName;
    }

    const handleRenderOptions = (option, { inputValue }) => {
        const matches = match(option.bucketName, inputValue);
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
    }

    const getUniqueBucketValues = name => {
        const ifExist = todoBuckets.filter(item => item.bucketName === name);
        if (ifExist.length === 0) {
            setUniqueBuckets(old => ([...old, { bucketName: name }]));
        }
    }

    useEffect(() => {
        if (todoBuckets.length === 0) {
            setUniqueBuckets([]);
        }
    }, [todoBuckets])

    return (
        <>
            <div>
                <Autocomplete
                    value={selectedValue}
                    onChange={handleAutoCompleteChange}
                    filterOptions={handleFilterOptions}
                    selectOnFocus
                    clearOnBlur
                    id="add-bucket-todo"
                    options={uniqueBuckets}
                    getOptionSelected={(option, value) => option === value}
                    getOptionLabel={handleGetOptionLabel}
                    style={{ width: 500 }}
                    freeSolo
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label="Add a new bucket" variant="outlined" placeholder="Search or Add a Bucket.." />
                    )}
                    renderOption={handleRenderOptions}
                />
            </div>
        </>
    );
}

export default connect(todoBuckets, { addTodoBucket })(AddToDoBucket)
