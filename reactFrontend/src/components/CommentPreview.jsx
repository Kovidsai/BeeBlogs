export default function CommentPreview({comment}) {
  return (
    <div className="p-2 border-b border-gray-300">
      <p className="text-sm font-semibold">{comment.author}</p>
      <p className="text-gray-600">{comment.content}</p>
      <p className="text-xs text-gray-500">
        {new Date(comment.created_at).toLocaleString()}
      </p>
    </div>
  );
}
