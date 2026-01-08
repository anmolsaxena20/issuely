import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen w-screen bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Info Section */}
        <div className="bg-linear-to-br from-gray-600 to-green-800 text-green-400 p-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm text-violet-400 mb-6">
            Have questions, feedback, or need support? Reach out to us and well
            be happy to help.
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-white/80">📍</span>
              <span>College Campus, India</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80">📧</span>
              <span>support@smartcampus.edu</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80">📞</span>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 bg-violet-300">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h3>

          <form className="space-y-5 text-cyan-800">
            <div>
              <label className="text-sm text-pink-600">Full Name</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 mr-2">👤</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-pink-600">Email</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <span className="text-gray-400 mr-2">📧</span>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-pink-600">Message</label>
              <textarea
                placeholder="Write your message here"
                className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none resize-none h-28"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full text-white font-semibold bg-linear-to-r from-cyan-500 to-pink-500 hover:scale-90 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
