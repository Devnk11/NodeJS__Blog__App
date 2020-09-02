const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

const articleRouter = require('./routes/articles')

mongoose.connect('mongodb+srv://devn:adminN@cluster0.5jigl.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true 
, useUnifiedTopology: true,useCreateIndex:true })

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.get('/', async (req,res)=>{
     const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles: articles})
})

app.use('/articles', articleRouter)

app.listen(3000)