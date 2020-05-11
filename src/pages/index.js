import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Logo from "../components/logo"
import front1 from '../images/front1.png'; // Tell webpack this JS file uses this image
import Button from '@material-ui/core/Button';
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

import SEO from "../components/seo"
import Link from '@material-ui/core/Link';
import { navigate } from "gatsby"

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles =  theme => ({
  root: {
    flex: "0 0 48%",
    margin: "1%"
  },
  link: {
    textDecoration: "none!important",
    color: "#222"
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, msg: null, streams: [], dialog: false
    }
  }
  
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/token-hider")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.message }))
  }

  // componentDidMount() {
  //   fetch('/.netlify/functions/streams').then((response) => {
  //     return response.json();
  //   }).then((response) => {
  //     console.log(response);
  //     this.setState({streams: response});
  //   });
  // }

  render() {


    const { classes } = this.props;

    // const classes = useStyles();

    const { loading, msg, streams } = this.state;

    const streamItems = streams.map( (stream) => {

      const id = stream ? stream.ref['@ref'].id : '';
      const link = '/app/stream/' + id;

      return (
        <Card className={classes.root}>
          <Link className={classes.link} href={link}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={stream.data.name}
          subheader={stream.data.from}
        />
        <CardMedia
          className={classes.media}
          image={stream.data.thumbnail ? stream.data.thumbnail : "https://lh3.googleusercontent.com/proxy/d7JIvk_Qlk-Gn2whM870rD7Af-kPMJ-vj6s12xj2UyCQcXzXOnbja9hdnBPy98bJuTFYN2OgKk2Sz2BgD3MNUIUu3yT-3ck9ZkGRG8edeiB1bDz4F98KWl4"}
          wide
          title="Paella dish"
        >
          </CardMedia>
        </Link>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        
      </Card>
      );
    });

    return (
      <Layout >
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{background: `#20202A`}}
          >

            <Grid sm="7">
              <h1 style={{color: "white", fontSize: "55px", lineHeight: "85px"}}>Discover the world's top creatives <span style={{color: "rgb(254, 83, 196)"}}>live.</span></h1>
              <p style={{color: "#C4C4C4", fontSize: "18px" }}>Liveroom is a leading platform for streaming original live content of artists.</p>
              <Button onClick={() => this.setState({dialog: true})} style={{
                  background: "linear-gradient(270deg, rgb(255, 83, 83) 1.64%, rgb(255, 83, 83) 1.65%, rgb(255, 83, 196) 96.17%)",
                  borderRadius: "12.2404px",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Montserrat, sans-serif",
                  padding: "0.5em 1em",
                  fontSize: 18
              }}>Sign up / Log in</Button>
              </Grid>
            <Grid sm="5"><img src={front1} alt="energetic young male dancing in pink illumination"/></Grid>

          </Grid>

         
        </div>
        <IdentityModal
        showDialog={this.state.dialog}
        onCloseDialog={() => this.setState({dialog: false})}
        onLogin={user => navigate("/")}
        onSignup={user => navigate("/")}
      />
      </Layout>
    )
  }

}

export default withStyles(useStyles)(IndexPage)
