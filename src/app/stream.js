import React, { useState, useEffect } from "react"

import { useIdentityContext } from "react-netlify-identity-widget"

const Stream = (props) => {
    const { user } = useIdentityContext()

    const [stream, setStream] = useState(null);
    
    useEffect( () => {
        fetch(`/.netlify/functions/streams/${props.id}`).then((response) => {
            return response.json();
          }).then((response) => {
            console.log(response);
            setStream(response);
          });
    });

    
    return (
        <div>
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + (stream ? stream.data.url : "")} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h1></h1>
        </div>
    )
  }

export default Stream;