require('dotenv').config();
const express = require('express');
const configViewEngine=require('./config/viewEngine');


const app = express();
const webRoutes=require('./routes/web');
const port = process.env.PORT ||8888;
const hostname=process.env.HOST_NAME;

//config template engine
configViewEngine(app);
app.use('/test',webRoutes);



// Lắng nghe trên cổng đã đặt
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
