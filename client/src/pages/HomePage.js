import React from "react";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <main className="flex-1 p-6">
        <EventCard
          time="12:00 to 1:00"
          date="Friday, 23 oct 2023"
          title="Blockchain & AI in Digital Marketing"
          onViewClick={() => console.log("Navigating to event details")}
          onHistoryClick={() => console.log("Navigating to event history")}
        />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProfileCard
            name="AAA"
            role="Blockchain | AI expert"
            company="Wipro.inc"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
          <ProfileCard
            name="BBB"
            role="FULLSTACK"
            company="abc"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
          <ProfileCard
            name="CCC"
            role="WEDDEVELOPEMENT"
            company="Info"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
          <ProfileCard
            name="DDD"
            role="Datascientist"
            company="Openai"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
          <ProfileCard
            name="EEE"
            role="Daatbase management"
            company="Mngo"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
          <ProfileCard
            name="FFF"
            role="Business Analyst"
            company="AK"
            onProfileClick={() => console.log("Navigating to profile page")}
          />
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default HomePage;