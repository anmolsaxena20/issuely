import React from "react";
import  {Link, NavLink } from "react-router-dom"
export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-cyan-600 via-purple-600 to-pink-600 text-white w-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* College Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">Smart Campus</h3>
          <p className="text-sm text-white/80">
            A digital platform to report, track, and resolve campus issues
            efficiently for students and staff.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer"><Link to="/" >Home</Link></li>
            <li className="hover:underline cursor-pointer"><Link to="/about" >About</Link></li>
            <li className="hover:underline cursor-pointer"><Link to = "/report" >Report Issue</Link></li>
            <li className="hover:underline cursor-pointer"><Link to ="/issuesearch" >Track Status</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-white/70">📧</span>
              support@smartcampus.edu
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white/70">📞</span>
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white/70">📍</span>
              College Campus, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm text-white/80">
        © {new Date().getFullYear()} MNNIT ALLAHABAD. All rights reserved.
      </div>
    </footer>
  );
}
