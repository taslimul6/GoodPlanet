export interface Event {
  _id?: string;
  title?: string;
  category?: string;
  organizer?: string;
  description?: string;
  date?: string | number;
  location?: string;
  image?: string;
  capacity?: string | number;
  status?: string;
  participants?: string[] | number;
  createdBy?: string;
  email?: string;
}
