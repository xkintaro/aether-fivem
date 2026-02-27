import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const outputFile = path.resolve('../frontend/public/players.json')

app.post('/players', async (req, res) => {
  const { serverUrl } = req.body

  if (!serverUrl || typeof serverUrl !== 'string') {
    return res.status(400).json({ error: 'Enter a valid serverUrl.' })
  }

  try {
    new URL(serverUrl)
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format.' })
  }

  try {
    const response = await fetch(serverUrl)

    if (!response.ok) {
      console.error('❌ Server responded with error status:', response.status)
      return res.status(500).json({ error: 'Could not query the server.' })
    }

    const json = await response.json()

    fs.writeFileSync(outputFile, JSON.stringify(json, null, 2), 'utf-8')
    console.log('✅ Data written:', outputFile)
    return res.json({ message: 'Success', data: json })

  } catch (e) {
    console.error('🚫 Request or JSON parsing error:', e.message)
    return res.status(500).json({ error: 'Invalid JSON or network error.' })
  }
})

app.delete('/players', (req, res) => {
  try {
    fs.writeFileSync(outputFile, '[]', 'utf-8')
    console.log('🧹 players.json cleared')
    return res.json({ message: 'Cleared' })
  } catch (e) {
    console.error('❌ Clearing error:', e.message)
    return res.status(500).json({ error: 'Could not clear data.' })
  }
})

app.listen(PORT, () => {
  console.log(`🔧 Backend is running: http://localhost:${PORT}`)
})