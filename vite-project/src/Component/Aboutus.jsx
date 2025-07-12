import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import Jay from "../assets/jay.jpg";
import Soham from "../assets/soham.png";
import Chetan from "../assets/chetan.jpg";
import Darshit from "../assets/boss.jpg";

const Aboutus = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jay Hirapara",
      role: "AI Developer",
      image: Jay,
      description:
        "Lead developer passionate about creating intuitive user experiences and scalable architectures.",
      skills: ["React", "Node.js", "MongoDB"],
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 2,
      name: "Soham Patil",
      role: "Full Stack Developer",
      image: Soham,
      description:
        "Backend specialist focused on building robust APIs and optimizing database performance.",
      skills: ["Express.js", "PostgreSQL", "Docker"],
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 3,
      name: "Chetan Ahuja",
      role: "AI Developer",
      image: Chetan,
      description:
        "Creative designer with a keen eye for modern, accessible, and user-centric interfaces.",
      skills: ["Figma", "Tailwind CSS", "Framer"],
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 4,
      name: "Darshit Khandelwal",
      role: "Blockchain Developer",
      image: Darshit,
      description:
        "Frontend enthusiast specializing in creating responsive and performant web applications.",
      skills: ["React", "TypeScript", "Redux"],
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden py-6 sm:py-10">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        <div className="absolute top-0 right-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            Meet Our Team
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto">
            The brilliant minds behind{" "}
            <span className="text-red-500 font-bold">StackIt</span> - A minimal
            question-and-answer platform that supports collaborative learning
            and structured knowledge sharing.
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-4 sm:p-6 rounded-2xl border border-gray-800/50 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">4</div>
            <div className="text-gray-400 text-sm sm:text-base">Team Members</div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-4 sm:p-6 rounded-2xl border border-gray-800/50 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-400 text-sm sm:text-base">Hackathon Mode</div>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-4 sm:p-6 rounded-2xl border border-gray-800/50 text-center">
            <div className="text-3xl sm:text-4xl font-bold text-red-400 mb-2">∞</div>
            <div className="text-gray-400 text-sm sm:text-base">Passion</div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-4 sm:p-6 rounded-2xl border border-gray-800/50 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:border-gray-700/50"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 rounded-2xl transition-all duration-300"></div>

              <div className="relative z-10">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-gray-700 group-hover:border-purple-600/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>

                {/* Member Info */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-purple-400 mb-3 text-center font-medium">
                  {member.role}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 text-center leading-relaxed">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gradient-to-r from-purple-900/30 to-blue-900/30 text-purple-300 text-xs rounded-full border border-purple-800/30 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.github}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <FaGithub size={16} className="sm:size-20" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaLinkedin size={16} className="sm:size-20" />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-gray-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <FaTwitter size={16} className="sm:size-20" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-2xl">
            <div className="bg-[#0a0a0a] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl">
              <p className="text-gray-300 text-sm sm:text-base">
                Building the future of collaborative learning at{" "}
                <span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  Odoo Hackathon 2024
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Aboutus;
