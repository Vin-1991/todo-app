import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { connect } from 'react-redux';
import TodoList from '../components/todoList';
import { addTodo, editTodoBucket } from '../redux/actions';
import { todoBuckets } from '../redux/bucketReducers';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

function AddToDo({ }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [addToDoValue, setToDoValue] = useState('');
    const [tododata, setToDoData] = useState([
        {
            num: 1,
            name: 'hello'
        },
        {
            num: 2,
            name: 'world'
        },
        {
            num: 3,
            name: 'test'
        }]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    }

    const handleOnTextBoxChange = e => {
        const { value, id } = e.target;
        const newArray = [...tododata];
        newArray[id] = {
            ...newArray[id],
            name: value
        }
        setToDoData(newArray);
    }

    const handleAddToDoValue = () => {
        setToDoValue('');
        addTodo(addToDoValue);
    }

    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={open} scroll="paper">
                <DialogTitle id="scroll-dialog-title">
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>

                    <div className={classes.root}>

                        <div className={classes.section1}>

                            <TextField
                                label="Add a ToDo"
                                style={{
                                    marginTop: "-16px", width: '50ch'
                                }}
                            />

                            <IconButton aria-label="addToDo" onClick={handleAddToDoValue} >
                                <NoteAddIcon />
                            </IconButton>

                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        Incomplete Items
                                </Typography>
                                    <TodoList />
                                    <List className={classes.root}>
                                        {tododata.map((item, index) => {
                                            const labelId = `checkbox-list-label-${index}`;

                                            return (
                                                <ListItem key={index} role={undefined} dense button>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(index) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            onClick={handleToggle(index)}
                                                        />
                                                    </ListItemIcon>
                                                    <TextField
                                                        style={{ marginTop: "-16px", width: '60ch' }}
                                                        onChange={handleOnTextBoxChange}
                                                        key={index} value={item.name} id={index.toString()}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="deleteToDo">
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Grid>
                            </Grid>

                        </div>
                        <Divider variant="middle" />
                        <div className={classes.section2}>
                            <Typography gutterBottom variant="h5">
                                Completed Items
        </Typography>
                            <List className={classes.root}>
                                {[0, 1].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                        <ListItem key={value} role={undefined} dense button >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={handleToggle(value)}
                                                />
                                            </ListItemIcon>
                                            <TextField
                                                style={{ marginTop: "-16px", width: '60ch' }}
                                                onChange={handleOnTextBoxChange}
                                                value={addToDoValue}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="deleteToDo">
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default connect(todoBuckets, { addTodo })(AddToDo)