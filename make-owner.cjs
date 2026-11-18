const Database = require("better-sqlite3");
const db = new Database("store.db");

const user = db.prepare(
  "SELECT id, username FROM users WHERE username = ? COLLATE NOCASE"
).get("HD HAGED");

if (!user) {
  console.log("User not found! Check username.");
} else {
  db.prepare("UPDATE users SET role = ? WHERE id = ?")
    .run("owner", user.id);

  console.log("SUCCESS! HD HAGED IS NOW OWNER!");
}

db.close();
