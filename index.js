const express = require("express");
const app = express();
// use the express.json() middleware to parse JSON data in the request body
app.use(express.json());


const { query, validationResult, body } = require("express-validator");


app.get("/person", query("name").notEmpty(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    res.send("person's name is " + req.query.name);
});

app.post("/new-person", body("email").isEmail().withMessage('Not a valid e-mail address'), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    res.send("person's email is " + req.body.email);
});

app.post(
    "/create-person",
    [
        body("password").isLength({ min: 5 }).withMessage('Min 5 characters password'),
        body("passwordConfirmation").custom((value, { req }) => value === req.body.password).withMessage('Not match password')
    ],
    (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    res.send("person's password is " + req.body.password + " " + req.body.passwordConfirmation);
});


app.listen(3000);