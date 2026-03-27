# Especificación de API

## Autenticación
### POST /api/auth/register
Request:
```json
{
  "name": "Administrador",
  "email": "admin@clinica.com",
  "password": "Admin123!",
  "role": "admin"
}
```

### POST /api/auth/login
Request:
```json
{
  "email": "admin@clinica.com",
  "password": "Admin123!"
}
```

## Pacientes
### GET /api/patients
Retorna todos los pacientes.

### POST /api/patients
Campos:
- fullName
- birthDate
- address
- phone
- sex
- disability
- maritalStatus
- email

## Médicos
### GET /api/doctors
Lista de especialistas.

### POST /api/doctors
Campos:
- fullName
- specialty
- phone
- email
- officeHours

## Citas
### GET /api/appointments
Puede filtrar por:
- status
- doctor
- date

### POST /api/appointments
Campos:
- patient
- doctor
- specialty
- date
- time
- reason
- status
- diagnosis
- treatment
