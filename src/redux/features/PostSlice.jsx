import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// GET DATA

export const getPost = createAsyncThunk("post/getPosts", async ({ id }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
});

// GET DATA

// CREATE DATA

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ values }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        body: values.body,
      }),
    });
    return res.json();
  }
);

// CREATE DATA

// EDIT DATA

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, body }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );
    return res.json();
  }
);

// EDIT DATA

// DELETE DATA

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    return res.json();
  }
);

// DELETE DATA

const PostSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    post: [],
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.body = action.payload.body;
      state.edit = action.payload.edit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true; // Changed ':' to '='
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      (state.isLoading = false), (state.post = [action.payload]);
    });
    builder.addCase(getPost.rejected, (state, action) => {
      (state.isLoading = false),
        (state.post = []),
        (state.error = action.payload);
    });

    // CREATE DATA

    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true; // Changed ':' to '='
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      (state.isLoading = false), (state.post = [action.payload]);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      (state.isLoading = false),
        (state.post = []),
        (state.error = action.payload);
    });

    // CREATE DATA

    // EDIT DATA

    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true; // Changed ':' to '='
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      (state.isLoading = false), (state.post = [action.payload]);
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      (state.isLoading = false),
        (state.post = []),
        (state.error = action.payload);
    });

    // EDIT DATA

    // DELETE ACTION

    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true; // Changed ':' to '='
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      (state.isLoading = false), (state.post = action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      (state.isLoading = false),
        (state.post = []),
        (state.error = action.payload);
    });
  },
});

export const { setEdit } = PostSlice.actions;

export default PostSlice.reducer;
