require('dotenv').config();

console.log(process.env.APIKEY)

const handleApicall = (req, res) => {
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": process.env.USERID,
      "app_id": process.env.APPID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": req.body.input,
          }
        }
      }
    ]
  });

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id
  fetch(`https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // eslint-disable-next-line no-useless-concat
        'Authorization': 'Key ' + process.env.APIKEY
      },
      body: raw
    })
    .then(response => response.text()).then(data => res.json(data))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entry', 1)
    .returning('entry')
    .then(entry => {
      res.json(entry[0].entry);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage,
  handleApicall
};