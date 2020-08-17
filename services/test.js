const FormData = require('form-data')
const FileType = require('file-type');
const CircularJSON = require('circular-json');
const express = require('express')
const fs = require('fs');
const axios = require('axios')
const router = express.Router()

router
.get('/idcard', async (req, res) => {
  const uploadfilepath = `./assets/idcard.jpg`
  const bitmap = fs.readFileSync(uploadfilepath);
  const base64String = await Buffer.from(bitmap).toString('base64')
  const mimeInfo = await FileType.fromBuffer(bitmap)
  const valueX = `data:${mimeInfo.mime};base64,${base64String}`
  // axios({
  //   "method":"POST",
  //   "url":"https://thai-national-id.p.rapidapi.com/idocr/detect/front",
  //   "headers":{
  //   "content-type":"multipart/form-data",
  //   "x-rapidapi-host":"thai-national-id.p.rapidapi.com",
  //   "x-rapidapi-key":"da15229506msh7120cc2d56c2b7ep181c4bjsn184b7ab86659",
  //   "useQueryString": true,
  //   },"data":[{
  //       "body": {
  //         "value": "idcard.jpg",
  //         "data": `data:${mimeInfo.mime};base64,${base64String}`,
  //       },
  //       "content-type":"application/octet-stream",
  //     }]
  //   })
  //   .then((response)=>{
  //     console.log('response')
  //     console.log(response)
  //     res.send(response)
  //     // res.send('YES')
  //   })
  //   .catch((error)=>{
  //     console.log('error')
  //     console.log(error)
  //     res.send(error)
  //   })
  axios({
    "method":"POST",
    "url":"https://thai-national-id.p.rapidapi.com/idocr/detect/front",
    "headers":{
    "content-type":"multipart/form-data",
    "x-rapidapi-host":"thai-national-id.p.rapidapi.com",
    "x-rapidapi-key":"da15229506msh7120cc2d56c2b7ep181c4bjsn184b7ab86659",
    "useQueryString":true
    },
    "data":[{
        "body":{
          "value":"idcard.jpg",
          // "data": "",
          },
        "content-type":"application/octet-stream"
      }]
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
})


module.exports = router