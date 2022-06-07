//API assignment from June 2, 2022 Class 39
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const presidents = {
    'unknown' : {
        'Number' : 'unknown',
        'Term' : 'unknown',
        'Party' : 'unknown',
        'Home State' : 'unknown',
        'Vice President' : 'unknown',
        'Image' : 'unknown',
    },
    'george washington' : {
        'Number' : 1,
        'Term' : 'April 30, 1789 - March 4, 1797',
        'Party' : 'Federalist',
        'Home State' : 'Virginia',
        'Vice President' : 'John Adams',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/george-washington.jpg',
    },
    'john adams' : {
        'Mumber' : 2,
        'Term' : 'March 4, 1797 - March 4, 1801',
        'Party' : 'Federalist',
        'Home State' : 'Massachusetts',
        'Vice President' : 'Thomas Jefferson',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/john-adams.jpg',
    },
    'thomas jefferson' : {
        'Number' : 3,
        'Term' : 'March 4, 1801 - March 4, 1809',
        'Party' : 'Democratic-Republican',
        'Home State' : 'Virginia',
        'Vice President' : 'Aaron Burr / George Clinton',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/thomas-jefferson.jpg',
    },
    'james madison' : {
        'Number' : 4,
        'Term' : 'March 4, 1809 - March 4, 1817',
        'Party' : 'Democratic-Republican',
        'Home State' : 'Virginia',
        'Vice President' : 'Aaron Burr / George Clinton',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-madison.jpg',
    },
    'james monroe' : {
        'Number' : 5,
        'Term' : 'March 4, 1817 - March 4, 1825',
        'Party' : 'Democratic-Republican',
        'Home State' : 'Massachusetts',
        'Vice President' : 'Daniel D. Tompkins',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-monroe.jpg',
    },
    'john quincy adams' : {
        'Number' : 6,
        'Term' : 'March 4, 1825 - March 4, 1829',
        'Party' : 'Democratic-Republican/National Republican',
        'Home State' : 'Tennessee',
        'Vice President' : 'John C. Calhoun',
        'Image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/john-quincy-adams.jpg',
    },















}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response) => {
    const presName = request.params.name.toLowerCase()
        if (presidents[presName]){
            response.json(presidents[presName])
        }else{
            response.json(presidents['unknown'])
        }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The presAPI server is working like a charm on port ${PORT}!!!`)
})