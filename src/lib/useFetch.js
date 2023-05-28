import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = async (options) => {
    setLoading(true);

    if (options && options.queryParams) {
      const params = new URLSearchParams(options.queryParams).toString();
      url += `?${params}`;
    }

    fetch(`/api/${url}`, {
      method: (options && options.method) || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options && options.body),
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          return await res.json().then((err) => {
            throw err
          });
        }
        return await res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return { loading, data, error, executeFetch };
};

export default useFetch;
