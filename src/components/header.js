import { Link } from "gatsby"
import PropTypes from "prop-types"
import NavBar from "../app/components/NavBar"
import React from "react"
import Logo from "../components/logo"

import { useIdentityContext } from "react-netlify-identity-widget"


const Header = ( props ) => (

  <header
    style={{
      background: `#20202A`,
      width: "100%",
      maxWidth: 1350,
      margin: "0 auto 1.45rem"
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1rem 1.5rem`,
        display: "flex",
        alignItems: "center",
        width: "100%"
      }}
    >
      <Logo/>
      <Link style={{margin: "0 1em", fontSize: "14px"}} to="/">Explore</Link>
      <Link style={{margin: "0 1em", fontSize: "14px"}} to="/">For Creatives</Link>

      <NavBar/>
    </div>
    {/* <NavBar/> */}
  </header>
  )


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
