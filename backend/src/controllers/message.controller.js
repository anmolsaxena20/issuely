import Message from "../models/message.model.js";
import Issue from "../models/issue.model.js";

export const getIssueMessages = async (req, res) => {
  const { issueId } = req.params;
  const { limit = 10, before } = req.query;

  const issue = await Issue.findById(issueId);
  if (!issue) {
    return res.status(404).json({ message: "Issue not found" });
  }

  // Permission check
  const userId = req.user.id;
  const isReporter = issue.createdBy.toString() === userId;
  const isHandler = issue.assignedTo?.toString() === userId;

  if (!issue.assignedTo || (!isReporter && !isHandler)) {
    return res.status(403).json({ message: "Chat not allowed" });
  }

  const query = { issueId };

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  const messages = await Message.find(query)
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.json(messages.reverse()); // oldest → newest
};
