import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import { GitHubService } from "./services/github.service";
import { CreateIssueRequest } from "./types/github";
import dotenv from "dotenv";

const githubUsername = process.env.GITHUB_USERNAME || "AshwiniParaye1";
const githubService = new GitHubService(githubUsername);

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message for the API
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to Express + TypeScript Server
 */
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Express + TypeScript Server" });
});

/**
 * @swagger
 * /github:
 *   get:
 *     summary: Get GitHub user profile and repositories
 *     description: Returns user profile information and list of repositories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/GitHubUser'
 *                 repositories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GitHubRepo'
 *       500:
 *         description: Server Error
 */
app.get("/github", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [profile, repositories] = await Promise.all([
      githubService.getUserProfile(),
      githubService.getRepositories()
    ]);
    console.log("profile: ", profile);
    res.json({ profile, repositories });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /github/{repoName}:
 *   get:
 *     summary: Get repository details
 *     description: Returns detailed information about a specific repository
 *     parameters:
 *       - in: path
 *         name: repoName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GitHubRepo'
 *       404:
 *         description: Repository not found
 *       500:
 *         description: Server Error
 */
app.get(
  "/github/:repoName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await githubService.getRepository(req.params.repoName);
      res.json(repo);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /github/{repoName}/issues:
 *   post:
 *     summary: Create a new issue
 *     description: Creates a new issue in the specified repository
 *     parameters:
 *       - in: path
 *         name: repoName
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssueRequest'
 *     responses:
 *       201:
 *         description: Issue created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GitHubIssue'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Repository not found
 *       500:
 *         description: Server Error
 */
app.post(
  "/github/:repoName/issues",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issueData: CreateIssueRequest = req.body;
      const issue = await githubService.createIssue(
        req.params.repoName,
        issueData
      );
      res.status(201).json(issue);
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
