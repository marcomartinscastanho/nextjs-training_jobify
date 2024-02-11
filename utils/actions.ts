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
