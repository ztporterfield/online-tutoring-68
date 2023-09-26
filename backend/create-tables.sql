create table if not exists Users (
  ID int primary key auto_increment,
  Email varchar(255) not null unique,
  FirstName varchar(255) not null,
  LastName varchar(255) not null,
  HashedPassword binary(16) not null,
  HoursCompleted int not null,
  ProfilePictureID varchar(255)
  IsTutor bool not null,
);
create table if not exists Students (
  ID int primary key references Users(ID) on delete cascade
);
create table if not exists Tutors (
  ID int primary key references Users(ID) on delete cascade,
  Bio varchar(400),
  Subject varchar(50) not null,
  AvailableHoursStart time not null,
  AvailableHoursEnd time not null
);
create table if not exists FavoritesList (
  StudentID int references Students(ID),
  TutorID int references Tutors(ID),
  primary key(StudentID, TutorID)
);
create table if not exists Appointments (
  ID int primary key auto_increment,
  StudentID int not null references Students(ID),
  TutorID int not null references Tutor(ID),
  AppointmentDate date not null,
  StartTime time not null,
  EndTime time not null,
  Subject varchar(50) not null,
  AppointmentNotes varchar(400),
  MeetingLink varchar(255)
);
