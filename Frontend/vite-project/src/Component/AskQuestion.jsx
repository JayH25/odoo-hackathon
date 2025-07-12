import React, { useState } from 'react';
import axios from 'axios';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [username, setUsername] = useState('JayH25'); // Replace with auth username
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3004/api/v1/question/askques', {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        username,
      });

      if (response.data.success) {
        setMessage('✅ Question submitted successfully!');
        setTitle('');
        setDescription('');
        setTags('');
      } else {
        setMessage('❌ Failed to submit question.');
      }
    } catch (err) {
      setMessage('❌ Something went wrong.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 mt-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Ask a Question</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white min-h-[150px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your question in detail"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, MongoDB"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {message && <p className="text-sm mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AskQuestion;