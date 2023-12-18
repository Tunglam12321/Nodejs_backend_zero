const express=require('express');
const router=express.Router();

// Định nghĩa route cho trang chủ
router.get('/lam', (req, res) => {
    res.render('test.ejs');
  });

module.exports=router;