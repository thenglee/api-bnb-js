import express from 'express'
import { getAllPlaces, addPlace } from '../controllers/placeController.js'

const router = express.Router()

router.get('/places', getAllPlaces)
router.post('/places', addPlace)

export default router
