import React from "react"
import { Link } from "gatsby"
import Logo from "../components/logo"
import Layout from "../components/layout"
import front1 from '../images/front1.png';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';

import Button from '@material-ui/core/Button';
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

import SEO from "../components/seo"
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


// const useStyles =  theme => ({
//   root: {
//     flex: "0 0 48%",
//     margin: "1%"
//   },
//   link: {
//     textDecoration: "none!important",
//     color: "#222"
//   },
//   media: {
//     height: 200,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   button: {
//     background: "linear-gradient(270deg, rgb(255, 83, 83) 1.64%, rgb(255, 83, 83) 1.65%, rgb(255, 83, 196) 96.17%)",
//     borderRadius: "12.2404px",
//     color: "rgb(255, 255, 255)",
//     fontFamily: "Montserrat, sans-serif",
//     padding: "0.5em 1em",
//     fontSize: 18,
//     textTransform: "none"
//   },
//   header: {
//     color: "#fff", 
//     fontSize: "8vh", 
//     lineHeight: "10vh"
//   },
//   subheader: {
//     color: "white", 
//     fontSize: "35px", 
//     lineHeight: "50px"
//   },
//   headerFive: {
//     fontSize: "18px",
//     fontWeight: "600"
//   },
//   link: {
//     fontSize: "18px",
//     fontWeight: "300"
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   form: {
//     justifyContent: "center",
//     display: "flex"
//   },
//   textField: {
//     background: "#282831",
//     borderRadius: "20px",
//     outline: "none",
//     border: "0",
//     padding: "10px",
//     marginRight: "-30px",
//     flex: "0 0 40%",
//     minWidth: "400px",
//     transition: "border 0.1s ease-out",
//     color: "#fff",
//     "&:focus": {
//       border: "1px solid rgb(255, 83, 196)",
//     },
//     "&::placeholder": {
//       color: "#F9F8FD"
//     }
//   }
// });

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, msg: null, streams: [], dialog: false,
      signupResult: ""
    };
    this.inlineStyles = {
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
      btn: {
        background: "linear-gradient(270deg, rgb(255, 83, 83) 1.64%, rgb(255, 83, 83) 1.65%, rgb(255, 83, 196) 96.17%)",
        borderRadius: "12.2404px",
        color: "rgb(255, 255, 255)",
        fontFamily: "Montserrat, sans-serif",
        padding: "0.5em 1em",
        fontSize: 18,
        textTransform: "none"
      },
      header: {
        color: "#fff", 
        fontSize: "8vh", 
        lineHeight: "10vh"
      },
      subheader: {
        color: "white", 
        fontSize: "35px", 
        lineHeight: "50px"
      },
      headerFive: {
        fontSize: "18px",
        fontWeight: "600"
      },
      link: {
        fontSize: "18px",
        fontWeight: "300"
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      form: {
        justifyContent: "center",
        display: "flex"
      },
      textField: {
        background: "#282831",
        borderRadius: "20px",
        outline: "none",
        border: "0",
        padding: "10px",
        marginRight: "-30px",
        flex: "0 0 40%",
        minWidth: "400px",
        transition: "border 0.1s ease-out",
        color: "#fff",
        "&:focus": {
          border: "1px solid rgb(255, 83, 196)",
        },
        "&::placeholder": {
          color: "#F9F8FD"
        }
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })
    let data = {
      email: e.target.elements.email.value,
    }
    fetch('/.netlify/functions/emails', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then((response) => {
      console.log(response);
      this.setState({loading: false})
    }).catch((e) => {
      this.setState({signupResult: "Oops! Something went wrong."})
    });
  }

  render() {

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
            className="front-page"
          >

            <Grid xs="12" sm="7">
              <h1 style={this.inlineStyles.header}>Discover the world's top creatives <span style={{color: "rgb(254, 83, 196)"}}>live.</span></h1>
              <p style={{color: "#C4C4C4", fontSize: "18px" }}>Liveroom is a leading platform for streaming original live content of artists.</p>
              <Button onClick={() => this.setState({dialog: true})} style={this.inlineStyles.btn}>Sign up / Log in</Button>
              </Grid>
            <Grid xs="12" sm="5" className="grid-image"><img src={front1} alt="energetic young male dancing in pink illumination"/></Grid>

          </Grid>

          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={10}
          >
            <Grid item xs="12" sm="6" className="grid-image"><img style={{width: "100%"}} src={img1} alt="energetic young male dancing in pink illumination"/></Grid>
            <Grid item xs="12" sm="6">
              <h2 style={this.inlineStyles.subheader}>Watch quality livestreams</h2>
              <p style={{color: "#C4C4C4", fontSize: "18px" }}>Watch your favorite artists live from the safety of your home.</p>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs="12" sm="6" >
              <h2 style={this.inlineStyles.subheader}>Support your favorites</h2>
              <p style={{color: "#C4C4C4", fontSize: "18px" }}>Make donations to support your favorite creatives. <br/>Be a part of their success.</p>
            </Grid>
            <Grid item xs="12" sm="6" className="grid-image"><img style={{width: "100%"}} src={img2} alt="energetic young male dancing in pink illumination"/></Grid>
          </Grid>

          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs="12" sm="6" className="grid-image"><img style={{width: "100%"}} src={img3} alt="energetic young male dancing in pink illumination"/></Grid>
            <Grid item xs="12" sm="6" >
              <h2 style={this.inlineStyles.subheader}>Get involved</h2>
              <p style={{color: "#C4C4C4", fontSize: "18px" }}>Get involved in the creative community of your choice. <br/>Make friends online.</p>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={5}
            style={{margin: "50px 0"}}
          >
            <Grid item xs="12">
              <h2 style={this.inlineStyles.subheader} style={{textAlign: "center"}}>Gigs happen here. Become part of our community.</h2>
              <p style={{color: "#C4C4C4", fontSize: "18px", textAlign: "center" }}>Don’t miss out! Liveroom is coming soon with industry leading performances live. <br/>Sign up for our list. Be first to get notified.</p>
              <form className="subscribe-form" onSubmit={this.handleSubmit} style={this.inlineStyles.form} autoComplete="off">
                <input name="email" style={this.inlineStyles.textField} id="email" placeholder="Email" />
                <Button type="submit" style={this.inlineStyles.btn}>
                  {this.state.loading ? "Processing..." : "Subscribe"}
                </Button>
              </form>
              <p style={{textAlign: "center", flex: "0 0 100%"}}>{this.state.signupResult}</p>
            </Grid>
          </Grid>
          {/* <Grid
            container
            direction="row"
            alignItems="center"
            spacing={5}
            style={{margin: "50px 0"}}
          >
            <Grid className item xs="12" md="3" >
              <Logo/>
            </Grid>
            <Grid item xs="12" md="3" >
              <h5 style={this.inlineStyles.headerFive}>Pages</h5>
              <Link to="/" style={this.inlineStyles.link}>For Creatives</Link>
              <Link to="/" style={this.inlineStyles.link}>Explore</Link>
            </Grid>
            <Grid item xs="12" md="3" >
              <h5 style={this.inlineStyles.headerFive}>Privacy</h5>
              <Link to="/" style={this.inlineStyles.link}>Imprint</Link>
              <Link to="/" style={this.inlineStyles.link}>Privacy Policy</Link>
            </Grid>
            <Grid item xs="12" md="3" >
              <h5 style={this.inlineStyles.headerFive}>Social Media</h5>
            </Grid>
          </Grid> */}
         
        </div>
      </Layout>
    )
  }

}

export default IndexPage
