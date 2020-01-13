/**
 * POST query on a given url using an object as body and executing callback on result
 * @param {*} url
 * @param {*} body
 * @param {*} callback
 * @param {*} errrorCallback
 */
const post = (
  url: string,
  body: any,
  callback: (json: any) => void,
  errorCallback: (json: any) => void = () => {}
) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      return res.json();
    })
    .then(json => callback(json))
    .catch(err => errorCallback(err));
};

/**
 * POST query on a given url using an object as body and executing callback on result
 * @param url
 * @param callback
 */
const get = (url: string, callback: (json: any) => void) => {
  const headers: any = {
    "Content-Type": "application/json"
  };

  const token = localStorage.getItem("token");

  if (token) {
    headers["Authorization"] = `JWT ${localStorage.getItem("token")}`;
  }

  if (localStorage.get)
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(json => callback(json));
};

export const apiUtils = { post, get };
