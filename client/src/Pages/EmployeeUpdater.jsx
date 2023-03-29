import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchLocation = () => {
  return fetch('/api/locations/').then((res) => res.json())
};

const fetchCompanies = () => {
  return fetch('/api/companies/').then((res) => res.json())
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });

    fetchLocation()
      .then((locations) => {
        setLocations(locations)
      })
    
    fetchCompanies()
      .then((companies) => {
        setCompanies(companies)
      })
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      locations={locations}
      companies={companies}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
