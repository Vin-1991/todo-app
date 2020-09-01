import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo, addTodoBucketCount } from '../redux/actions';
import { todos } from '../redux/todoReducers';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        backgroundColor: '#3f51b5',
        color: '#fff'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
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
        width: '100%',
    },
}));

function AddToDo({ todos, addTodo, toggleTodo, deleteTodo, editTodo, addTodoBucketCount, ...props }) {

    const classes = useStyles();

    const [checked] = useState([]);
    const [addToDoValue, setToDoValue] = useState('');
    const [inCompleteCount, setInCompleteCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);

    const handleAddToDoValue = () => {
        addTodo(props.bucketData.bucketId, addToDoValue);
        setToDoValue('');
    }

    const renderValues = useCallback(() => {
        setInCompleteCount(todos.filter((item, index) => !item.completed && item.bucketId === props.bucketData.bucketId).length);
        setCompleteCount(todos.filter((item, index) => item.completed && item.bucketId === props.bucketData.bucketId).length);
    }, [todos, props.bucketData.bucketId])

    useEffect(() => {
        renderValues();
        if (completeCount > 0 || inCompleteCount > 0) {
            addTodoBucketCount(props.bucketData.bucketId, completeCount, inCompleteCount);
        }
    }, [inCompleteCount, completeCount, renderValues, addTodoBucketCount, props.bucketData.bucketId])

    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={props.openDialog} scroll="paper">
                <DialogTitle id="scroll-dialog-title" className={classes.title}>{props.bucketData.bucketName}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.closeDialog} >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <div>
                            <TextField
                                label="Add a ToDo"
                                value={addToDoValue}
                                onChange={(e) => setToDoValue(e.target.value)}
                                variant="outlined"
                                style={{ width: '100%' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton aria-label="addToDo" color="primary" disabled={addToDoValue === ''} onClick={handleAddToDoValue} >
                                                <NoteAddIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Divider style={{ marginTop: '1em' }} variant="middle" />
                        </div>
                        <div className={classes.section1}>
                            {inCompleteCount > 0 &&
                                <div>
                                    <Typography gutterBottom variant="h6">
                                        {inCompleteCount} - incomplete {inCompleteCount > 1 ? 'items' : 'item'}
                                    </Typography>
                                    <List className={classes.root}>
                                        {todos.length > 0 && todos.filter((item, index) => !item.completed && item.bucketId === props.bucketData.bucketId).map((item, index) => {
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
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </div>}
                        </div>
                        {completeCount > 0 && <div className={classes.section2}>
                            <Typography gutterBottom variant="h6">
                                {completeCount} - completed {completeCount > 1 ? 'items' : 'item'}
                            </Typography>
                            <List className={classes.root}>
                                {todos.length > 0 && todos.filter((item, index) => item.completed && item.bucketId === props.bucketData.bucketId).map((item, index) => {
                                    const labelId = `checkbox-list-label-${index}`;
                                    return (
                                        <ListItem key={index} role={undefined}>
                                            <Paper component="form" className={classes.root1} style={{ textDecoration: "line-through", background: '#d3d3d382' }}>
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
                        </div>}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default connect(todos, { addTodo, toggleTodo, deleteTodo, editTodo, addTodoBucketCount })(AddToDo)