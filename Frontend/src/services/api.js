const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const session = JSON.parse(localStorage.getItem('hci_session') || 'null');
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {})
    },
    ...options
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  return data;
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  getPatients: () => request('/patients'),
  createPatient: (body) => request('/patients', { method: 'POST', body: JSON.stringify(body) }),
  updatePatient: (id, body) => request(`/patients/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePatient: (id) => request(`/patients/${id}`, { method: 'DELETE' }),

  getDoctors: () => request('/doctors'),
  createDoctor: (body) => request('/doctors', { method: 'POST', body: JSON.stringify(body) }),
  updateDoctor: (id, body) => request(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteDoctor: (id) => request(`/doctors/${id}`, { method: 'DELETE' }),

  getAppointments: () => request('/appointments'),
  createAppointment: (body) => request('/appointments', { method: 'POST', body: JSON.stringify(body) }),
  updateAppointment: (id, body) =>
    request(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAppointment: (id) => request(`/appointments/${id}`, { method: 'DELETE' })
};
