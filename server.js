import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql2'

const app = express()
const PORT = 3000


app.use(cors())
app.use(bodyParser.json())


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'satelite_db'
})

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err)
  } else {
    console.log('✅ Conectado a MySQL')

    const sql = `
      CREATE TABLE IF NOT EXISTS selecciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(150) NOT NULL,
        satellites JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `
    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ Error creando tabla:', err)
      } else {
        console.log('✅ Tabla selecciones lista o ya existe')
      }
    })
  }
})


app.get('/api/listado', (req, res) => {
  db.query('SELECT * FROM selecciones', (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err })
    res.json(results)
  })
})


app.post('/api/guardar', (req, res) => {
  console.log('📨 Petición recibida:', req.body)
  const { user, satellites } = req.body

  if (!user || !satellites) {
    console.log('❌ Faltan datos: user=', user, 'satellites=', satellites)
    return res.json({ success: false, message: 'Datos incompletos' })
  }

  const sql = 'INSERT INTO selecciones (user_name, satellites) VALUES (?, ?)'
  db.query(sql, [user, JSON.stringify(satellites)], (err, result) => {
    if (err) {
      console.error('❌ Error en INSERT:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
    console.log('✅ Guardado exitoso. ID:', result.insertId)
    res.json({ success: true, id: result.insertId })
  })
})


app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`))

