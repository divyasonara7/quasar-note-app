import axios from 'axios'

const API_URL = 'http://localhost:3000'

export function getNotes() {
  return axios.get(`${API_URL}/notes`).then(response => response.data)
}
export function getNoteByID(id) {
  return axios.get(`${API_URL}/notes/${id}`).then(response => response.data)
}

export function createNote(note) {
  return axios.post(`${API_URL}/notes`, note).then(response => response.data)
}

export function updateNote(note) {
  return axios.put(`${API_URL}/notes/${note.id}`, note).then(response => response.data)
}

export function deleteNote(id) {
  return axios.delete(`${API_URL}/notes/${id}`).then(response => response.data)
}
