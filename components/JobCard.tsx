import { JobType } from "@/types/job";
import React, { FC } from "react";

interface Props {
  job: JobType;
}

const JobCard: FC<Props> = ({ job }) => {
  return <div>JobCard</div>;
};

export default JobCard;
