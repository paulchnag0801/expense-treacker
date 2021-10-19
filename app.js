const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const usePassport = require('./config/passport')
const { ifEqual } = require('./tools/handlebarshelpers')
const app = express()
const methodOverride = require('method-override')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: { ifEqual } ,
})
const PORT = process.env.PORT || 3000
require('./config/mongoose')


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)



app.listen(PORT, () => {
  console.log(`App is running in http;//localhost:${PORT}`)
})
