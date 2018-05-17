const {db} = require('./firebase')
const firebase = require('firebase')

class Farm {
  static create (req, res){
    // console.log(db)
    console.log(req.body)
    console.log(req.file.cloudStoragePublicUrl)
    let payload = req.body
    payload.name = req.body.name
    payload.farms = [{
      name: '1',
      watered: false,
      plant: req.body.plant1
    },
    {
      name: '2',
      watered: false,
      plant: req.body.plant2
    },{
      name: '3',
      watered: false,
      plant: req.body.plant3
    },
    {
      name: '4',
      watered: false,
      plant: req.body.plant4
    }]
    payload.createdAt =  firebase.database.ServerValue.TIMESTAMP
    payload.updatedAt = firebase.database.ServerValue.TIMESTAMP
    payload.image = req.file.cloudStoragePublicUrl
    db.ref('farms').push(payload)
      .then(result=>{
        console.log(JSON.stringify(result,null,2))
        res.status(200).json({
          message:'sucess add farm'
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'error add farm'
        })
      })
  }
}

module.exports = Farm