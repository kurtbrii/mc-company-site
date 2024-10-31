import { ROLE } from "@prisma/client";

export interface UserProps {
  id: string;
  fullName: string;
  role: ROLE;
  currentTimeInId: string | null;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}