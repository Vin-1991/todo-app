import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
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
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../redux/actions';
import { todos } from '../redux/reducers';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

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
    }, [inCompleteCount, completeCount, renderValues])


    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={props.openDialog} scroll="paper">
                <DialogTitle id="scroll-dialog-title">{props.bucketData.bucketName}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.closeDialog} >
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
                            {inCompleteCount > 0 && <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6">
                                        Incomplete {inCompleteCount > 1 ? 'Items' : 'Item'} - {inCompleteCount}
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
                                </Grid>
                                <Divider variant="middle" />
                            </Grid>}
                        </div>

                        {completeCount > 0 && <div className={classes.section2}>
                            <Typography gutterBottom variant="h6">
                                Completed {completeCount > 1 ? 'Items' : 'Item'} - {completeCount}
                            </Typography>
                            <List className={classes.root}>
                                {todos.length > 0 && todos.filter((item, index) => item.completed && item.bucketId === props.bucketData.bucketId).map((item, index) => {
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
                        </div>}

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default connect(todos, { addTodo, toggleTodo, deleteTodo, editTodo })(AddToDo)