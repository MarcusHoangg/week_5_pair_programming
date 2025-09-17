import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(4500);
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    // Optional: basic validation
    if (!title || !description || !companyName || !contactEmail) {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title,
        type,
        description,
        companyName,
        contactEmail,
        contactPhone,
        location,
        salary: Number(salary),
      };

      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
      console.error("Error adding job:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="type">Job type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />

        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
