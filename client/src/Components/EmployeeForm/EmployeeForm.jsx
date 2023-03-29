const brands = ["Acer", "Razer", "HP"]; //mit endpoint lösen? 

const EmployeeForm = ({ onSave, disabled, employee, locations, companies, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    console.log(locations);

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    const employeeToSave = {...employee, location: { city: employee.location }, company: { name: employee.company}}

    return onSave(employeeToSave);
  };

  console.log(locations);

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="brand">Brand:</label>
        <select
          defaultValue={employee ? employee.brand : null}
          name="brand"
          id="brand"
        >
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="location">Locations:</label>
        <select
          name="location"
          id="location"
        >
          {locations && locations.map((location, index) => (
            <option key={index} value={location.city}>
              {location.city}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="company">Companies:</label>
        <select
          name="company"
          id="company"
        >
          {companies && companies.map((company, index) => (
            <option key={index} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
