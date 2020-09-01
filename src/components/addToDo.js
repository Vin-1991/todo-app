import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/actions';
import { todos } from '../redux/reducers';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
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
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    root1: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
    },
}));

function AddToDo({ todoBuckets, todos, addTodo, toggleTodo, deleteTodo, editTodo, ...props }) {
    console.log(todoBuckets);
    const classes = useStyles();
    console.log(todos);
    const [checked, setChecked] = useState([]);
    const [addToDoValue, setToDoValue] = useState('');
    const [tododata, setToDoData] = useState([]);


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
        addTodo(props.bucketData.bucketId, addToDoValue);
        setToDoValue('');
    }

    const renderValues = () => {
        let bucketDetails = todoBuckets.filter((item, index) => item.bucketId === props.bucketData.bucketId)[0];
        let incompletedCount = todos.filter((item, index) => !item.completed && item.bucketId === props.bucketData.bucketId);
        let completedCount = todos.filter((item, index) => item.completed && item.bucketId === props.bucketData.bucketId);
        bucketDetails.incompeleteCount = incompletedCount.length;
        bucketDetails.completedCount = completedCount.length;
    }

    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={props.openDialog} scroll="paper">
                <DialogTitle id="scroll-dialog-title">{props.bucketData.bucketName}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.closeDialog}  >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <div className={classes.section1}>
                            <TextField
                                label="Add a ToDo"
                                value={addToDoValue}
                                onChange={(e) => setToDoValue(e.target.value)}
                                style={{
                                    marginTop: "-16px", width: '50ch'
                                }}
                            />
                            <IconButton aria-label="addToDo" disabled={addToDoValue === ''} onClick={handleAddToDoValue} >
                                <NoteAddIcon />
                            </IconButton>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        Incomplete Items
                                </Typography>
                                    <TodoList />
                                    <List className={classes.root}>
                                        {todos.filter((item, index) => !item.completed && item.bucketId === props.bucketData.bucketId).map((item, index) => {
                                            const labelId = `checkbox-list-label-${index}`;
                                            return (
                                                <ListItem key={index} role={undefined}>
                                                    <Paper component="form" className={classes.root1}>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(index) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            onClick={() => toggleTodo(item.id)}
                                                        />
                                                        <InputBase
                                                            className={classes.input}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            onChange={(e) => editTodo(item.id, e.target.value)}
                                                            key={index} value={item.todoName} id={index.toString()}
                                                        />
                                                        <Divider className={classes.divider} orientation="vertical" />
                                                        <IconButton edge="end" aria-label="deleteToDo" onClick={() => deleteTodo(item.id)} >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </Paper>
                                                    {/*<TextField
                                                        style={{ marginTop: "-16px", width: '60ch' }}
                                                        onChange={() => editTodo(item.id)}
                                                        key={index} value={item.todoName} id={index.toString()}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="deleteToDo" onClick={() => deleteTodo(item.id)} >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>*/}
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
                                {todos.filter((item, index) => item.completed && item.bucketId === props.bucketData.bucketId).map((item, index) => {
                                    const labelId = `checkbox-list-label-${index}`;
                                    return (
                                        <ListItem key={index} role={undefined}>
                                            <Paper component="form" className={classes.root1} style={{ textDecoration: "line-through" }}>
                                                <Checkbox
                                                    edge="start"
                                                    checked={item.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={() => toggleTodo(item.id)}
                                                />
                                                <InputBase
                                                    className={classes.input}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onChange={(e) => editTodo(item.id, e.target.value)}
                                                    key={index} value={item.todoName} id={index.toString()}
                                                />
                                                <Divider className={classes.divider} orientation="vertical" />
                                                <IconButton edge="end" aria-label="deleteToDo" onClick={() => deleteTodo(item.id)} >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Paper>
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

export default connect(todos, { addTodo, toggleTodo, deleteTodo, editTodo })(AddToDo)