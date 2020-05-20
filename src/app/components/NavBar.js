import React from "react"
import { Link, navigate } from "gatsby"
import Button from '@material-ui/core/Button';


import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS


export default () => {
  const { user, isLoggedIn, logoutUser } = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  let message = isLoggedIn
    ? `Hello, ${user.user_metadata && user.user_metadata.full_name}`
    : "You are not logged in"

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "flex-end",
        fontFamily: "Helvetica, sans-serif",
        fontSize: '14px',
        padding: "0 12px",
        boxSizing: "border-box",
      }}
    >
      <nav style={{
        background: "linear-gradient(270deg, rgb(255, 83, 83) 1.64%, rgb(255, 83, 83) 1.65%, rgb(255, 83, 196) 96.17%)",
        borderRadius: "12.2404px"
      }}>
        {isLoggedIn ? (
          <a
            href="/"
            onClick={async event => {
              event.preventDefault()
              await logoutUser()
              navigate(`/app/login`)
            }}
          >
            Logout
          </a>
        ) : (
          <Link style={{
            color: "rgb(255, 255, 255)",
            fontFamily: "Montserrat, sans-serif",
            padding: "12px 16px",
            lineHeight: "24px"
            }} to="#newsletter">Sign Up</Link>
        )}
      </nav>

      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate("/")}
        onSignup={user => navigate("/")}
      />
    </div>
  )
}
