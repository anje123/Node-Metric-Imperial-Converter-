const helmet = require('helmet');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(helmet.xssFilter());

app.use(express.static('./public'));

app.post('/api/convert',(req,res)=>{
    
    let tnum,num,unit;;
    const value = req.body.input;
     num = value.split(/[a-zA-Z]+/g);
     unit = value.match(/[a-zA-Z]+/g);


function fraction_() {

    if(num[0].includes('/')){

        if(num[0].split("/")[2]) res.status(400).send('invalid number');
        const fraction = num[0].split('/');
        if ( fraction[0].length === 0 || fraction[1].length === 0 ) res.status(400).send('invalid number');
        tnum = Number(fraction[0]) / Number(fraction[1]);
        
        return tnum;
    }else{
        if(num[0] == '') return tnum = 1;
        
        return  Number(num[0]);
    }
          
}

function invalid() {
    const valid = unit == 'gal' || unit == 'lbs' ||  unit == 'mi' || unit == 'L' || unit == 'kg' || unit == 'km'
    if((num[0].split('/').length > 2) && !valid) return res.send('invalid number and unit');
}
invalid();

function calc_mul(metric) {
        return Number(tnum)*metric;
    }


function calc_division(metric) {
return Number(tnum)/metric;
}
    
function res_(tnum,result,unit,returnUnit) {
return  res.send(`${tnum} ${unit} converts to ${result.toFixed(5)} ${returnUnit}`);
}

tnum = fraction_();

function convert_() {
if(unit == 'gal'){
    res_(tnum,calc_mul(3.78541),unit,'L');
    }else if(unit == 'lbs'){
        res_(tnum,calc_mul(0.453592),unit,'kg');
    }else if(unit == 'mi' ){
        res_(tnum,calc_mul(1.60934),unit,'km');
    } else if (unit == 'L') {
        res_(tnum,calc_division(3.78541),unit,'gal');
    }else if(unit == 'kg'){
        res_(tnum,calc_division(0.453592),unit,'lbs');
    }else if(unit == 'km'){
                res_(tnum,calc_division(0.453592),unit,'lbs');

    }else{
        res.send('invalid unit');
    } 
}
convert_();




});

const port = process.env.PORT||3000;
const server = app.listen(port,()=>{
    console.log(`LISTENING TO ${port}`);
});

module.exports = server;