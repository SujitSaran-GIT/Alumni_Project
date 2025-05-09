import Post from '../models/Post.js';

const createPost = async (req, res) => {
  try {
    const post = new Post({
      authorId: req.user._id,
      ...req.body,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate('authorId', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
    const count = await Post.countDocuments();
    res.json({
      posts,
      page,
      pages: Math.ceil(count / limit),
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $text: { $search: query }
    })
    .populate('authorId', 'firstName lastName avatar')
    .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      userId: req.user._id,
      text: req.body.text,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('authorId', 'firstName lastName avatar')
      .populate('comments.userId', 'firstName lastName avatar');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a post (only by author)
const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      authorId: req.user._id
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a post (only by author or admin)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      authorId: req.user._id
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Upvote a post
const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already upvoted
    const alreadyUpvoted = post.upvotes.includes(req.user._id);

    if (alreadyUpvoted) {
      // Remove upvote
      post.upvotes.pull(req.user._id);
    } else {
      // Add upvote
      post.upvotes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get posts by tag
const getPostsByTag = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag })
      .populate('authorId', 'firstName lastName avatar')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get posts by author
const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.params.authorId })
      .populate('authorId', 'firstName lastName avatar')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPostAnalytics = async (req, res) => {
  try {
    const analytics = await Post.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createPost, getPosts, addComment, getPostById, updatePost, deletePost, upvotePost, getPostsByTag, getPostsByAuthor, searchPosts, getPostAnalytics };