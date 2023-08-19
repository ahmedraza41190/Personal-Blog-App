
import  express  from 'express';
let router = express.Router()



router.get('/login', (req, res, next) => {
    console.log('this is login!' , new Date());
    res.send('this is login v1' + new Date());
})

router.get('/signup', (req, res, next) => {
    console.log('this is login!' , new Date());
    res.send('this is login v1' + new Date());
   
})

export default router