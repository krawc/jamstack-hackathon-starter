import React, { useState, useEffect } from "react"
import { useIdentityContext } from "react-netlify-identity-widget"
import fetch from 'cross-fetch';

const Stream = (props) => {
    const { user } = useIdentityContext()

    const [stream, setStream] = useState(null);
    const [streamId, setStreamId] = useState("");

    const fetchStream = async () => {
      const apiCall = await fetch(`/.netlify/functions/streams/${props.id}`);
      const str = await apiCall.json();
      setStream(str);
    }
    
    useEffect( () => {
      fetchStream();
    }, []);
    
    return (
        <div>
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + (stream ? stream.data.url : "")} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h1></h1>
        </div>
    )
  }

export default Stream;