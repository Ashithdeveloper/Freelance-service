  import mongoose from "mongoose";

  const projectPhotoSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      techStack: [String], // ["React", "Node", "MongoDB"]

      images: [
        {
          url: { type: String },
          public_id: { type: String },
        },
      ],
      liveLink: String,
      githubLink: String,

      isActive: {
        type: Boolean,
        default: true,
      },

      amount: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true },
  );

  const ProjectPhoto =
    mongoose.models.ProjectPhoto ||
    mongoose.model("ProjectPhoto", projectPhotoSchema);

  export default ProjectPhoto;
