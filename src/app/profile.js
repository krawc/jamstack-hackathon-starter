import React, {Component} from "react"
import { useIdentityContext } from "react-netlify-identity-widget"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactDom from 'react-dom';
import ReactS3 from 'react-s3';
 
//Optional Import
import { uploadFile } from 'react-s3';

const config = {
  bucketName: 'liveroom-bucket',
  dirName: 'images', /* optional */
  region: 'us-east-2',
  accessKeyId: 'AKIAJYH7FELBUOST7VMQ',
  secretAccessKey: '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',
}

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

    let thumbnail = e.target.elements.thumbnail_img.files[0];

    ReactS3.upload(thumbnail)
    .then((response) => {
      let data = {
        url: e.target.elements.video_id.value,
        name: e.target.elements.stream_name.value,
        start: e.target.elements.stream_start.value,
        end: e.target.elements.stream_end.value,
        thumbnail: response.location
      }
      fetch('/.netlify/functions/streams', {
        body: JSON.stringify(data),
        method: 'POST'
      })
    })
    .then(response => {
       console.log(response.json())
    });
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
              label="Stream link"
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
            <TextField
              id="stream_start"
              label="Stream Start"
              type="datetime-local"
              defaultValue="2020-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              id="stream_end"
              label="Stream End"
              type="datetime-local"
              defaultValue="2020-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <input 
              accept="image/*" 
              id="raised-button-file" 
              type="file" 
              name="thumbnail_img"
            /> 
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Upload Thumbnail
              </Button>
            </label>
            
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
