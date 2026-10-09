// contact number character limit 
const ContactNo = document.getElementById('ContactNo');

ContactNo.addEventListener('beforeinput', function(e) {
    if (e.data && !/\d/.test(e.data)) e.preventDefault();
  });   

ContactNo.addEventListener('input', function() {
  this.value = this.value.replace(/\D/g, '').slice(0, 11);
});   



// pages/api/register.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { Email, FirstName, LastName, FacebookName, ContactNo, FullAddress, Password } = req.body;

  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  await conn.execute(
    `INSERT INTO tblcustomer (Email, FirstName, LastName, FacebookName, ContactNo, FullAddress, Password)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [Email, FirstName, LastName, FacebookName, ContactNo, FullAddress, Password]
  );

  await conn.end();
  res.status(200).json({ message: 'Registration successful' });
}   