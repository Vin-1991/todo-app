import React from 'react';
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
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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
        margin: theme.spacing(3, 2),
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


function AddToDo() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open full-screen dialog
      </Button>
            <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} scroll="paper">
                <DialogTitle id="scroll-dialog-title">Subscribe
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>

                    <div className={classes.root}>
                        <div style={{ alignItems:"center" }}>
                            <TextField
                                label="Add A ToDo"
                                style={{ margin: 8, width: '60ch' }}
                                margin="normal"
                            />
                           
                            <IconButton edge="end" aria-label="addToDo" style={{ fontSize: "20px" }} >
                                <NoteAddIcon />
                            </IconButton>
                        </div>
                        <div className={classes.section1}>

                            <Grid container alignItems="center">

                                <Grid item xs>
                                    <Typography gutterBottom variant="h5">
                                        Incomplete Items
                                </Typography>

                                    <List className={classes.root}>
                                        {[0, 1, 2, 3].map((value) => {
                                            const labelId = `checkbox-list-label-${value}`;

                                            return (
                                                <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(value) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>

                                                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
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
                                {[0, 1, 2, 3].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="deleteToDo">
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
        </div>
    );
}


export default AddToDo;