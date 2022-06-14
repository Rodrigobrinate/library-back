const Library = require('../services/Library.service')


 exports.upload = (req, res) => {
    Library.upload(req, res)
}

exports.books = (req, res) => {
    Library.books(req, res)
}

exports.book = (req, res) => {
    Library.book(req, res)
}


exports.update = (req, res) => {
    Library.update(req, res)
}