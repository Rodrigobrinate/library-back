const fs =require('fs');
const PDFParser =require('pdf2json');

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({ datasources: {  db: { url: "mysql://root:123456@mysqldb:3306/library" } } });



exports.upload = async (req, res) => {

    const { filename, size, file } = req.file
    const { originalname, encoding, mimetype, } = req.file
    console.log(originalname)

    const book = await prisma.book.create({
        data: {
            name: originalname,
            where_stpped: 1,
            user_id: parseInt(req.user.id), 
            location: filename, 


        }
    })
    return res.json({
        msg: 'upload successful',
        st: 1,
    })


}




exports.books = async (req, res) => {

    const book = await prisma.book.findMany({
        where: {
            user_id: parseInt(req.user.id),
        }
    })

    return res.json(book)
    
  


    



        
        



}


exports.book = async (req, res) => {
    
    const id = req.params.id


    const book = await prisma.book.findFirst({
        where: {
            id: parseInt(id)
        }
    })


 const pdf2base64 = require('pdf-to-base64');
         pdf2base64("./uploads/"+book.location)
             .then(
                 (response) => {
                  //   console.log(response); //cGF0aC90by9maWxlLmpwZw==
                    res.json({book: book, data: 'data:application/pdf;base64,'+ response})              
                   }
             )
             .catch(
                 (error) => {
                     console.log(error); //Exepection error....
                 }
             ) 

 
}


exports.update = async (req, res) => {
    const id = req.params.id
    const where_stpped  = req.body.where_stpped
    //console.log(where_stpped)
    const book = await prisma.book.update({
        where: {
            id: parseInt(id)
        }, 
        data: {
            where_stpped: parseInt(where_stpped),
        }
    }).catch(err => {   
        console.log(err)
    })
    return res.json({
        msg: 'update successful',
        st: 1,
        id: book,
    })
}