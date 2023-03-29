import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createCompany = (company) => {
  return fetch("/api/companies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: company}),
  }).then((res) => res.json());
};


const CompanyCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const handleCreateCompany = () => {
    setLoading(true);

    createCompany(companyName)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(companyName);

  return (
    <>
        <input value={companyName} onChange={(event) => setCompanyName(event.target.value)}></input>
        <button onClick={handleCreateCompany}>Save Company</button>
    </>
  );
};

export default CompanyCreator;
