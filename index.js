const {  Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: true
});
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/cool', (req, res) => res.send(cool()))
  .get('/home', (req, res) => res.send(home()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/populate', (req, res) => {
    console.log("received request for populate");

    var weight = 0, type = 0, cost = 0, type2 = 0;
    var params = {weight: weight, type: type, cost: cost, type2: type2}

    res.render('public/jobs.html', params);
  })

  .get('/daily', async (req, res) => {
    console.log("received request for daily");

    try {

      const client = await pool.connect()
      const member = await client.query('SELECT * FROM Member');
      const params = { 'member': (member) ? member.rows : null };

      res.render('pages/daily', params );

      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }

  })

  .get('/week', async (req, res) => {
    console.log("received request for week");
    try {

      const client = await pool.connect()
      const member = await client.query('SELECT * FROM Member');
      const job    = await client.query('SELECT * FROM Job');

      const params = { 'member': (member) ? member.rows : null, 
                        'job'  : (job)    ? job.rows    : null  };

      res.render('pages/week', params);

      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }

  })

  .get('/monthly', async (req, res) => {
    try { 
      console.log("received request for monthly");

      const client = await pool.connect()
      const member = await client.query('SELECT * FROM Member');
      const job    = await client.query('SELECT * FROM Job');
      var date = ['7th', '11th', '14th', '21st'];

      const params = { 'member': (member) ? member.rows : null, 
                        'job'  : (job)    ? job.rows    : null, date: date  };

      res.render('pages/monthly', params);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }

  })

  .get('/getRate', (req, res) => {
    console.log("received request for getRate");
    console.log("weight is " + req.query.weight);

    var weight = req.query.weight;
    var type   = req.query.type;
    var cost = calculateRate(weight, type);
    console.log('type ' + type);
    switch (type) { 
      case "Stamped Letter":
        type2 = "letter";
        break;
      case "Metered Letter":
        type2 = "letter";
        break;
      case "Large flat Envelope":
        type2 = "envelope";
        break;
      case "Package":
        type2 = "package";
        break;
    }
    var params = {weight: weight, type: type, cost: cost, type2: type2}

    res.render('pages/getRate', params);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => { 
    let result = ''
    const times = process.env.TIMES || 5 
    for (i=0; i < times; i++) {
      result += i + ' '
    }
    return result
  }

  function selectMember(dropdown) {
  // selectMember = (dropdown) => {
    console.log("received request for selectMember");

    switch (dropdown) { 
      case "Nate":
        console.log("Nate");
        var message = "Monday: Wash the dishes<br>Wednesday: Empty the dishwasher<br>Friday: Wash the dishes, Make dinner<br>";
        document.getElementById('jobs').innerHTML = message;
        
        break;
      case "Jen":


        break;
      case "gpa":
  
  
        break;
      case "gma":
    
      
        break;
      case "Natalie":
        
      
        break;
      case "Ava":
      
      
        break;
      case "Corbin":
      
      

        break;
    }
    var member = req.query.dropdown;
    var params = {member: member, message, message };

    // res.render('pages/daily', params);

  }


  calculateRate = (weight, type) => { 
    console.log("calculateRate function is called");
    console.log("inside calculateRate weight is " + weight);

    switch (type) { 
      case "Stamped Letter":
        if (weight < 1)      { cost = 0.55; }
        else if (weight < 2) { cost = 0.70; }
        else if (weight < 3) { cost = 0.85; }
        else                 { cost = 1.00; }
        break;
      case "Metered Letter":
        if (weight < 1)      { cost = 0.50; }
        else if (weight < 2) { cost = 0.65; }
        else if (weight < 3) { cost = 0.80; }
        else                 { cost = 0.95; }
        break;
      case "Large flat Envelope":
        if (weight < 1)       { cost = 1.00; }
        else if (weight < 2)  { cost = 1.15; }
        else if (weight < 3)  { cost = 1.30; }
        else if (weight < 4)  { cost = 1.45; }
        else if (weight < 5)  { cost = 1.60; }
        else if (weight < 6)  { cost = 1.75; }
        else if (weight < 7)  { cost = 1.90; }
        else if (weight < 8)  { cost = 2.05; }
        else if (weight < 9)  { cost = 2.20; }
        else if (weight < 10) { cost = 2.35; }
        else if (weight < 11) { cost = 2.50; }
        else if (weight < 12) { cost = 2.65; }
        else                  { cost = 2.80; }
        break;
      case "Package":
        // zones 1 & 2
        if      (weight < 4)  { cost = 3.66; }
        else if (weight < 8)  { cost = 4.39; }
        else if (weight < 12) { cost = 5.19; }
        else                  { cost = 5.71; }
        break;
    }

    console.log("cost is " + cost);
    console.log("type " + type);

    return cost;
  }