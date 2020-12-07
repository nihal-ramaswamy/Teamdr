import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Information
        </Typography>
        <Typography variant="h5" component="h2">
          {bull}Name: {props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull}GitHub: {props.github}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull}LinkedIn: {props.linkedin}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull}Interests: {props.interests}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Bio: {props.bio}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Rating:
        </Typography>
        <Rating name="read-only" value={props.rating} readOnly />
        </CardContent>
    </Card>
  );
}