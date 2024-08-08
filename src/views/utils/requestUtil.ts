import axios from 'axios'

let BASE_URL = import.meta.env.VITE_HOST;

const request = (url, method, data, header = {}): any => {
    let oo: any = {
        method: method,
        url: BASE_URL + url,
        headers: {
            "content-type": "application/json",
            ...header
        },
    }
    if (method == "get") {
        oo["params"] = data;
    } else {
        oo["data"] = data;
    }
    return new Promise((resolve, reject) => {
        axios.request(oo).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

const getURL = () => {
    return BASE_URL;
}

const getToken = () => {
    return "";
}

export default {
    request
}