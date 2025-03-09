import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TypeScript API",
      version: "1.0.0",
      description: "A simple Express TypeScript API"
    },
    servers: [
      {
        url: process.env.BASE_URL || "https://git-server-lo5u.onrender.com",
        description: "Server"
      }
    ],
    components: {
      schemas: {
        GitHubUser: {
          type: "object",
          properties: {
            login: { type: "string" },
            id: { type: "number" },
            avatar_url: { type: "string" },
            html_url: { type: "string" },
            name: { type: "string" },
            public_repos: { type: "number" },
            followers: { type: "number" },
            following: { type: "number" }
          },
          required: [
            "login",
            "id",
            "avatar_url",
            "html_url",
            "name",
            "public_repos",
            "followers",
            "following"
          ]
        },
        GitHubRepo: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            full_name: { type: "string" },
            html_url: { type: "string" },
            description: { type: "string", nullable: true },
            stargazers_count: { type: "number" },
            watchers_count: { type: "number" },
            forks_count: { type: "number" },
            language: { type: "string", nullable: true },
            created_at: { type: "string" },
            updated_at: { type: "string" }
          },
          required: [
            "id",
            "name",
            "full_name",
            "html_url",
            "stargazers_count",
            "watchers_count",
            "forks_count",
            "created_at",
            "updated_at"
          ]
        },
        GitHubIssue: {
          type: "object",
          properties: {
            html_url: { type: "string" },
            number: { type: "number" },
            title: { type: "string" },
            state: { type: "string" },
            body: { type: "string" }
          },
          required: ["html_url", "number", "title", "state", "body"]
        },
        CreateIssueRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            body: { type: "string" }
          },
          required: ["title", "body"]
        }
      }
    }
  },
  apis: [__dirname + "/*.ts"] // Use absolute path
};

export const specs = swaggerJsdoc(options);
