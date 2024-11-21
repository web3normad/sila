import React from "react";
import { Globe, Code, Users, Target, Award, Zap, Shield } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import Profile from "../assets/images/profile-img.jpeg";

const TeamMember = ({ name, role, image }) => (
  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 text-center">
    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-black dark:border-white">
      <img
        src={image || Profile}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600 dark:text-gray-400">{role}</p>
  </div>
);

const About = () => {
  const milestones = [
    {
      icon: Code,
      title: "Project Inception",
      description:
        "Born from the need to simplify blockchain authentication and wallet connections.",
    },
    {
      icon: Users,
      title: "Community Growth",
      description:
        "Rapidly expanding developer community passionate about open-source solutions.",
    },
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Making blockchain technology more accessible and user-friendly for developers worldwide.",
    },
  ];

  return (
    <div className="min-h-screen py-32 bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1
          className="text-5xl font-bold mb-6 
          bg-gradient-to-r from-black via-gray-800 to-black 
          dark:from-white dark:via-gray-200 dark:to-white 
          bg-clip-text text-transparent"
        >
          About Sila
        </h1>
        <p
          className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300"
        >
          Simplifying blockchain authentication and wallet connections for
          developers around the globe.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Sila was born from a simple yet powerful idea: blockchain
              authentication should be intuitive, seamless, and accessible to
              developers of all skill levels.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Frustrated by complex integration processes and fragmented wallet
              connection libraries, our team set out to create a plug-and-play
              solution that would democratize blockchain development.
            </p>
            <div className="flex items-center mt-6">
              <Globe className="mr-3 w-8 h-8" />
              <span className="text-lg">
                Global Perspective, Developer-First Approach
              </span>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Shield className="mr-3 text-black dark:text-white" />
                <span>Simplicity in Complex Technologies</span>
              </li>
              <li className="flex items-center">
                <Zap className="mr-3 text-black dark:text-white" />
                <span>Rapid Development and Innovation</span>
              </li>
              <li className="flex items-center">
                <Users className="mr-3 text-black dark:text-white" />
                <span>Community-Driven Open Source</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-900 
                p-6 rounded-lg text-center 
                transform hover:-translate-y-2 transition"
            >
              <milestone.icon
                className="mx-auto mb-4 w-12 h-12 
                text-black dark:text-white"
              />
              <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet the Contributors
        </h2>
        <div className="grid md:grid-cols-1 justify-center">
          <TeamMember name="Emmanuel Doji" role="Founder & Lead Developer" />
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
        <p
          className="text-xl max-w-2xl mx-auto mb-10 
          text-gray-700 dark:text-gray-300"
        >
          Whether you're a developer, contributor, or blockchain enthusiast,
          there's a place for you in the Sila community.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/your-sila-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black text-white 
              dark:bg-white dark:text-black px-6 py-3 
              rounded-lg hover:opacity-90 transition"
          >
            <FiGithub className="mr-2" /> Contribute
          </a>
          <a
            href="/contact-us"
            className="flex items-center border border-black 
              dark:border-white px-6 py-3 
              rounded-lg hover:bg-gray-100 
              dark:hover:bg-gray-900 transition"
          >
            <Users className="mr-2" /> Connect with Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
