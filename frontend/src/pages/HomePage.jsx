import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
