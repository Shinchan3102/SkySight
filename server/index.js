const app=require('express')();
const cors=require('cors');
const getClimate=require('./src/climate');

app.use(cors());

const port=process.env.PORT || 5000;

app.get('/',async(req,res)=>{
    try{
        //getting the page no. from the query
        const {page}=req.query;

        //getting the required data for the page using the function
        const climate=await getClimate(page);

        //sending data to the client
        res.status(201).json({"data":climate});
    }catch(err){
        res.status(404).json({err});
    }
})

app.listen(port,()=>{
    console.log(`listening on the port number ${port}`);
})