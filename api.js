const axios = require('axios');
const API = "http://10.101.2.77:8080/api/ar/sample"
axios.get(API).then(response=>response.data).then((data)=>console.log(data.data))
