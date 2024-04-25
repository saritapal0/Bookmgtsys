const db = require("../../Auth/login");

class loginservice {
  async getClientByEmailANDPassword(email,password) {
    try {
      const [client] = await db.query(
        "SELECT * FROM clients WHERE email = ? AND password = ?",
        [email, password]
      );
      return client;
    } catch (error) {
      console.error("Error fetching user by email and password:", error);
      throw error;
    }
  }

  async getclientById(client_id) {
    try {
      if (client_id === undefined) {
        throw new Error("client_id is not valid");
      }

      const [clientData] = await db.query(
        "SELECT * FROM clients WHERE client_id = ?",
        [client_id]
      );
      return clientData || null;
    } catch (error) {
      console.error("Error fetching  by ID:", error);
      throw error;
    }
  }
}

module.exports = new loginservice();