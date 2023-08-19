import  express  from 'express';
let router = express.Router()


router.get('/comment/:postId/:commentId',(req, res, next) =>{
    console.log('this is signup!', new Date());
    res.send('post created');
})

router.get('/comments/:postId/:commentId',(req, res, next) =>{
    console.log('this is signup!', new Date());
    res.send('post created');
})

router.put('/comment/:postId/:commentId',(req, res, next) =>{
    console.log('this is signup!', new Date());
    res.send('post created');
})

router.delete('/comment/:postId/:commentId',(req, res, next) =>{
    console.log('this is signup!', new Date());
    res.send('post created');
})


export default router