import express from "express"
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

//Ruta carpeta directorio de node.js
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const app = express()
const port = 3000

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", taskController.getAllTask);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTask);
app.get("/edit/:id", taskController.getEditTaskForm);
app.post("/edit/:id", taskController.editTask);
app.get("/delete/:id", taskController.deleteTask);


app.use(errorController.error404)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

