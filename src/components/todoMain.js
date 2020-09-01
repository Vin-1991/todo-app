import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import AddBucket from '../components/addBucket';
import AddToDo from '../components/addToDo';
import { deleteTodoBucket, deleteAllTodos } from '../redux/actions';
import { todoBuckets } from '../redux/bucketReducers';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '60%',
    },
    cardContent: {
        flexGrow: 1,
    }
}));

function ToDoMain({ todoBuckets, deleteTodoBucket, deleteAllTodos }) {

    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);
    const [getBucketData, setBucketData] = useState([]);

    const renderBucketData = (bucketData) => {
        setBucketData(bucketData);
        setOpenModal(true);
    }

    const handleClose = _ => setOpenModal(false);

    return (
        <>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            ToDo App
                        </Typography>

                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item >
                                    <AddBucket />
                                    {openModal === true && <AddToDo bucketData={getBucketData} openDialog={openModal} closeDialog={handleClose} />}
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {todoBuckets.length > 0 && < Container className={classes.cardGrid} maxWidth="xl">
                    <Grid container spacing={3}>
                        {todoBuckets.map((card) => (
                            <Grid item key={card.bucketId} xs={12} sm={6} md={3}>
                                <Card className={classes.card} >
                                    <CardActionArea>
                                        <CardContent className={classes.cardContent} onClick={() => renderBucketData(card)}>
                                            <Typography gutterBottom variant="h5" component="h2" align="center" >
                                                {card.bucketName}
                                            </Typography>
                                            <Typography>
                                                InCompete : {card.incompeleteCount}
                                            </Typography>
                                            <Typography>
                                                Competed : {card.completedCount}
                                            </Typography>
                                            <Typography>
                                                Created at : {card.createdTime}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Divider variant="middle" />
                                    <Typography align="center" >
                                        <IconButton aria-label="deleteBucket" onClick={() => { deleteTodoBucket(card.bucketId); deleteAllTodos(card.bucketId); }}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>}
            </main>
        </>
    );
}

export default connect(todoBuckets, { deleteTodoBucket, deleteAllTodos })(ToDoMain);