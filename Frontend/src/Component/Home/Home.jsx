import React from "react";
import { GraduationCap, BookOpen, Users, Calendar, } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen w-screen  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-white ">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center  px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Shaping Futures Through Education
        </h2>
        <p className="max-w-2xl mt-6 text-white/90">
          ABC College is committed to academic excellence, innovation, and
          holistic development of students.
        </p>
        <button className="mt-8 px-8 py-3 rounded-full bg-white text-purple-600 font-semibold hover:scale-105 transition">
          Explore Programs
        </button>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24 px-6">
        <Card icon={<GraduationCap />} title="Programs" desc="UG & PG programs across disciplines" />
        <Card icon={<BookOpen />} title="Library" desc="Modern digital & physical resources" />
        <Card icon={<Users />} title="Faculty" desc="Experienced & research-driven educators" />
        <Card icon={<Calendar />} title="Events" desc="Workshops, seminars & fests" />
      </section>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center hover:scale-105 transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/80 mt-2">{desc}</p>
    </div>
  );
}
