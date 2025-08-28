
const bcrypt = require('bcrypt');

// In-memory user storage
const users = [];

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static async findOne({ username }) {
    return users.find(user => user.username === username) || null;
  }

  async save() {
    users.push(this);
  }

  static getAll() {
    return users;
  }
}

module.exports = User;