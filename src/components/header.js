import { Link } from "gatsby"
import PropTypes from "prop-types"
import NavBar from "../app/components/NavBar"
import React from "react"
import Logo from "../components/logo"

const Header = ( props ) => (
  <header
    style={{
      background: `linear-gradient(90deg, rgba(255,183,62,1) 0%, rgba(238,70,162,1) 49%, rgba(0,191,255,1) 100%)`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 200,
        padding: `1rem 0.8rem`,
      }}
    >
      <Logo/>
    </div>
    <NavBar/>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
