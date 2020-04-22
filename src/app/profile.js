import React from "react"
import { useIdentityContext } from "react-netlify-identity-widget"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Profile = () => {
  const { user } = useIdentityContext()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      url: e.target.elements.video_id.value,
      name: e.target.elements.stream_name.value
    }
    fetch('/.netlify/functions/streams', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
       console.log(response.json())
    })
  }

    return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.user_metadata && user.user_metadata.full_name}</li>
        {/* <button onClick={handleClick}>CLICK TO ADD AN ITEM</button> */}
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          ADD NEW STREAM
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Stream</DialogTitle>
          <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="video_id"
              id="VideoID"
              label="Video ID"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="stream_name"
              id="name"
              label="Stream Name"
              type="text"
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </ul>
    </>
  )
}

export default Profile
