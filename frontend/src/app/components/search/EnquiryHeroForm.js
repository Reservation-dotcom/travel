"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export default function EnquiryHeroForm({
  title = "For More Cheapest Offers, Fill the Form",
  bgImage = "https://cheapestumrah.co.uk/wp-content/uploads/2023/01/makkah-2-beautiful-wallpaper-1024x768-1.jpg",
  pageType = "Umrah"
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    travelDate: "",
    numberOfDays: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const cleanPhone = formData.phone.replace(/\D/g, "");

    if (trimmedName.length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }

    if (!GMAIL_REGEX.test(trimmedEmail)) {
      toast.error("Please enter a valid Gmail address ending with @gmail.com.");
      return false;
    }

    if (cleanPhone.length !== 11) {
      toast.error("Phone number must contain exactly 11 digits.");
      return false;
    }

    if (formData.travelDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.travelDate)) {
      toast.error("Please choose a valid travel date.");
      return false;
    }

    if (formData.numberOfDays && Number(formData.numberOfDays) <= 0) {
      toast.error("Number of days must be greater than 0.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);

    try {
      const response = await fetch(`${API_URL}/inquiry/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          pageType,
        }),
      });

      const payload = await response.json().catch(() => ({ message: "Request failed" }));

      if (!response.ok) {
        throw new Error(payload?.detail || payload?.message || "Unable to submit inquiry.");
      }

      toast.success(`Thank you ${formData.name.trim() || "Customer"}! Your ${pageType} inquiry has been received.`);
      setFormData({
        name: "",
        email: "",
        phone: "",
        passengers: "",
        travelDate: "",
        numberOfDays: ""
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong while sending the inquiry.");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <div className="relative w-full overflow-hidden bg-gray-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={`${pageType} Background`}
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Title Header */}
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-white tracking-wide font-sans drop-shadow-md">
            {title}
          </h2>
        </div>

        {/* Form Card */}
        <div className="bg-white/98 backdrop-blur-md rounded-3xl p-6 sm:p-8 sm:px-10 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Grid Row 1: Name, Email, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={3}
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  pattern="^[a-zA-Z0-9._%+-]+@gmail\\.com$"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  minLength={11}
                  maxLength={20}
                  inputMode="numeric"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>
            </div>

            {/* Grid Row 2: Passengers, Travel Date, Number of Days */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Passengers</label>
                <input
                  type="text"
                  name="passengers"
                  placeholder="Passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Travel Date</label>
                <input
                  type="text"
                  name="travelDate"
                  placeholder="Traveling Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>

              <div>
                <label className="hidden sm:hidden md:block text-xs font-bold text-gray-700 mb-1.5">Number of Days</label>
                <input
                  type="text"
                  name="numberOfDays"
                  placeholder="Number of Days"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-[#80d4f2] focus:border-[#2bb2d5] rounded-xl focus:ring-2 focus:ring-[#80d4f2]/40 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>
            </div>

            {/* Centered Cyan Send Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={submitted}
                className="w-full sm:w-auto px-12 py-3 bg-[#38c4e8] hover:bg-[#26b5d9] active:bg-[#1fa3c5] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitted ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
