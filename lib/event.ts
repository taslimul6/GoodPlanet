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
  hours?: string | number;
  /** how many people joined – added by the API on list endpoints */
  bookedCount?: number;
  status?: string;
  participants?: string[] | number;
  createdBy?: string;
  email?: string;
  eventId?:string;
}
