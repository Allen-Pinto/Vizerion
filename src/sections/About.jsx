import { Globe } from "../components/globe.jsx"; // Added .jsx extension
import CopyEmailButton from "../components/CopyEmailButton.jsx"; // Added .jsx extension
import { Frameworks } from "../components/FrameWorks.jsx"; // Added .jsx extension

const About = () => {
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About VIZERION</h2>
      {/* Adjusting grid layout as 'Games We Play' section is removed */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[14rem] mt-12">
        
        {/* Grid 1 - Welcome Section */}
        <div className="flex flex-col items-center justify-center grid-default-color grid-1 relative text-center p-6">
          
          {/* Group Image */}
          <img loading="lazy"
            src="assets/Group.png"
            alt="Vizerion Team"
            className="w-[90%] md:w-[65%] lg:w-[55%] rounded-xl shadow-lg mb-6 object-cover"
          />

          {/* Text */}
          <div className="z-10">
            <p className="headtext">Welcome to VIZERION</p>
            <p className="subtext mt-2 max-w-2xl mx-auto">
              Elite Gaming Club under SAMAGRA, Department of Computer Science.
              We organize tournaments, gaming events, and build a thriving esports
              community at Christ University.
            </p>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-purple-900" />
        </div>

        {/* Grid 3 - Location (shifted to take former Grid 2's implicit spot) */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[60%]">
            <p className="headtext">Our Arena</p>
            <p className="subtext">
              Based at Christ University, Bangalore. We host gaming events, tournaments,
              and training sessions for students passionate about esports.
            </p>
          </div>
          <figure className="absolute left-[35%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 - Founder & Team */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-1 size-full text-center">
            <p className="headtext">Founded by Gaming Enthusiasts</p>
            <div className="space-y-2">
              <p className="text-lg font-bold text-purple-400">Kundan Rijal - President</p>
              <p className="subtext">
                Led by a passionate group of BCA students from Christ University,
                building the ultimate gaming community.
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/50 rounded-full text-sm">BCA Students</span>
              <span className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/50 rounded-full text-sm">Christ University</span>
            </div>
          </div>
        </div>

        {/* Grid 5 - What We Do */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-full">
            <p className="headText">What We Do</p>
            <p className="subtext mb-4">
              We organize gaming tournaments, esports training, community events,
              and provide a platform for gamers to showcase their skills.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-xs">🏆 Tournaments</span>
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-xs">🎮 Gaming Events</span>
              <span className="px-3 py-1 bg-green-600/20 border border-green-500/50 rounded-full text-xs">🎯 Training</span>
              <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/50 rounded-full text-xs">👥 Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
