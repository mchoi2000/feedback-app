function App() {
  const title = "blog post";
  const body = "this is my blog post";
  const comments = [
    { id: 1, text: "Comment one" },
    { id: 1, text: "Comment two" },
    { id: 1, text: "Comment three" },
  ];

  const loading = false;
  const showComments = true;
  const commentBlock = (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>{title.toUpperCase()}</h1>
      <p>{body}</p>
      {showComments && commentBlock}
    </div>
  );
}

export default App;
