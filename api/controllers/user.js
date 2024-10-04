import {db} from "../db.js"
import  bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const getUser = (req,res) =>{
    const q =  
        "SELECT `username`, `email` FROM users WHERE id = ?"
        db.query(q, [req.params.id], (err,data)=>{
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    }); 
}

export const updateUsername = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid.");

        const userId = req.params.id;
        const {username} = req.body;

        if (!username) {
            return res.status(400).json("Missing username in request body.");
        }

        const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
        db.query(checkUsernameQuery, [username], (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            if (data.length) {
                return res.status(409).json("User already exists");
            }

            const updateUsernameQuery = "UPDATE users SET username = ? WHERE id = ?";
            db.query(updateUsernameQuery, [username, userId], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error", error: err });
                }

                return res.json("Username has been updated!");
            });
        });
    });
};


export const updateEmail = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid.");

        const userId = req.params.id;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json("Missing email in request body.");
        }
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailQuery, [email], (err, data) => {
            if (err) {
                console.error("Database error", err);
                return res.status(500).json({ message: "Database error", error: err });
            }

            if (data.length) {
                console.log("Conflict: Email already exists.");
                return res.status(409).json("User already exists");
            }
            const updateEmailQuery = "UPDATE users SET email = ? WHERE id = ?";
            db.query(updateEmailQuery, [email, userId], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server", error: err });
                }

                return res.json("Email has been updated!");
            });
        });
    });
};

export const checkUser = (req, res) => {
    const {username} = req.body;
    const {email} = req.body;
    if (!username || !email) {
        return res.status(400).json({ error: "Missing fields in the request." });
    }

    const q = "SELECT id, `username`, `email` FROM users WHERE username = ? AND email=?";

    db.query(q, [username, email], (err, data) => {
        if (err) return res.status(500).send(err);
        
        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data[0]);
    });
}

export const updatePassword = (req,res)=>{
    const userId = req.params.id;
    
    const {password} = req.body;
    if (!password) {
        return res.status(400).json("Missing field in request body.");
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "UPDATE users SET `password` = ? WHERE `id` = ? ";
    const values=[hash]

    db.query(q, [...values, userId],(err, data) => {
        if (err) {
        console.error("Database error", err);
        return res.status(500).json("Internal server error");
        }
        return res.status(200).json("Password has been updated.");
    });        
}
