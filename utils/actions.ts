"use server";

import {
  CreateAndEditJobType,
  JobType,
  GetAllJobsResponseType,
  createAndEditJobSchema,
  GetAllJobsRequestType,
} from "@/types/job";
import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { StatsType } from "@/types/stats";

const authenticateAndRedirect = (): string => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType,
): Promise<JobType | null> => {
  const userId = authenticateAndRedirect();
  createAndEditJobSchema.parse(values);
  return prisma.job.create({
    data: { ...values, clerkId: userId },
  });
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsRequestType): Promise<GetAllJobsResponseType> => {
  const userId = authenticateAndRedirect();

  let where: Prisma.JobWhereInput = {
    clerkId: userId,
  };

  if (search) {
    where = {
      ...where,
      OR: [{ position: { contains: search } }, { company: { contains: search } }],
    };
  }

  if (jobStatus && jobStatus !== "all") {
    where = { ...where, status: jobStatus };
  }

  const jobs: JobType[] = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return { jobs, count: 0, page: 1, totalPages: 0 };
};

export const deleteJobAction = (id: string): Promise<JobType> => {
  const userId = authenticateAndRedirect();
  return prisma.job.delete({
    where: { id, clerkId: userId },
  });
};

export const getJobAction = (id: string): Promise<JobType> => {
  const userId = authenticateAndRedirect();

  return prisma.job.findUniqueOrThrow({
    where: {
      id,
      clerkId: userId,
    },
  });

  // redirect('/jobs')
};

export const updateJobAction = (
  id: string,
  values: CreateAndEditJobType,
): Promise<JobType> => {
  const userId = authenticateAndRedirect();

  return prisma.job.update({
    where: { id, clerkId: userId },
    data: { ...values },
  });
};

export const getStatsAction = async (): Promise<StatsType> => {
  const userId = authenticateAndRedirect();

  const rawStats = await prisma.job.groupBy({
    where: { clerkId: userId },
    by: ["status"],
    _count: { status: true },
  });

  const parsedStats = rawStats.reduce(
    (acc, curr) => ({ ...acc, [curr.status]: curr._count.status }),
    {} as Record<string, number>,
  );

  const defaultStats = {
    pending: 0,
    declined: 0,
    interview: 0,
  };

  return { ...defaultStats, ...parsedStats };
};
