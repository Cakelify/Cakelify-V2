// // App.js
import React, { useState } from "react";

// const Career = () => {
//   const [formData, setFormData] = useState({
//     message: "",
//     name: "",
//     phone: "",
//     email: "",
//     id: "",
//     age: "",
//     qualification: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch("/api/v1/messages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       setFormData({
//         message: "",
//         name: "",
//         phone: "",
//         email: "",
//         id: "",
//         age: "",
//         qualification: "",
//       });
//       alert("Message saved successfully");
//     } catch (error) {
//       console.error("Error saving message:", error);
//       alert("Error saving message");
//     }
//   };

//   return (
//     <div className="mt-44">
//       <h1>Share a Message</h1>
//       <form >
//         <div>
//           <label>Message:</label>
//           <input
//             type="text"

//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>ID:</label>
//           <input
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="text"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Qualification:</label>
//           <input
//             type="text"
//             name="qualification"
//             value={formData.qualification}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Career;

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Career = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    age: "",
    qualification: "",
    about: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        age: "",
        qualification: "",
        about: "",
        language: "",
      });
      alert("Message saved successfully");
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Error saving message");
    }
  };
  return (
    <form className="p-3 mt-36" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 ">
          <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
            Career / Internship Form
          </h2>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  id="firstName"
                  autoComplete="firstName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Language &nbsp;{" "}
                <span className=" text-gray-400">
                  (Hindi , English, Hinglish)
                </span>
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Language"
                  name="language"
                  id="language"
                  autoComplete="language"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.language}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age
              </label>

              <div className="mt-2">
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  id="age"
                  autoComplete="age"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>

              <div className="mt-2">
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Qualification{" "}
                <span className=" text-gray-400">
                  (MBA, MCA, BBA, BCA, BCCA,etc)
                </span>
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Qualification"
                  name="qualification"
                  id="qualification"
                  autoComplete="qualification"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.qualification}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Street address"
                  name="address"
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>

              <div className="mt-2">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Career;
