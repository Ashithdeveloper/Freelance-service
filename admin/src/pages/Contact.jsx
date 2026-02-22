import React from 'react'

const Contact = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold">Contact Settings</h2>

      <input placeholder="Address" className="input" />
      <input placeholder="Instagram Link" className="input" />
      <input placeholder="LinkedIn Link" className="input" />
      <input placeholder="Map Link" className="input" />

      <button className="btn-primary">Update Contact</button>
    </div>
  );
}

export default Contact