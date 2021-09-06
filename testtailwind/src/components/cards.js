import '../App.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        borderRadius: '20px'
    },
    media: {
        height: 140,
    },
    heading: {
        textAlign: 'left',
    },
    price: {
        textAlign: 'left',
        component: "h2",
        color:'blue',
        variant: "h5"
    },
    productName: {
        textAlign: 'left',
        variant:"body2",
        color:"textSecondary",
        component:"p"
    },

  });
 

export default function Cards({data}) {
    const classes = useStyles();


    return (
        Object.keys(data).map((vendor) =>
            <div>
                <h2 class="flex mx-20 py-5 text-2xl item-start">{vendor}</h2>
                <div class="grid grid-cols-1 px-20 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    { 
                        data[vendor].map((value) => 
                            <div class="items-center px-10 py-10">
                                <Card className={classes.root}>
                                    <Link href={value[4]}>
                                        <CardActionArea>
                                            <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={value[2]}
                                            title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                            
                                            <Typography className={classes.heading} gutterBottom variant="h5" component="h2" 
                                                >
                                                {value[0]}
                                            </Typography>
                                            <Typography className={classes.price} >
                                                {value[1]}
                                            </Typography>
                                                                    
                                            </CardContent>
                                        </CardActionArea>
                                    <CardActions href={value[4]}>
                                        <Button size="small" color="primary">
                                        Learn More
                                        </Button>
                                    </CardActions>
                                    </Link>
                                </Card>
                            </div>
                        )
        
                    }
                </div>

            </div>
        )
    );

}
