export function buildAppointmentQuery(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.doctor) filter.doctor = query.doctor;
  if (query.date) filter.date = query.date;
  return filter;
}
