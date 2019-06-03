const express = require("express");
const ctrl = require('./controller')

const app = express();

app.use(express.json());

app.get(`/people/:type`, ctrl.getPeople);
app.get(`/planets`, ctrl.getPlanets);





app.listen(4000, () => console.log(`listening on 4000`));
