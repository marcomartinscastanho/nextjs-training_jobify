import { JobType } from "@/types/job";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobButton";
import JobCardInfo from "./JobCardInfo";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import { Badge } from "./ui/badge";

interface Props {
  job: JobType;
}

const JobCard: FC<Props> = ({ job }) => {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobCardInfo icon={<Briefcase />} text={job.mode} />
        <JobCardInfo icon={<MapPin />} text={job.location} />
        <JobCardInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobCardInfo icon={<RadioTower className="w-4 h-4" />} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
