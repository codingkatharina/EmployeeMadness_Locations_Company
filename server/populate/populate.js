/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");
const locations = require("./locations.json");
const companies = require("./companies.json");

const EmployeeModel = require("../db/employee.model");
const LocationModel = require("../db/location.model");
const CompanyModel = require("../db/company.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];


const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    location: pick(locations),
    brand: pick(brands),
    company: pick(companies),
    city: null
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateLocation = async () => {
  await LocationModel.deleteMany({});
    
    await LocationModel.create(...locations);
    console.log("Locations created");
};

const populateCompanies = async () => {
  await CompanyModel.deleteMany({});

    await CompanyModel.create(...companies);
    console.log("Companies created");
}


const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateLocation();

  await populateCompanies();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
