import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./spotify"; // your function

function Callback({ clientId }) {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      getAccessToken(clientId, code).then(() => {
        // navigate back home after token exchange
        window.location.href = "/";
      });
    }
  }, [search, clientId]);

  return <p>Finishing login...</p>;
}

export default Callback;
