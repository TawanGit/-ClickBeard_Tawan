export type StatusKey = "scheduled" | "completed" | "canceled";

export type Barber = {
  id: number;
  name: string;
};

export type Client = {
  id: number;
  name: string;
};

export type Appointment = {
  id: number;
  barber_name: string;
  client_name: string;
  status: StatusKey;
  appointment_date: string;
};

export type CreateBarber = {
  name: string;
  cpf: string;
  age: number;
  accountingDate: string;
  speciality: number | null;
  token: string | null;
};

export type NotificationsApi = {
  id: string;
  client_id: number;
  message: string;
  is_read: boolean;
  created_at: Date;
  name: string;
  email: string;
};
export type MessageSuccessOrError = {
  text: string;
  type: "error" | "success";
};
export type TodayOrFuture = "today" | "future";

export type activeModalAdmin =
  | ""
  | "barber"
  | "specialty"
  | "addSpecialtyToBarber";

export type Specialties = {
  id: number;
  name: string;
};
