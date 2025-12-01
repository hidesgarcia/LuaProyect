import React, { useState } from 'react';
import '../styles/Forum.css';

export default function Forum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How to pass the advanced math quiz?',
      author: 'john_doe',
      content: 'I am having trouble with the calculus questions...',
      replies: 2,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Tips for completing courses efficiently',
      author: 'jane_smith',
      content: 'Here are my tips for completing courses faster...',
      replies: 5,
      timestamp: '1 day ago'
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          title: newPost.title,
          author: 'current_user',
          content: newPost.content,
          replies: 0,
          timestamp: 'just now'
        }
      ]);
      setNewPost({ title: '', content: '' });
    }
  };

  return (
    <div className="forum-container">
      <h1>Community Forum</h1>

      <div className="forum-create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Post Content"
            rows="5"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>

      <div className="forum-posts">
        <h2>Recent Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="forum-post">
            <h3>{post.title}</h3>
            <p className="post-meta">by {post.author} • {post.timestamp}</p>
            <p className="post-content">{post.content}</p>
            <div className="post-footer">
              <span className="replies">{post.replies} replies</span>
              <button className="btn btn-small">View Replies</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
