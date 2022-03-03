const express = require('express');
const app = express()
const port = 3005
const pgp = require("pg-promise")();

const db = pgp("postgres://nxethzmr:UP7bpesA8IqhcX1k03e3pnHNGXQrThUS@salt.db.elephantsql.com/nxethzmr");

// console.log(db);


// db.any("SELECT * from TASKS").then(tasks =>console.log(tasks));

// Database Config End

// Express Code Start
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // GET all tasks
  app.get('/tasks', (req, res) => {
      db.any("SELECT * from TASKS").then((tasks) => {
          res.send(tasks);
      })
    })
    
    // Creates a new task
    app.post('/tasks', (req, res) => {
        console.log("POST /tasks");
        const newTaskTitle = req.body.title;
        db.any(`INSERT INTO tasks (title) VALUES ('${newTaskTitle}')`)
        res.status(200)
        .send("New task created! " + newTaskTitle);
    });
    
    // Updates if task is completed
    app.patch('/tasks/:id/is_completed', (req, res) => {
        console.log("PATCH /tasks/:id/is_completed");
        const taskID = req.params.id;
        console.log(taskID);
        db.none(`UPDATE tasks SET is_completed = true WHERE id = ${taskID};`);
        res.send(`${taskID} has been completed`);
    });

    // Updates the task's title
    app.patch('/tasks/:id/title', (req, res) => {
        console.log("PATCH /tasks/:id/title");
        const taskID = req.params.id;
        const newTitle = req.body.title;
        console.log("Task Title ID", taskID);
        console.log("newTitle " + newTitle)
        db.none(`UPDATE tasks SET title = '${newTitle}' WHERE id = ${taskID};`);
        res.send(taskID);
    });
    
    app.delete('/tasks/:id', (req, res) => {
        console.log("DELETE /tasks/:id");
        const deleteID = req.params.id;
        console.log("task ID deleted", deleteID);
        db.none(`DELETE FROM tasks WHERE id = ${deleteID};`);
        res.send('deleteID')
    });
    
    // App is listening
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });