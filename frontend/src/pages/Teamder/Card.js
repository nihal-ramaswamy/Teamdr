import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React from 'react';

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
        <Typography variant="h6" component="h6">
        
          Information:
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}Name: {props.name.replace("_", " ")}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}GitHub: {props.github}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}LinkedIn: {props.linkedin}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {bull}Interests: {props.interests.map((interest, idx) => {
            let delim = ", ";
            if (idx == props.interests.length - 1) {
              delim = ""
            } 
            return (
              interest+delim)
            }
          )}
        </Typography>
        <Typography variant="h6" component="h6">
            Bio:
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.bio}
        </Typography>
        <Typography variant="h6" component="h6">
            Rating:
        </Typography>
        <Rating name="read-only" value={props.rating} readOnly />
        </CardContent>
    </Card>
  );
}