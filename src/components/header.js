import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

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
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {props.siteTitle}
        </Link>
      </h1>
      <h4 style={{
            color: `white`,
            textDecoration: `none`,
          }}>{props.siteDescription}</h4>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
