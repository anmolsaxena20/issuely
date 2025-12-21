import React from "react";
import {  Target, Eye, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-white overflow-y-auto">
      {/* Header */}
      <header className="px-10 py-8">
        <h1 className="text-3xl font-bold">About MNNIT ALLAHBAD</h1>
        <p className="mt-2 text-white/90 max-w-2xl">
          Empowering students with knowledge, skills, and values to shape a
          better future.
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-white/90 leading-relaxed">
            MNNIT ALLAHABAD is a premier institution dedicated to academic
            excellence, innovation, and holistic student development. With a
            strong focus on quality education, research, and community
            engagement, we prepare students to meet global challenges.
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>• Established: 1961</li>
            <li>• 50+ Academic Programs</li>
            <li>• 10,000+ Alumni</li>
          </ul>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard
          icon={<Target />}
          title="Our Mission"
          desc="To provide quality education that fosters critical thinking,
          creativity, and ethical values while promoting research and
          innovation."
        />
        <InfoCard
          icon={<Eye />}
          title="Our Vision"
          desc="To be a globally recognized institution producing responsible
          leaders and professionals committed to societal progress."
        />
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard title="Excellence" desc="Commitment to high academic standards." />
          <ValueCard title="Integrity" desc="Ethical conduct and transparency." />
          <ValueCard title="Inclusivity" desc="Respect for diversity and equal opportunity." />
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-6xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-2xl font-semibold mb-6">Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LeaderCard name="Prof RS Verma" role="Director" />
          <LeaderCard name="Prof LK Mishra" role="Dean Academics" />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
      <div className="mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/90">{desc}</p>
    </div>
  );
}

function ValueCard({ title, desc }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/90">{desc}</p>
    </div>
  );
}

function LeaderCard({ name, role }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center">
      <Users className="mx-auto mb-3" />
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-white/80">{role}</p>
    </div>
  );
}
