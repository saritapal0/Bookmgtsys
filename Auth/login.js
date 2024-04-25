const express = require("express");
const router= express.Router();
const jwt = require("jsonwebtoken");
const ResponseManager = require("../response/responseManager");
const loginservice = require("../services/loginservice/loginservices");

const secret_key = '12';

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const client = await loginservice.getClientByEmailANDPassword(Email, Password);
    if (client !== null && client.length > 0) {
      const clientData = {
        id: client[0].client_id,
        name: client[0].name,
        Email: client[0].email,
        Password: client[0].password,
        Phone: client[0].phone_number,
        City: client[0].city
      };

      jwt.sign(
        { clientData },
        secret_key,
        { expiresIn: "2h" },
        (err, jwtToken) => {
          if (err) {
            console.error("Error generating token:", err);
            return ResponseManager.sendError(
              res,
              500,
              "ERR_GENERATING_TOKEN",
              "Error generating token"
            );
          }
          ResponseManager.sendSuccess(
            res,
            { client: clientData, jwtToken },
            200,
            "Login successful"
          );
        }
      );
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Server error:", error);
    if (error.message === "Invalid credentials") {
      ResponseManager.sendError(
        res,
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    } else if (error.message.includes("undefined")) {
      ResponseManager.sendError(res, 404, "CLIENT_NOT_FOUND", "Client not found");
    } else {
      ResponseManager.sendError(
        res,
        500,
        "SERVER_ERROR",
        "Internal server error"
      );
    }
  }
});
module.exports = router;
