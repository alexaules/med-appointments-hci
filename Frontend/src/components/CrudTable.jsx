export default function CrudTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="crud-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                <td className="actions">
                  <button className="btn-small" onClick={() => onEdit(row)}>
                    Editar
                  </button>
                  <button className="btn-small danger" onClick={() => onDelete(row._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No hay registros disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
