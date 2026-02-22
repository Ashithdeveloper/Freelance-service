import React from 'react'

const Service = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <input placeholder="Title" className="input" />
      <textarea placeholder="Description" className="input" />
      <input placeholder="Icon URL" className="input" />
      <input placeholder="Price" className="input" />
      <button className="btn-primary">Save</button>
    </div>
  );
}

export default Service