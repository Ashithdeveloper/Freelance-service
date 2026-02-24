import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    phoneNumbers: [{ label: "Office", number: "" }],
    emails: [{ label: "Support", email: "" }],
    address: "",
    socialMedia: {
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    mapLink: "",
  });

  // -------------------------
  // Handle Simple Fields
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -------------------------
  // Handle Social Media
  // -------------------------
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [name]: value,
      },
    });
  };

  // -------------------------
  // Phone Handlers
  // -------------------------
  const handlePhoneChange = (index, field, value) => {
    const updated = [...formData.phoneNumbers];
    updated[index][field] = value;
    setFormData({ ...formData, phoneNumbers: updated });
  };

  const addPhone = () => {
    setFormData({
      ...formData,
      phoneNumbers: [...formData.phoneNumbers, { label: "Office", number: "" }],
    });
  };

  const removePhone = (index) => {
    const updated = formData.phoneNumbers.filter((_, i) => i !== index);
    setFormData({ ...formData, phoneNumbers: updated });
  };

  // -------------------------
  // Email Handlers
  // -------------------------
  const handleEmailChange = (index, field, value) => {
    const updated = [...formData.emails];
    updated[index][field] = value;
    setFormData({ ...formData, emails: updated });
  };

  const addEmail = () => {
    setFormData({
      ...formData,
      emails: [...formData.emails, { label: "Support", email: "" }],
    });
  };

  const removeEmail = (index) => {
    const updated = formData.emails.filter((_, i) => i !== index);
    setFormData({ ...formData, emails: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", formData);
    // 👉 Call your API here
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-8"
      >
        <h2 className="text-2xl font-bold text-gray-800">Contact Settings</h2>

        {/* Address */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            required
          />
        </div>

        {/* Phone Numbers */}
        <div>
          <h3 className="font-semibold mb-3">Phone Numbers</h3>
          {formData.phoneNumbers.map((phone, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                value={phone.label}
                onChange={(e) =>
                  handlePhoneChange(index, "label", e.target.value)
                }
                placeholder="Label (Office, Support)"
                className="border rounded-lg px-3 py-2 w-1/3"
              />
              <input
                value={phone.number}
                onChange={(e) =>
                  handlePhoneChange(index, "number", e.target.value)
                }
                placeholder="Phone Number"
                className="border rounded-lg px-3 py-2 w-1/2"
                required
              />
              <button
                type="button"
                onClick={() => removePhone(index)}
                className="bg-red-500 text-white px-3 rounded-lg"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPhone}
            className="text-sm text-blue-600"
          >
            + Add Phone
          </button>
        </div>

        {/* Emails */}
        <div>
          <h3 className="font-semibold mb-3">Emails</h3>
          {formData.emails.map((email, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                value={email.label}
                onChange={(e) =>
                  handleEmailChange(index, "label", e.target.value)
                }
                placeholder="Label (Support, Info)"
                className="border rounded-lg px-3 py-2 w-1/3"
              />
              <input
                value={email.email}
                onChange={(e) =>
                  handleEmailChange(index, "email", e.target.value)
                }
                placeholder="Email Address"
                className="border rounded-lg px-3 py-2 w-1/2"
                required
              />
              <button
                type="button"
                onClick={() => removeEmail(index)}
                className="bg-red-500 text-white px-3 rounded-lg"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEmail}
            className="text-sm text-blue-600"
          >
            + Add Email
          </button>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Social Media</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="instagram"
              placeholder="Instagram"
              onChange={handleSocialChange}
              className="input border rounded-lg px-3 py-2"
            />
            <input
              name="linkedin"
              placeholder="LinkedIn"
              onChange={handleSocialChange}
              className="input border rounded-lg px-3 py-2"
            />
            <input
              name="twitter"
              placeholder="Twitter"
              onChange={handleSocialChange}
              className="input border rounded-lg px-3 py-2"
            />
            <input
              name="facebook"
              placeholder="Facebook"
              onChange={handleSocialChange}
              className="input border rounded-lg px-3 py-2"
            />
            <input
              name="youtube"
              placeholder="YouTube"
              onChange={handleSocialChange}
              className="input border rounded-lg px-3 py-2 col-span-2"
            />
          </div>
        </div>

        {/* Map Link */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Google Map Link
          </label>
          <input
            name="mapLink"
            value={formData.mapLink}
            onChange={handleChange}
            placeholder="Paste Google Maps embed link"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default Contact;
