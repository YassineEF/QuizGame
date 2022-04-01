let jwt = require("jsonwebtoken");
require('dotenv').config()



module.exports.chekAuto = (req, response, next) => {

    const token=req.cookies.token;
     
   if(token === undefined  ){
         
    //    return response.json({
    //        message: "Access Denied! Unauthorized User"
    //    });
    next();


   } else{
       jwt.verify(token, process.env.JWT_SECRET, (err, authData)=>{
           if(err){
               response.json({
                   message: "Invalid Token..."
               });
 
           } else{
              next();
           }
        })
   }
}

































// async function  verifyToken  (req, response, next){
    
    // const token=req.cookies.token;
    //  console.log(token);
      
    // if(token === undefined  ){
          
    //     return response.json({
    //         message: "Access Denied! Unauthorized User"
    //     });
    // } else{
  
    //     jwt.verify(token, process.env.JWT_SECRET, (err, authData)=>{
    //         if(err){
    //             response.json({
    //                 message: "Invalid Token..."
    //             });
  
    //         } else{
    //            next();
    //         }
    //      })
    // } 
// }