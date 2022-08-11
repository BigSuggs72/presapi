//API assignment from June 2, 2022 Class 39
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


//DECLARED DB VARIABLES(Hide credentials)
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'presapi',
    collection


// CONNECT TO MONGO DB
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to the ${dbName} database!`)
        db = client.db(dbName)
        collection = db.collection('presinfo')
    })


//SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next();
  });



//Objects
const presidents = {
    'unknown' : {
        'number' : 'unknown',
        'firstname' : 'unknown',
        'lastname' : 'unknown',
        'term' : 'unknown',
        'party' : 'unknown',
        'birthstate' : 'unknown',
        'facts' : 'unknown',
        'image' : 'unknown',
    },
    'george washington' : {
        'number' : 1,
        'firstname' : 'George',
        'lastname' : 'Washington',
        'term' : 'April 30, 1789 - March 4, 1797',
        'party' : 'Federalist',
        'birthstate' : 'Virginia',
        'facts' : 'Revolutionary War hero was an enthusiastic dog breeder, particularly  of hunting hounds, to which he gave names like “Sweet Lips” and “Drunkard.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/george-washington.jpg',
    },
    'john adams' : {
        'number' : 2,
        'firstname' : 'John',
        'lastname' : 'Adams',
        'term' : 'March 4, 1797 - March 4, 1801',
        'party' : 'Federalist',
        'birthstate' : 'Massachusetts',
        'facts' : 'Exchanged with his wife Abigail more than 1,100 letters over the course of their lengthy relationship.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/john-adams.jpg',
    },
    'thomas jefferson' : {
        'number' : 3,
        'firstname' : 'Thomas',
        'lastname' : 'Jefferson',
        'term' : 'March 4, 1801 - March 4, 1809',
        'party' : 'Democratic-Republican',
        'birthstate' : 'Virginia',
        'facts' : 'The principal author of the Declaration of Independence who loved science, technology and innovation.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/thomas-jefferson.jpg',
    },
    'james madison' : {
        'number' : 4,
        'firstname' : 'James',
        'lastname' : 'Madison',
        'term' : 'March 4, 1809 - March 4, 1817',
        'party' : 'Democratic-Republican',
        'birthstate' : 'Virginia',
        'facts' : 'Madison was the shortest president at 5 feet 4 inches and weighed barely over 100 pounds.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-madison.jpg',
    },
    'james monroe' : {
        'number' : 5,
        'firstname' : 'James',
        'lastname' : 'Monroe',
        'term' : 'March 4, 1817 - March 4, 1825',
        'party' : 'Democratic-Republican',
        'birthstate' : 'Virginia',
        'facts' : 'Other than Washington, Monroe was the only President to ever run essentially unopposed, coasting to re-election in the 1820 race.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-monroe.jpg',
    },
    'john quincy adams' : {
        'number' : 6,
        'firstname' : 'John Q',
        'lastname' : 'Adams',
        'term' : 'March 4, 1825 - March 4, 1829',
        'party' : 'Democratic-Republican/National Republican',
        'birthstate' : 'Massachusetts',
        'facts' : 'Adams argued a famous Supreme Court case that freed the captive Africans who had rebelled aboard the Amistad slave ship.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/john-quincy-adams.jpg',
    },
    'andrew jackson' : {
        'number' : 7,
        'firstname' : 'Andrew',
        'lastname' : 'Jackson',
        'term' : 'March 4, 1829 - March 4, 1837',
        'party' : 'Democratic',
        'birthstate' : 'South Carolina',
        'facts' : 'Founder of the Democratic party and for his support of individual liberty',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/andrew-jackson.jpg',
    },
    'martin van buren' : {
        'number' : 8,
        'firstname' : 'Martin',
        'lastname' : 'Van Buren',
        'term' : 'March 4, 1837 - March 4, 1841',
        'party' : 'Whig',
        'birthstate' : 'New York',
        'facts' : 'Van Buren was the first president to be born an American. All previous Presidents were originally British subjects, having been born prior to 1776.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/martin-van-buren.jpg',
    },
    'william harrison' : {
        'number' : 9,
        'firstname' : 'William H',
        'lastname' : 'Harrison',
        'term' : 'March 4, 1841 - April 4, 1841',
        'party' : 'Whig',
        'birthstate' : 'South Carolina',
        'facts' : 'Harrison lasted only 32 days in office, the shortest stint of any President.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/william-harrison.jpg',
    },
    'john tyler' : {
        'number' : 10,
        'firstname' : 'John',
        'lastname' : 'Tyler',
        'term' : 'April 4, 1841 - March 4, 1845',
        'party' : 'Democratic',
        'birthstate' : 'Virginia',
        'facts' : 'He was the first President who was not elected',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/john-tyler.jpg',
    },
    'james polk' : {
        'number' : 11,
        'firstname' : 'James K',
        'lastname' : 'Polk',
        'term' : 'March 4, 1845 - March 4, 1849',
        'party' : 'Democratic',
        'birthstate' : 'North Carolina',
        'facts' : 'Often referred to as the first “dark horse” President, Polk was the last strong President until the Civil War.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-knox-polk.jpg',
    },
    'zachary taylor' : {
        'number' : 12,
        'firstname' : 'Zachary',
        'lastname' : 'Taylor',
        'term' : 'March 4, 1849 - July 9, 1850',
        'party' : 'Whig',
        'birthstate' : 'Virgina',
        'facts' : '“Old Rough and Ready” never voted in an election prior to being on the ballot himself.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/zachary-taylor.gif',
    },
    'millard fillmore' : {
        'number' : 13,
        'firstname' : 'Millard',
        'lastname' : 'Fillmore',
        'term' : 'July 9, 1850 - March 4, 1853',
        'party' : 'Democratic',
        'birthstate' : 'New York',
        'facts' : 'Fillmore was the last Whig President; the party imploded soon after he left office.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/millard-fillmore.jpg',
    },
    'franklin pierce' : {
        'number' : 14,
        'firstname' : 'Franklin',
        'lastname' : 'Pierce',
        'term' : 'March 4, 1853 - March 4, 1857',
        'party' : 'Democratic',
        'birthstate' : 'New Hampshire',
        'facts' : 'The only president from New Hampshire also attended college in New England—Bowdoin College in Brunswick, Maine.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/franklin-pierce.jpg',
    },
    'james buchanan ' : {
        'number' : 15,
        'firstname' : 'James',
        'lastname' : 'Buchanan',
        'term' : 'March 4, 1857 - March 4, 1861',
        'party' : 'Democratic',
        'birthstate' : 'Pennsylvania',
        'facts' : 'While serving as minister to Great Britain, Buchanan helped draft the 1854 Ostend Manifesto, which advocated for an American invasion of Cuba',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-buchanan.jpg',
    },
    'abraham lincoln' : {
        'number' : 16,
        'firstname' : 'Abraham',
        'lastname' : 'Lincoln',
        'term' : 'July 9, 1850 - March 4, 1853',
        'party' : 'Republican',
        'birthstate' : 'Kentucky',
        'facts' : '“Honest Abe,” the tallest president at 6 feet 4 inches, may have had Marfan Syndrome, a genetic disorder that causes people to be very tall, thin and long limbed',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/abraham-lincoln.png',
    },
    'andrew johnson ' : {
        'number' : 17,
        'firstname' : 'Andrew',
        'lastname' : 'Johnson',
        'term' : 'April 15, 1865 - March 4, 1869',
        'party' : 'Democratic',
        'birthstate' : 'North Carolina',
        'facts' : 'Though one of the few Presidents without a pet, Johnson apparently cared for a family of White House mice, which he called “the little fellows.”',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/andrew-johnson.jpg',
    },
    'ulysses grant' : {
        'number' : 18,
        'firstname' : 'Ulysses S',
        'lastname' : 'Grant',
        'term' : 'March 4, 1869 - March 4, 1877',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Grant was invited to join Abraham Lincoln at Fords Theatre on the fateful evening of April 14, 1865, but was forced to decline after he and his wife made plans to visit their children in New Jersey.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/ulysses-grant.jpg',
    },
    'rutherford hayes' : {
        'number' : 19,
        'firstname' : 'Rutherford B',
        'lastname' : 'Hayes',
        'term' : 'March 4, 1877 - March 4, 1881',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Hayes was the first President to have a telephone in the White House.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/rutherford-hayes.jpg',
    },
    'james garfield' : {
        'number' : 20,
        'firstname' : 'James A',
        'lastname' : 'Garfield',
        'term' : 'March 4, 1881 - September 19, 1881',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Garfield (who was the first known left-handed President) was elected to the U.S. Senate, but he never served as Ohio senator because he then won the Republican nomination for president.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/james-garfield.jpg',
    },
    'chester arthur' : {
        'number' : 21,
        'firstname' : 'Chester',
        'lastname' : 'Arthur',
        'term' : 'September 19, 1881 - March 4, 1885',
        'party' : 'Republican',
        'birthstate' : 'Vermont',
        'facts' : 'Arthur was named in honor of Chester Abell, the doctor who delivered him.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/chester-arthur.jpg',
    },
    's grover cleveland' : {
        'number' : 22,
        'firstname' : 'S Grover',
        'lastname' : 'Cleveland',
        'term' : 'March 4, 1885 - March 4, 1889',
        'party' : 'Democratic',
        'birthstate' : 'New Jersey',
        'facts' : 'The only President to has ever served non-consecutive terms.  He also served as the 24th President',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/grover-cleveland.jpg',
    },
    'benjamin harrison' : {
        'number' : 23,
        'firstname' : 'Benjamin',
        'lastname' : 'Harrison',
        'term' : 'March 4, 1889 - March 4, 1893',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Harrison was the first president to hire a female White House staffer.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/benjamin-harrison.jpg',
    },
    'grover cleveland' : {
        'number' : 24,
        'firstname' : 'Grover',
        'lastname' : 'Cleveland',
        'term' : 'March 4, 1893 - March 4, 1897',
        'party' : 'Democratic',
        'birthstate' : 'New Jersey',
        'facts' : 'The only President to has ever served non-consecutive terms',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/grover-cleveland.jpg',
    },
    'william mcKinley' : {
        'number' : 25,
        'firstname' : 'William',
        'lastname' : 'McKinley',
        'term' : 'March 4, 1897 - September 14, 1901',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'McKinleys likeness appears on the $500 bill, which was discontinued in 1969.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/william-mckinley.jpg',
    },
    'theodore roosevelt' : {
        'number' : 26,
        'firstname' : 'Theodore',
        'lastname' : 'Roosevelt',
        'term' : 'July 9, 1850 - March 4, 1853',
        'party' : 'Republican',
        'birthstate' : 'New York',
        'facts' : 'Roosevelt was the youngest president, taking office at age 42.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/theodore-roosevelt.jpg',
    },
    'william taft' : {
        'number' : 27,
        'firstname' : 'William H',
        'lastname' : 'Taft',
        'term' : 'March 4, 1909 - March 4, 1913',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Famous for his corpulence, Taft was the first president to hurl the ceremonial first pitch at a Major League Baseball game.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/william-howard-taft.jpg',
    },
    'woodrow wilson' : {
        'number' : 28,
        'firstname' : 'Woodrow',
        'lastname' : 'Wilson',
        'term' : 'March 4, 1913 - March 4, 1921',
        'party' : 'Democratic',
        'birthstate' : 'Virginia',
        'facts' : 'In a 1914 proclamation, Wilson officially established the second Sunday in May as Mothers Day.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/woodrow-wilson.jpg',
    },
    'warren harding' : {
        'number' : 29,
        'firstname' : 'Warren G',
        'lastname' : 'Harding',
        'term' : 'March 4, 1921 - August 2, 1923',
        'party' : 'Republican',
        'birthstate' : 'Ohio',
        'facts' : 'Harding signed the Budget and Accounting Act, which established the first formal budgeting process and created the Bureau of the Budget.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/warren-harding.jpg',
    },
    'calvin coolidge' : {
        'number' : 30,
        'firstname' : 'Calvin',
        'lastname' : 'Coolidge',
        'term' : 'August 2, 1923 - March 4, 1929',
        'party' : 'Republican',
        'birthstate' : 'Vermont',
        'facts' : 'A quiet man, Coolidge purportedly replied, “You lose,” to a visitor who bet she could get at least three words out of him.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/calvin-coolidge.jpg',
    },
    'herbert hoover' : {
        'number' : 31,
        'firstname' : 'Herbert',
        'lastname' : 'Hoover',
        'term' : 'March 4, 1929 - March 4, 1933',
        'party' : 'Republican',
        'birthstate' : 'Iowa',
        'facts' : 'Hoover was the first president to hail from west of the Mississippi River.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/herbert-clark-hoover.jpeg',
    },
    'franklin d roosevelt' : {
        'number' : 32,
        'firstname' : 'Franklin D',
        'lastname' : 'Roosevelt',
        'term' : 'July 9, 1850 - March 4, 1853',
        'party' : 'Democratic',
        'birthstate' : 'New York',
        'facts' : 'The longest-serving commander-in-chief claimed to be distantly related to 11 other presidents, including his fifth cousin Theodore Roosevelt.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/f-d-roosevelt.jpg',
    },
    'harry truman' : {
        'number' : 33,
        'firstname' : 'Harry S',
        'lastname' : 'Truman',
        'term' : 'April 12, 1945 - January 20, 1953',
        'party' : 'Democratic',
        'birthstate' : 'Missouri',
        'facts' : 'The “S” in Harry S. Truman was just an initial; it did not stand for any name',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/harry-s-truman.jpg',
    },
    'dwight eisenhower' : {
        'number' : 34,
        'firstname' : 'Dwight D',
        'lastname' : 'Eisenhower',
        'term' : 'January 20, 1953 - January 20, 1961',
        'party' : 'Republican',
        'birthstate' : 'Texas',
        'facts' : 'World War II hero “Ike” was the first president to ride in a helicopter.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/dwight-d-eisenhower.jpg',
    },
    'john kennedy' : {
        'number' : 35,
        'firstname' : 'John F',
        'lastname' : 'Kennedy',
        'term' : 'January 20, 1961 - November 22, 1963',
        'party' : 'Democratic',
        'birthstate' : 'Massachusetts',
        'facts' : 'After being injured and honorably discharged in World War II, John F. Kennedy was briefly employed as a journalist during the waning weeks of the war.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/j-f-kennedy.jpg',
    },
    'lyndon johnson' : {
        'number' : 36,
        'firstname' : 'Lyndon B',
        'lastname' : 'Johnson',
        'term' : 'November 22, 1963 - January 20, 1969',
        'party' : 'Democratic',
        'birthstate' : 'Texas',
        'facts' : 'Johnsons first career was as a teacher. He worked at a school near the U.S.-Mexico border for four years before launching a career in politics.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/lyndon-b-johnson.jpg',
    },
    'richard nixon' : {
        'number' : 37,
        'firstname' : 'Richard',
        'lastname' : 'Nixon',
        'term' : 'January 20, 1969 - August 9, 1974',
        'party' : 'Republican',
        'birthstate' : 'California',
        'facts' : 'Nixon became such a skillful poker player while stationed in the Solomon Islands during World War II that his winnings helped launch his political career upon his return to the United States.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/r-m-nixon.jpg',
    },
    'gerald ford' : {
        'number' : 38,
        'firstname' : 'Gerald',
        'lastname' : 'Ford',
        'term' : 'August 9, 1974 - January 20, 1977',
        'party' : 'Republican',
        'birthstate' : 'Nebraska',
        'facts' : 'A star football player at the University of Michigan, Ford turned down offers from both the Detroit Lions and Green Bay Packers.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/g-r-ford.jpg',
    },
    'jimmy carter' : {
        'number' : 39,
        'firstname' : 'Jimmy',
        'lastname' : 'Carter',
        'term' : 'January 20, 1977 - January 20, 1981',
        'party' : 'Democratic',
        'birthstate' : 'Georgia',
        'facts' : 'In 1953, Carter gave up his successful military career to move back to Georgia and work on the family peanut farm.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/jimmy-carter.jpg',
    },
    'ronald reagan' : {
        'number' : 40,
        'firstname' : 'Ronald',
        'lastname' : 'Reagan',
        'term' : 'January 20, 1981 - January 20, 1989',
        'party' : 'Republican',
        'birthstate' : 'Illinois',
        'facts' : 'Reagan worked as a lifeguard and sportscaster before becoming an actor and, later, a politician.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/ronald-reagan.png',
    },
    'george hw bush' : {
        'number' : 41,
        'firstname' : 'George HW',
        'lastname' : 'Bush',
        'term' : 'January 20, 1989 - January 20, 1993',
        'party' : 'Republican',
        'birthstate' : 'Massachusetts',
        'facts' : 'While a student at Yale University, Bush was captain of the baseball team and met Babe Ruth.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/george-h-w-bush.jpg',
    },
    'bill clinton' : {
        'number' : 42,
        'firstname' : 'Bill',
        'lastname' : 'Clinton',
        'term' : 'January 20, 1993 - January 20, 2001',
        'party' : 'Democratic',
        'birthstate' : 'Arkansas',
        'facts' : 'Clinton played the saxophone and famously performed on the Arsenio Hall Show when he was a candidate for president.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/bill-clinton.jpg',
    },
    'george w bush' : {
        'number' : 43,
        'firstname' : 'George W',
        'lastname' : 'Bush',
        'term' : 'January 20, 2001 - January 20, 2009',
        'party' : 'Republican',
        'birthstate' : 'Connecticut',
        'facts' : 'Bush took up oil painting, exhibiting his work at the Museum of the Southwest in Texas.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/george-w-bush.jpg',
    },
    'barack obama' : {
        'number' : 44,
        'firstname' : 'Barack',
        'lastname' : 'Obama',
        'term' : 'January 20, 2009 - January 20, 2017',
        'party' : 'Democratic',
        'birthstate' : 'Hawaii',
        'facts' : 'Prior to becoming the first African American President, Obama won two Grammy Awards for “Best Spoken Word Album.”',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/barack-obama.jpg',
    },
    'donald trump' : {
        'number' : 45,
        'firstname' : 'Donald',
        'lastname' : 'Trump',
        'term' : 'January 20, 2017 - January 20, 2021',
        'party' : 'Republican',
        'birthstate' : 'New York',
        'facts' : 'Before becoming President, Trump was a real estate developer, entrepreneur and host of the NBC reality show, "The Apprentice."',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/donald-trump.jpg',
    },
    'joe biden' : {
        'number' : 46,
        'firstname' : 'Joe',
        'lastname' : 'Biden',
        'term' : 'January 20, 2021 - present',
        'party' : 'Democratic',
        'birthstate' : 'Pennsylvania',
        'facts' : 'Biden overcame a debilitating childhood stutter after enduring bullying over the condition in grade school.',
        'image' : 'https://www.examsegg.com/wp-content/uploads/2017/06/joe-biden-new-president-of-america-scaled.jpg',
    },
}


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

// 

app.get('/api/:pname', (request, response) => {
        const presName = request.params.pname.toLowerCase()
        const val = Object.values(presidents)
        let result = ''

        for (const value of val){
            if (value.firstname.toLowerCase() === presName || value.lastname.toLowerCase() === presName || value.number === Number(presName)){
                result = value
                break;
            }else{
                result = presidents['unknown']
            }
        }
        return response.json(result)
    })
                     
app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is active!!!`)
})