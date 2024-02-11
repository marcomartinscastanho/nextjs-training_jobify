"use server";

import { CreateAndEditJobType, JobType, createAndEditJobSchema } from "@/types/job";
import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
