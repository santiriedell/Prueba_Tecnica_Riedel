import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSatelliteStore = defineStore('satellite', () => {
  const satelites = ref([])
  const cargando = ref(false)
  const seleccionados = ref([])
  const API_KEY = 'WTH9G4-STNTN8-R6NF4D-5Q8W'
  const CABA = { lat: -34.60, lng: -58.38 }

  async function cargarCategoria(idCat) {
    cargando.value = true
    try {
      const cat = Number(idCat)
      const url = `/api/above/${CABA.lat}/${CABA.lng}/0/70/${cat}?apiKey=${API_KEY}`
      const { data } = await axios.get(url)

      if (data.above) {
        satelites.value = data.above.slice(0, 10).map(s => ({
          id: s.satid,
          name: s.satname,
          lat: 'Cargando',
          lng: 'Cargando',
          alt: s.satalt
        }))
        await actualizarPosiciones()
      }
    } catch (error) {
      console.error("Error en API:", error)
    } finally {
      cargando.value = false
    }
  }

  async function actualizarPosiciones() {
    for (let s of satelites.value) {
      try {
        const urlPos = `/api/positions/${s.id}/${CABA.lat}/${CABA.lng}/0/1?apiKey=${API_KEY}`
        const { data } = await axios.get(urlPos)
        if (data.positions) {
          s.lat = data.positions[0].satlatitude.toFixed(4)
          s.lng = data.positions[0].satlongitude.toFixed(4)
        }
      } catch (e) { console.log("Error en sat:", s.id, e) }
    }
  }

  function toggleSeleccion(sat) {
    const idx = seleccionados.value.findIndex(x => x.id === sat.id)
    if (idx !== -1) {
      seleccionados.value.splice(idx, 1)
      return
    }
    if (seleccionados.value.length >= 5) return
    seleccionados.value.push({ id: sat.id, name: sat.name, lat: sat.lat, lng: sat.lng, alt: sat.alt })
  }

  async function guardarSeleccion(user) {
    const url = 'http://localhost:3000/api/guardar'

    const payload = { user: user || null, satellites: seleccionados.value.map(s => ({ id: s.id, name: s.name })) }
    const { data } = await axios.post(url, payload)
    return data
  }

  return { satelites, cargando, cargarCategoria, actualizarPosiciones, seleccionados, toggleSeleccion, guardarSeleccion }
})
