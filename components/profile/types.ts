export interface VolunteerLogItem {
  eventId: string;
  title?: string;
  category?: string;
  location?: string;
  date?: string;
  hours: number;
}

export interface ProfileStats {
  joined: number;
  upcoming: number;
  completed: number;
  created: number;
  saved: number;
  following: number;
  volunteerHours: number;
  history: VolunteerLogItem[];
}

export interface FollowedOrganizer {
  organizer: string;
  followedAt?: string;
  eventsCount: number;
  upcomingCount: number;
  followers: number;
}
