import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAppointmentQuery } from '../src/utils/ApiQueryBuilder.js';

test('buildAppointmentQuery devuelve filtros válidos', () => {
  const result = buildAppointmentQuery({
    status: 'Confirmada',
    doctor: '123',
    date: '2026-04-01'
  });

  assert.deepEqual(result, {
    status: 'Confirmada',
    doctor: '123',
    date: '2026-04-01'
  });
});

test('buildAppointmentQuery ignora filtros vacíos', () => {
  const result = buildAppointmentQuery({});
  assert.deepEqual(result, {});
});
