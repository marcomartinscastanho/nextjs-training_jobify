"use client";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, page],
    queryFn: () => getAllJobsAction({ search, jobStatus, page }),
  });

  const jobs = data?.jobs || [];

  if (isPending) {
    return <h2 className="text-xl">Please wait...</h2>;
  }

  if (jobs.length < 1) {
    return <h2 className="text-xl">No jobs found...</h2>;
  }

  return (
    <>
      <div className="gird md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobsList;
